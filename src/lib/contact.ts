/**
 * Shared contact-form contract (safe to import from client and server code).
 */

export const CONTACT_LIMITS = {
  name: { min: 2, max: 100 },
  company: { max: 120 },
  email: { max: 200 },
  phone: { max: 40 },
  message: { min: 10, max: 4000 },
} as const;

export type ContactField = "name" | "company" | "email" | "phone" | "message";

export type ContactValues = Record<ContactField, string>;

export type ContactState = {
  status: "idle" | "success" | "error";
  /** General (non-field) message, shown in an alert region. */
  message?: string;
  fieldErrors?: Partial<Record<ContactField, string>>;
  /** Echoed back so the form keeps what the visitor typed after an error. */
  values?: Partial<ContactValues>;
};

export const EMPTY_CONTACT_STATE: ContactState = { status: "idle" };
