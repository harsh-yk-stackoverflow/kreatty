"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";

type ContactFormProps = {
  creatorMode: boolean;
  onModeChange: (creatorMode: boolean) => void;
};

type FormStatus = {
  kind: "success" | "error";
  message: string;
} | null;

const services = ["Creator Discovery", "Brand Partnerships", "Campaign Management", "Something else"];
const budgets = ["Under $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "$50,000+", "Not sure yet"];

export function ContactForm({ creatorMode, onModeChange }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: creatorMode ? "creator" : "business" }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "We couldn't send your message. Please try again.");
      }

      setStatus({
        kind: "success",
        message: creatorMode
          ? "Thanks for reaching out. We’ll be in touch soon."
          : "Your enquiry is on its way. We’ll be in touch soon.",
      });
      form.reset();
    } catch (error) {
      setStatus({
        kind: "error",
        message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="contact-form-card" id="contact-form">
      <div className="form-tabs" role="tablist" aria-label="Enquiry type">
        <button
          type="button"
          role="tab"
          aria-selected={!creatorMode}
          className={!creatorMode ? "is-active" : ""}
          onClick={() => { onModeChange(false); setStatus(null); }}
        >
          I&apos;m a brand
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={creatorMode}
          className={creatorMode ? "is-active" : ""}
          onClick={() => { onModeChange(true); setStatus(null); }}
          id="contact-creator"
        >
          I&apos;m a creator
        </button>
      </div>
      <p className="form-intro">
        {creatorMode
          ? "Tell us a little about you and what you create."
          : "A few details to help us get to know your brief."}
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <label className="form-field">
            <span>Full name <b>*</b></span>
            <input name="name" type="text" autoComplete="name" maxLength={100} placeholder="Your name" required />
          </label>
          <label className="form-field">
            <span>Email address <b>*</b></span>
            <input name="email" type="email" autoComplete="email" maxLength={254} placeholder="you@company.com" required />
          </label>
          {creatorMode ? (
            <>
              <label className="form-field">
                <span>Instagram / social handle <b>*</b></span>
                <input name="instagram" type="text" maxLength={200} placeholder="@yourhandle" required />
              </label>
              <label className="form-field">
                <span>Your niche</span>
                <input name="niche" type="text" maxLength={120} placeholder="e.g. beauty, food, travel" />
              </label>
              <label className="form-field form-field-wide">
                <span>Tell us about your work <b>*</b></span>
                <textarea name="message" rows={4} maxLength={4000} placeholder="Your audience, the content you love to make, or anything else we should know..." required />
              </label>
            </>
          ) : (
            <>
              <label className="form-field">
                <span>Company / brand name <b>*</b></span>
                <input name="company" type="text" autoComplete="organization" maxLength={160} placeholder="Your brand" required />
              </label>
              <label className="form-field">
                <span>Phone number <i>Optional</i></span>
                <input name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="+1 (555) 000-0000" />
              </label>
              <label className="form-field">
                <span>Instagram / website <i>Optional</i></span>
                <input name="website" type="text" maxLength={250} placeholder="@yourbrand or website.com" />
              </label>
              <label className="form-field">
                <span>Service you&apos;re interested in <b>*</b></span>
                <select name="service" defaultValue="" required>
                  <option value="" disabled>Select a service</option>
                  {services.map((service) => <option key={service} value={service}>{service}</option>)}
                </select>
              </label>
              <label className="form-field">
                <span>Estimated budget <i>Optional</i></span>
                <select name="budget" defaultValue="">
                  <option value="">Select a range</option>
                  {budgets.map((budget) => <option key={budget} value={budget}>{budget}</option>)}
                </select>
              </label>
              <label className="form-field form-field-wide">
                <span>Tell us a little about your project <b>*</b></span>
                <textarea name="message" rows={4} maxLength={4000} placeholder="What are you hoping to make happen?" required />
              </label>
            </>
          )}
          <div className="honeypot" aria-hidden="true">
            <label htmlFor="website-address">Leave this field empty</label>
            <input id="website-address" name="websiteAddress" type="text" tabIndex={-1} autoComplete="off" />
          </div>
        </div>
        <div className="form-submit-row">
          <button className="button button-dark form-submit" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>Sending <LoaderCircle className="spin" size={17} /></>
            ) : (
              <>Send enquiry <ArrowRight size={17} /></>
            )}
          </button>
          <span className="form-privacy">Your details stay between us.</span>
        </div>
        {status && (
          <div className={`form-status form-status-${status.kind}`} role="status" aria-live="polite">
            <CheckCircle2 size={18} />
            <span>{status.message}</span>
          </div>
        )}
      </form>
    </div>
  );
}
