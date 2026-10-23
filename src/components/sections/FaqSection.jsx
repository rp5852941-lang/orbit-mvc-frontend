import React, { useMemo, useState } from "react";
import { faqTabs, faqList } from "../../mock";
import { Reveal } from "../Shared";
import { useApply } from "../../context/ApplyContext";
import { Button } from "../ui/button";
import { Plus, Minus, Phone, HelpCircle } from "lucide-react";

export default function FaqSection() {
  const { openApply } = useApply();
  const [tab, setTab] = useState("All");
  const [open, setOpen] = useState([0]);

  const list = useMemo(
    () => (tab === "All" ? faqList : faqList.filter((f) => f.cat === tab)),
    [tab]
  );
  const toggle = (i) => setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]));

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow justify-center">Learner Help Desk & Admissions Intel</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-ink">Frequently Asked <span className="text-orangeAccent">Questions</span></h2>
          <p className="mt-3 text-ink-soft">Quick answers to common questions about Orbit Digital University, programmes, LMS and admissions.</p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {faqTabs.map((t) => (
            <button key={t} onClick={() => { setTab(t); setOpen([0]); }} className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${tab === t ? "bg-brand text-white" : "bg-white border border-slate-200 text-ink-soft hover:text-brand hover:border-brand"}`}>{t}</button>
          ))}
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {list.map((f, i) => {
            const isOpen = open.includes(i);
            return (
              <div key={f.q} className="bg-white border border-slate-100 rounded-2xl overflow-hidden h-fit shadow-sm">
                <button onClick={() => toggle(i)} className="w-full flex items-center gap-3 text-left px-5 py-4">
                  <span className="w-8 h-8 rounded-full bg-orangeAccent/10 text-orangeAccent flex items-center justify-center shrink-0"><HelpCircle className="w-4 h-4" /></span>
                  <span className="font-bold text-ink flex-1 text-[15px]">{f.q}</span>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? "bg-orangeAccent text-white" : "bg-slate-100 text-ink"}`}>{isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}</span>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden"><p className="px-5 pb-4 pl-16 text-sm text-ink-soft leading-relaxed">{f.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>

        <Reveal className="mt-10">
          <div className="rounded-2xl bg-brand text-white p-7 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 rounded-full bg-orangeAccent/20 text-orangeAccent flex items-center justify-center shrink-0"><HelpCircle className="w-6 h-6" /></span>
              <div>
                <h3 className="font-bold text-lg">Still have questions?</h3>
                <p className="text-sm text-white/70">Our admissions advisors are here to guide you through eligibility and pre-registration.</p>
              </div>
            </div>
            <div className="flex gap-3 shrink-0">
              <a href="tel:+919876543210"><Button variant="outline" className="rounded-full h-11 px-5 font-semibold bg-transparent border-white/40 text-white hover:bg-white hover:text-brand"><Phone className="w-4 h-4 mr-1" /> Call Us</Button></a>
              <Button onClick={() => openApply()} className="btn-orange rounded-full h-11 px-6 font-semibold">Contact Us</Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
