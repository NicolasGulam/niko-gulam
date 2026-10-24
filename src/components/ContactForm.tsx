"use client";

import { ArrowRight, Check } from "lucide-react";
import { useActionState, useId, useState } from "react";
import { sendContact } from "@/app/actions/contact";
import {
  CONTACT_LIMITS,
  EMPTY_CONTACT_STATE,
  type ContactField,
  type ContactState,
} from "@/lib/contact";
import { cn } from "@/lib/cn";
import { useLocale } from "@/i18n/provider";

const inputBase =
  "w-full border border-line bg-black px-4 py-3.5 text-base text-paper placeholder:text-muted/60 transition-colors duration-300 hover:border-muted/50 focus:border-orange aria-[invalid=true]:border-orange";

type FieldProps = {
  name: ContactField;
  label: string;
  required?: boolean;
  optionalHint?: string;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  placeholder?: string;
  maxLength: number;
  error?: string;
  defaultValue?: string;
};

function Field({
  name,
  label,
  required,
  optionalHint,
  type = "text",
  autoComplete,
  placeholder,
  maxLength,
  error,
  defaultValue,
}: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="label-mono mb-2.5 flex items-center gap-2 text-paper">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-orange">
            *
          </span>
        ) : null}
        {optionalHint ? <span className="text-muted">· {optionalHint}</span> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        maxLength={maxLength}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={inputBase}
      />
      {error ? (
        <p id={errorId} className="mt-2 text-sm text-orange">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const { locale, t } = useLocale();
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    sendContact,
    EMPTY_CONTACT_STATE,
  );
  const [dismissed, setDismissed] = useState<ContactState | null>(null);
  const showSuccess = state.status === "success" && dismissed !== state;

  const messageId = useId();
  const messageErrorId = `${messageId}-error`;
  const errors = state.fieldErrors ?? {};
  const values = state.values ?? {};

  if (showSuccess) {
    return (
      <div
        role="status"
        className="border border-orange bg-black p-8 sm:p-10"
      >
        <span className="flex size-10 items-center justify-center bg-orange text-black">
          <Check aria-hidden="true" className="size-5" />
        </span>
        <p className="mt-6 font-display text-2xl font-extrabold uppercase leading-tight tracking-[-0.02em] text-paper sm:text-3xl">
          {t.contact.successTitle}
        </p>
        <p className="mt-3 max-w-[30rem] text-muted">
          {t.contact.successBody}
        </p>
        <button
          type="button"
          onClick={() => setDismissed(state)}
          className="label-mono mt-8 border border-line px-5 py-3.5 text-paper transition-colors duration-300 hover:border-orange hover:text-orange"
        >
          {t.contact.again}
        </button>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate={false} className="relative border border-line bg-surface p-6 sm:p-8">
      <input type="hidden" name="locale" value={locale} />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          name="name"
          label={t.contact.name}
          required
          autoComplete="name"
          placeholder={t.contact.namePh}
          maxLength={CONTACT_LIMITS.name.max}
          error={errors.name}
          defaultValue={values.name}
        />
        <Field
          name="company"
          label={t.contact.company}
          optionalHint={t.contact.optional}
          autoComplete="organization"
          placeholder={t.contact.companyPh}
          maxLength={CONTACT_LIMITS.company.max}
          error={errors.company}
          defaultValue={values.company}
        />
        <Field
          name="email"
          label={t.contact.emailField}
          required
          type="email"
          autoComplete="email"
          placeholder={t.contact.emailPh}
          maxLength={CONTACT_LIMITS.email.max}
          error={errors.email}
          defaultValue={values.email}
        />
        <Field
          name="phone"
          label={t.contact.phone}
          optionalHint={t.contact.optional}
          type="tel"
          autoComplete="tel"
          placeholder={t.contact.phonePh}
          maxLength={CONTACT_LIMITS.phone.max}
          error={errors.phone}
          defaultValue={values.phone}
        />
      </div>

      <div className="mt-6">
        <label
          htmlFor={messageId}
          className="label-mono mb-2.5 flex items-center gap-2 text-paper"
        >
          {t.contact.message}
          <span aria-hidden="true" className="text-orange">
            *
          </span>
        </label>
        <textarea
          id={messageId}
          name="message"
          required
          rows={6}
          minLength={CONTACT_LIMITS.message.min}
          maxLength={CONTACT_LIMITS.message.max}
          placeholder={t.contact.messagePh}
          defaultValue={values.message}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? messageErrorId : undefined}
          className={cn(inputBase, "resize-y")}
        />
        {errors.message ? (
          <p id={messageErrorId} className="mt-2 text-sm text-orange">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Do not fill
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state.status === "error" && state.message ? (
        <p role="alert" className="mt-6 border border-orange px-4 py-3 text-sm text-paper">
          {state.message}
        </p>
      ) : null}

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[22rem] text-sm leading-relaxed text-muted">
          {t.contact.privacy}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex min-h-14 items-center justify-between gap-6 bg-orange px-7 font-mono text-xs font-medium tracking-[0.18em] text-black transition-colors duration-300 hover:bg-paper disabled:cursor-wait disabled:opacity-70 sm:justify-start"
        >
          {pending ? t.contact.sending : t.contact.send}
          <ArrowRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1.5"
          />
        </button>
      </div>
    </form>
  );
}
