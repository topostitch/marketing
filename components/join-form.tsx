"use client";

import { FormEvent, useState } from "react";
import { Mail, MapPin, ScanLine } from "lucide-react";

type FormStatus =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

export default function JoinForm() {
  const [status, setStatus] = useState<FormStatus>({ state: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          organization: formData.get("organization"),
          message: formData.get("message"),
	  website: formData.get("website"),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to send message.");
      }

      form.reset();
      setStatus({ state: "success" });
    } catch (error) {
      setStatus({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unable to send your message.",
      });
    }
  }

  return (
    <section
      id="contact"
      className="w-full border-t border-border bg-background py-16 md:py-24 lg:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Pilot conversations
          </p>

          <h2 className="text-balance text-3xl font-medium leading-tight text-foreground md:text-4xl">
            Have something worth capturing, preserving, or making easier to
            understand?
          </h2>

          <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-muted-foreground md:text-lg">
            TopoStitch is in active development. Early conversations are
            focused on learning from real collections, fieldwork, research,
            preservation, and documentation workflows.
          </p>

          <ul className="mt-8 space-y-5">
            <li className="flex gap-3">
              <ScanLine
                className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <span className="text-sm leading-relaxed text-muted-foreground">
                An artifact or collection that needs a stronger
                capture-to-record workflow.
              </span>
            </li>

            <li className="flex gap-3">
              <MapPin
                className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <span className="text-sm leading-relaxed text-muted-foreground">
                A historic place or physical environment where spatial context
                matters.
              </span>
            </li>

            <li className="flex gap-3">
              <Mail
                className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground"
                aria-hidden="true"
              />
              <span className="text-sm leading-relaxed text-muted-foreground">
                An institution exploring how 3D records can connect to
                metadata, research, publishing, education, or public
                interpretation.
              </span>
            </li>
          </ul>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
	      <div className="hidden" aria-hidden="true">
 		 <label htmlFor="company-website">Website</label>
 		 <input
   		 	id="company-website"
    		 	name="website"
   		 	type="text"
    			tabIndex={-1}
    			autoComplete="off"
  		/>
	      </div>	
              <label
                htmlFor="contact-name"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Name
              </label>

              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="min-h-12 w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-foreground focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Email
              </label>

              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-h-12 w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-foreground focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label
                htmlFor="contact-organization"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Organization
                <span className="ml-2 font-normal text-muted-foreground">
                  Optional
                </span>
              </label>

              <input
                id="contact-organization"
                name="organization"
                type="text"
                autoComplete="organization"
                className="min-h-12 w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-foreground focus:ring-2 focus:ring-ring"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                What are you hoping to document or preserve?
              </label>

              <textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                className="w-full resize-y rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-foreground focus:ring-2 focus:ring-ring"
                placeholder="Tell us a little about the object, collection, place, or workflow you're working with."
              />
            </div>

            <button
              type="submit"
              disabled={status.state === "submitting"}
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
            >
              {status.state === "submitting"
                ? "Sending…"
                : "Start a conversation"}
            </button>

            <div aria-live="polite" className="min-h-6">
              {status.state === "success" && (
                <p className="text-sm text-foreground">
                  Thanks — your message was sent. We'll get back to you soon.
                </p>
              )}

              {status.state === "error" && (
                <p className="text-sm text-destructive">
                  {status.message}
                </p>
              )}
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground">
              Prefer email? Reach us at hello@topostitch.dev.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
