"use server";

import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { getCopy } from "@/i18n/copy";
import { parseLocale, type Locale } from "@/i18n/locale";
import {
  CONTACT_LIMITS,
  type ContactField,
  type ContactState,
  type ContactValues,
} from "@/lib/contact";

/** Default recipient; override with CONTACT_TO. */
const DEFAULT_TO = "nk@ntk.solutions";

/** Very small in-memory limiter: 5 messages per hour per IP (per server instance). */
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

/** Trim and drop control characters (also blocks header injection). */
function clean(value: FormDataEntryValue | null, allowNewlines = false): string {
  const text = typeof value === "string" ? value : "";
  const stripped = allowNewlines
    ? text.replace(/[^\S\n]+\n/g, "\n").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    : text.replace(/[\u0000-\u001F\u007F]/g, " ");
  return stripped.trim();
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[0-9+()\-.\s]{6,40}$/;

function validate(
  values: ContactValues,
  locale: Locale,
): Partial<Record<ContactField, string>> {
  const errors: Partial<Record<ContactField, string>> = {};
  const L = CONTACT_LIMITS;
  const t = getCopy(locale).contact;

  if (values.name.length < L.name.min) errors.name = t.errName;
  else if (values.name.length > L.name.max) errors.name = t.errNameLong;

  if (!EMAIL_RE.test(values.email) || values.email.length > L.email.max)
    errors.email = t.errEmail;

  if (values.company.length > L.company.max) errors.company = t.errCompany;

  if (values.phone && !PHONE_RE.test(values.phone)) errors.phone = t.errPhone;

  if (values.message.length < L.message.min) errors.message = t.errMessageShort;
  else if (values.message.length > L.message.max) errors.message = t.errMessageLong;

  return errors;
}

function buildTransport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;

  const port = Number(process.env.SMTP_PORT ?? 587);
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === "true"
    : port === 465;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

export async function sendContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field. Pretend success.
  if (clean(formData.get("website"))) return { status: "success" };

  const locale = parseLocale(formData.get("locale"));
  const t = getCopy(locale).contact;

  const values: ContactValues = {
    name: clean(formData.get("name")),
    company: clean(formData.get("company")),
    email: clean(formData.get("email")),
    phone: clean(formData.get("phone")),
    message: clean(formData.get("message"), true),
  };

  const fieldErrors = validate(values, locale);
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors, values };
  }

  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    requestHeaders.get("x-real-ip") ??
    "unknown";
  if (rateLimited(ip)) {
    return {
      status: "error",
      message: t.errRate,
      values,
    };
  }

  const transport = buildTransport();
  if (!transport) {
    console.error(
      "[contact] SMTP is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS (see .env.example).",
    );
    return {
      status: "error",
      message: t.errSmtp(process.env.CONTACT_TO ?? DEFAULT_TO),
      values,
    };
  }

  const to = process.env.CONTACT_TO ?? DEFAULT_TO;
  const from = process.env.CONTACT_FROM ?? process.env.SMTP_USER!;

  const lines = [
    `Nombre: ${values.name}`,
    `Email: ${values.email}`,
    values.company ? `Empresa: ${values.company}` : null,
    values.phone ? `Teléfono / WhatsApp: ${values.phone}` : null,
    "",
    values.message,
  ].filter((line): line is string => line !== null);

  const html = `
    <table style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#111">
      <tr><td><strong>Nombre</strong></td><td>${escapeHtml(values.name)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(values.email)}</td></tr>
      ${values.company ? `<tr><td><strong>Empresa</strong></td><td>${escapeHtml(values.company)}</td></tr>` : ""}
      ${values.phone ? `<tr><td><strong>Teléfono / WhatsApp</strong></td><td>${escapeHtml(values.phone)}</td></tr>` : ""}
    </table>
    <p style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;white-space:pre-wrap;color:#111">${escapeHtml(values.message)}</p>`;

  try {
    await transport.sendMail({
      from: `"Portfolio NK" <${from}>`,
      to,
      replyTo: `"${values.name.replace(/"/g, "")}" <${values.email}>`,
      subject: `[Portfolio] Mensaje de ${values.name}`,
      text: lines.join("\n"),
      html,
    });
    return { status: "success" };
  } catch (error) {
    console.error("[contact] sendMail failed:", error);
    return {
      status: "error",
      message: t.errSend(to),
      values,
    };
  }
}
