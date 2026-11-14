"use client"

import { useMemo, useState } from "react"

type InquiryService = "capture" | "onsite" | "consultation" | "training" | "optimization" | "agency" | "other"
type FieldDefinition = { name: string; label: string; type?: "text" | "number" | "date" | "select" | "textarea"; options?: string[]; required?: boolean }

const services: { value: InquiryService; label: string }[] = [
  { value: "capture", label: "Custom 3D Capture & Production" },
  { value: "onsite", label: "On-site 3D Capture" },
  { value: "consultation", label: "Remote 3D Consultation" },
  { value: "training", label: "Remote Training & Workshops" },
  { value: "optimization", label: "3D Optimization & Conversion" },
  { value: "agency", label: "Agency, White-label & Volume Production" },
  { value: "other", label: "Other / Not Sure" },
]

const serviceFields: Record<InquiryService, FieldDefinition[]> = {
  capture: [
    { name: "captureNeeds", label: "What needs to be captured?", type: "textarea" },
    { name: "objectCount", label: "Approximate object count" },
    { name: "dimensionsMaterials", label: "Approximate dimensions and materials" },
    { name: "objectsShippable", label: "Can the objects be shipped?", type: "select", options: ["Yes", "No", "Unsure"] },
    { name: "handling", label: "Special handling or technical requirements", type: "textarea" },
  ],
  onsite: [
    { name: "projectLocation", label: "Project city, state/region, and country" },
    { name: "locationType", label: "Type of location", type: "select", options: ["Business", "Studio", "Museum", "Warehouse", "Outdoor site", "Other"] },
    { name: "captureNeeds", label: "What needs to be captured?", type: "textarea" },
    { name: "onsiteScope", label: "Approximate number and size of objects or spaces" },
    { name: "preferredDates", label: "Preferred dates" },
    { name: "access", label: "Site access, permissions, and restrictions", type: "textarea" },
    { name: "travelSafety", label: "Safety, equipment, or travel considerations", type: "textarea" },
  ],
  consultation: [
    { name: "consultTopic", label: "Primary topic", type: "select", options: ["Capture", "Equipment", "Photogrammetry", "Optimization", "Deployment", "Troubleshooting", "Other"] },
    { name: "challenge", label: "Description of the challenge", type: "textarea" },
    { name: "experience", label: "Experience level", type: "select", options: ["Beginner", "Intermediate", "Advanced"] },
    { name: "sessionLength", label: "Preferred session length", type: "select", options: ["30 minutes", "60 minutes", "90 minutes", "120 minutes", "Not sure"] },
    { name: "sessionDates", label: "Preferred dates or time zone" },
  ],
  training: [
    { name: "trainingSubject", label: "Training subject" },
    { name: "participants", label: "Number of participants", type: "number" },
    { name: "experience", label: "Current experience level", type: "select", options: ["Beginner", "Intermediate", "Advanced", "Mixed"] },
    { name: "objectives", label: "Learning objectives", type: "textarea" },
    { name: "duration", label: "Preferred duration" },
    { name: "trainingDates", label: "Preferred dates or time zone" },
    { name: "trainingFormat", label: "Individual or team training", type: "select", options: ["Individual", "Team", "Custom workshop", "Not sure"] },
  ],
  optimization: [
    { name: "currentFormats", label: "Current file format(s)" },
    { name: "targetFormats", label: "Target format(s) or platform" },
    { name: "assetCount", label: "Approximate asset count" },
    { name: "technicalProblem", label: "Current technical problem or requirement", type: "textarea" },
    { name: "fileSizes", label: "File sizes (optional)" },
  ],
  agency: [
    { name: "productionType", label: "Type of production work", type: "textarea" },
    { name: "assetQuantity", label: "Approximate asset quantity" },
    { name: "projectCadence", label: "One-time or recurring project", type: "select", options: ["One-time", "Recurring", "Unsure"] },
    { name: "whiteLabel", label: "White-label requirement", type: "select", options: ["Yes", "No", "Unsure"] },
    { name: "deliverySchedule", label: "Desired delivery schedule" },
    { name: "integrationRequirements", label: "Integration or technical requirements", type: "textarea" },
  ],
  other: [],
}

const regionNames = new Intl.DisplayNames(["en"], { type: "region" })
const countries = Array.from({ length: 26 * 26 }, (_, index) => String.fromCharCode(65 + Math.floor(index / 26), 65 + (index % 26))).map((code) => ({ code, name: regionNames.of(code) ?? code })).filter(({ code, name }) => name !== code && code !== "EU" && code !== "UN").sort((a, b) => a.name.localeCompare(b.name))

const inputClass = "mt-2 min-h-12 w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-foreground focus:ring-2 focus:ring-ring"
const areaClass = "mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-foreground focus:ring-2 focus:ring-ring"

export default function CustomServicesInquiry({ initialService }: { initialService?: string }) {
  const initial = services.find((service) => service.value === initialService)?.value ?? "capture"
  const [service, setService] = useState<InquiryService>(initial)
  const [values, setValues] = useState<Record<string, string>>({ service: initial })
  const [step, setStep] = useState<"details" | "review" | "draft">("details")
  const serviceLabel = services.find((item) => item.value === service)?.label ?? "Custom Services"
  const selectedEntries = useMemo(() => Object.entries(values).filter(([key, value]) => value.trim() && key !== "service"), [values])

  function update(name: string, value: string) {
    setValues((current) => ({ ...current, [name]: value }))
  }

  function createEmailDraft() {
    const lines = selectedEntries.map(([key, value]) => `${key}: ${value}`)
    const subject = encodeURIComponent(`Custom services inquiry — ${serviceLabel}`)
    const body = encodeURIComponent(`Service: ${serviceLabel}\n\n${lines.join("\n")}`)
    window.location.href = `mailto:hello@topostitch.dev?subject=${subject}&body=${body}`
    setStep("draft")
  }

  function renderField(field: FieldDefinition) {
    const id = `inquiry-${field.name}`
    return <label key={field.name} htmlFor={id} className="block text-sm font-medium text-foreground">
      {field.label}
      {field.type === "textarea" ? <textarea id={id} name={field.name} rows={3} value={values[field.name] ?? ""} onChange={(event) => update(field.name, event.target.value)} className={areaClass} /> : field.type === "select" ? <select id={id} name={field.name} value={values[field.name] ?? ""} onChange={(event) => update(field.name, event.target.value)} className={inputClass}><option value="">Select an option</option>{field.options?.map((option) => <option key={option}>{option}</option>)}</select> : <input id={id} name={field.name} type={field.type ?? "text"} value={values[field.name] ?? ""} onChange={(event) => update(field.name, event.target.value)} className={inputClass} />}
    </label>
  }

  return <section className="mx-auto w-full max-w-5xl px-6 pb-24 pt-12" aria-labelledby="inquiry-title">
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">Paid services · Individually quoted</p>
        <h1 id="inquiry-title" className="mt-4 text-balance text-4xl font-medium tracking-tight md:text-5xl">Let&apos;s scope your project.</h1>
        <p className="mt-5 leading-relaxed text-muted-foreground">Tell us what you need. We&apos;ll review the scope and follow up with a written quote before any payment or scheduling.</p>
        <div className="mt-7 rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">Submitting an inquiry is free. All custom production, consultation, and training services are paid and individually quoted. No payment is required until you review and accept a written quote.</div>
      </aside>

      <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
        {step === "details" && <form onSubmit={(event) => { event.preventDefault(); setStep("review") }} className="flex flex-col gap-8">
          <div><p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Step 1 · Service</p><label htmlFor="service-type" className="mt-4 block text-sm font-medium">What can we help you with?<select id="service-type" value={service} onChange={(event) => { const next = event.target.value as InquiryService; setService(next); setValues((current) => { const nextValues: Record<string, string> = { ...current, service: next }; for (const field of Object.values(serviceFields).flat()) delete nextValues[field.name]; return nextValues }) }} className={inputClass}>{services.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label></div>
          <fieldset className="grid gap-5 border-0 p-0"><legend className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">Step 2 · Contact information</legend>
            <label className="block text-sm font-medium">Full name *<input required autoComplete="name" value={values.name ?? ""} onChange={(event) => update("name", event.target.value)} className={inputClass} /></label>
            <label className="block text-sm font-medium">Email address *<input required type="email" autoComplete="email" value={values.email ?? ""} onChange={(event) => update("email", event.target.value)} className={inputClass} /></label>
            <label className="block text-sm font-medium">Organization / company<input value={values.organization ?? ""} onChange={(event) => update("organization", event.target.value)} className={inputClass} /></label>
            <label className="block text-sm font-medium">Company website<input type="url" value={values.website ?? ""} onChange={(event) => update("website", event.target.value)} className={inputClass} /></label>
            <label className="block text-sm font-medium">Phone number<input type="tel" autoComplete="tel" value={values.phone ?? ""} onChange={(event) => update("phone", event.target.value)} className={inputClass} /></label>
            <label className="block text-sm font-medium">Country *<select required autoComplete="country-name" value={values.country ?? ""} onChange={(event) => update("country", event.target.value)} className={inputClass}><option value="">Select your country</option>{countries.map((country) => <option key={country.code} value={country.name}>{country.name}</option>)}</select></label>
          </fieldset>
          <fieldset className="grid gap-5 border-0 p-0"><legend className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">Step 3 · Project information</legend>
            <label className="block text-sm font-medium">Project description *<textarea required rows={4} value={values.projectDescription ?? ""} onChange={(event) => update("projectDescription", event.target.value)} className={areaClass} /></label>
            <label className="block text-sm font-medium">Desired outcome *<textarea required rows={3} value={values.desiredOutcome ?? ""} onChange={(event) => update("desiredOutcome", event.target.value)} className={areaClass} /></label>
            <fieldset className="border-0 p-0"><legend className="text-sm font-medium">Intended use (optional)</legend><div className="mt-3 grid gap-2 sm:grid-cols-2">{["E-commerce", "Marketing/Advertising", "Web/AR", "Education/Training", "Cultural Heritage", "Software Integration", "Internal Operations", "Other"].map((item) => <label key={item} className="flex items-center gap-2 text-sm text-muted-foreground"><input type="checkbox" checked={(values.intendedUse ?? "").split(", ").includes(item)} onChange={(event) => { const selected = new Set((values.intendedUse ?? "").split(", ").filter(Boolean)); event.target.checked ? selected.add(item) : selected.delete(item); update("intendedUse", [...selected].join(", ")) }} />{item}</label>)}</div></fieldset>
            <label className="block text-sm font-medium">Desired completion date<input type="date" value={values.completionDate ?? ""} onChange={(event) => update("completionDate", event.target.value)} className={inputClass} /></label>
            <label className="block text-sm font-medium">Approximate budget (optional)<select value={values.budget ?? ""} onChange={(event) => update("budget", event.target.value)} className={inputClass}><option value="">Skip this question</option>{["Under $500", "$500–$999", "$1,000–$2,499", "$2,500–$4,999", "$5,000–$9,999", "$10,000+", "Not Sure / Prefer to Discuss"].map((option) => <option key={option}>{option}</option>)}</select><span className="mt-1 block text-xs text-muted-foreground">For inquiry context only; these are not service prices or minimum fees.</span></label>
            <label className="block text-sm font-medium">Reference files or photos<input type="file" multiple disabled className={`${inputClass} disabled:cursor-not-allowed disabled:opacity-60`} aria-describedby="upload-note" /><span id="upload-note" className="mt-1 block text-xs text-muted-foreground">File uploads are unavailable until secure storage is configured. Please do not email sensitive files.</span></label>
            <label className="block text-sm font-medium">Additional notes<textarea rows={3} value={values.notes ?? ""} onChange={(event) => update("notes", event.target.value)} className={areaClass} /></label>
          </fieldset>
          {serviceFields[service].length > 0 && <fieldset className="grid gap-5 border-0 p-0"><legend className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">Step 4 · {serviceLabel}</legend>{serviceFields[service].map(renderField)}</fieldset>}
          {service === "consultation" && <p className="-mt-5 text-xs text-muted-foreground">Session lengths are preferences for the inquiry, not published packages or guaranteed availability.</p>}
          <button type="submit" className="min-h-12 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground hover:bg-primary/90">Review inquiry</button>
        </form>}

        {step === "review" && <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Step 5 · Review and submit</p><h2 className="mt-3 text-2xl font-medium">Review your inquiry</h2><p className="mt-2 text-sm text-muted-foreground">Selected service: {serviceLabel}</p>
          <dl className="mt-6 divide-y divide-border">{selectedEntries.map(([key, value]) => <div key={key} className="grid gap-1 py-3 sm:grid-cols-[12rem_1fr]"><dt className="text-sm font-medium capitalize">{key.replaceAll(/([A-Z])/g, " $1").replaceAll(/[-_]/g, " ")}</dt><dd className="whitespace-pre-wrap text-sm text-muted-foreground">{value}</dd></div>)}</dl>
          <p className="mt-6 rounded-xl bg-muted p-4 text-sm leading-relaxed text-muted-foreground">Submitting an inquiry is free. All custom production, consultation, and training services are paid and individually quoted. No payment is required until you review and accept a written quote.</p>
          <p className="mt-4 text-sm text-muted-foreground">This site is not connected to an inquiry database or email delivery service. Continue below to open an email draft; your inquiry is not sent until you send that email.</p>
          <div className="mt-6 flex flex-wrap gap-3"><button type="button" onClick={() => setStep("details")} className="min-h-12 rounded-lg border border-border px-5 py-3 font-medium">Edit details</button><button type="button" onClick={createEmailDraft} className="min-h-12 rounded-lg bg-primary px-5 py-3 font-medium text-primary-foreground hover:bg-primary/90">{service === "consultation" ? "Request a Consultation Quote" : service === "training" ? "Request a Training Quote" : "Request a Custom Quote"}</button></div>
        </div>}
        {step === "draft" && <div role="status"><p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email handoff</p><h2 className="mt-3 text-2xl font-medium">Your inquiry is ready to send.</h2><p className="mt-4 leading-relaxed text-muted-foreground">Your browser will try to open an email draft addressed to hello@topostitch.dev. Your inquiry is not submitted until you send it from your email app. If no draft opened, email us directly and include the details you entered.</p><a href="mailto:hello@topostitch.dev" className="mt-6 inline-flex min-h-12 items-center rounded-lg border border-border px-5 py-3 font-medium">Email hello@topostitch.dev</a><p className="mt-5 text-sm text-muted-foreground">Review our <a className="underline underline-offset-4" href="/refunds">draft refunds policy</a> and <a className="underline underline-offset-4" href="/terms">draft terms</a>.</p></div>}
      </div>
    </div>
  </section>
}
