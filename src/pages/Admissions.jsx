import React from "react";
import { PageHero, Reveal, SectionHeading } from "../components/Shared";
import { steps, IMG, faqs } from "../mock";
import { useApply } from "../context/ApplyContext";
import { Button } from "../components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "../components/ui/accordion";
import { CheckCircle2, ArrowRight, FileText, CreditCard, CalendarDays } from "lucide-react";

const eligibility = [
  { level: "Undergraduate (UG)", req: "10+2 (any stream) from a recognised board with minimum 45% aggregate." },
  { level: "Postgraduate (PG)", req: "Bachelor's degree in relevant discipline from a recognised university with 50% aggregate." },
  { level: "Diploma & Certificate", req: "10+2 or equivalent. Some programmes may have specific prerequisites." },
];
const documents = ["Passport size photograph", "Class 10 & 12 marksheets", "Graduation marksheet (for PG)", "Valid ID proof (Aadhaar/Passport)", "Category certificate (if applicable)"];
const dates = [
  { label: "Application Opens", value: "01 July 2025" },
  { label: "Last Date to Apply", value: "31 August 2025" },
  { label: "Session Begins", value: "15 September 2025" },
];

export default function Admissions() {
  const { openApply } = useApply();
  return (
    <div>
      <PageHero crumb="Admissions 2025" title="Your journey starts here" sub="A simple, fully online admission process with counsellor support at every step." image={IMG.lecture} />

      {/* Steps */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading center eyebrow="Process" title="Admission in" highlight="4 simple steps" />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <Reveal key={s.n}>
                <div className="relative bg-white rounded-2xl border border-slate-100 p-6 h-full card-hover">
                  <div className="text-5xl font-extrabold text-brand/15">{s.n}</div>
                  <h3 className="mt-2 text-lg font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility + dates */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.5fr_1fr] gap-10">
          <div>
            <SectionHeading eyebrow="Eligibility" title="Who can" highlight="apply" />
            <div className="mt-8 space-y-4">
              {eligibility.map((e) => (
                <Reveal key={e.level}>
                  <div className="bg-white rounded-2xl border border-slate-100 p-5 flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-brand shrink-0" />
                    <div>
                      <h3 className="font-bold text-ink">{e.level}</h3>
                      <p className="text-sm text-ink-soft mt-1">{e.req}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <h3 className="mt-10 text-xl font-extrabold text-ink flex items-center gap-2"><FileText className="w-5 h-5 text-brand" /> Documents Required</h3>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {documents.map((d) => (
                <div key={d} className="flex items-center gap-2.5 bg-white rounded-xl border border-slate-100 px-4 py-3 text-sm text-ink"><CheckCircle2 className="w-4 h-4 text-brand" /> {d}</div>
              ))}
            </div>
          </div>

          <div>
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl bg-white border border-slate-100 p-6">
                <h3 className="font-bold text-ink flex items-center gap-2"><CalendarDays className="w-5 h-5 text-brand" /> Important Dates</h3>
                <ul className="mt-4 space-y-3">
                  {dates.map((d) => (
                    <li key={d.label} className="flex items-center justify-between text-sm border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                      <span className="text-ink-soft">{d.label}</span>
                      <span className="font-bold text-ink">{d.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-brand text-white p-6 relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
                <CreditCard className="w-7 h-7 text-orangeAccent relative z-10" />
                <h3 className="mt-2 font-extrabold text-lg relative z-10">No-cost EMI available</h3>
                <p className="text-sm text-white/80 mt-1 relative z-10">Pay your fees in easy monthly instalments with zero interest.</p>
                <Button onClick={() => openApply()} className="btn-orange rounded-full w-full h-11 mt-4 font-semibold relative z-10">Apply Now <ArrowRight className="w-4 h-4 ml-1" /></Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeading center eyebrow="Need Help?" title="Admission" highlight="FAQs" />
          <Accordion type="single" collapsible className="mt-8 space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`i-${i}`} className="bg-white border border-slate-100 rounded-2xl px-5">
                <AccordionTrigger className="text-left font-bold text-ink hover:no-underline py-4">{f.q}</AccordionTrigger>
                <AccordionContent className="text-ink-soft leading-relaxed pb-4">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
