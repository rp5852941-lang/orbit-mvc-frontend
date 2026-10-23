import React, { useState } from "react";
import { announcements } from "../../mock";
import { Reveal, SectionHeading } from "../Shared";
import { ArrowUpRight, Megaphone } from "lucide-react";

const tabs = Object.keys(announcements);

export default function Announcements() {
  const [active, setActive] = useState(tabs[0]);
  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <SectionHeading eyebrow="Latest Updates" title="Announcements &" highlight="notices" />
          <div className="flex gap-2 bg-white border border-slate-200 rounded-full p-1">
            {tabs.map((t) => (
              <button key={t} onClick={() => setActive(t)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${active === t ? "bg-brand text-white" : "text-ink-soft hover:text-ink"}`}>{t}</button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {announcements[active].map((a, i) => (
            <Reveal key={a.title} delay={i * 60}>
              <div className="card-hover group bg-white rounded-2xl border border-slate-100 p-6 h-full flex gap-4">
                <div className="shrink-0 w-16 h-16 rounded-xl bg-orangeAccent/10 text-orangeAccent flex flex-col items-center justify-center">
                  <span className="text-2xl font-extrabold leading-none">{a.day}</span>
                  <span className="text-[11px] font-bold tracking-wide">{a.mon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <Megaphone className="w-4 h-4 text-ink-soft/50 mt-1" />
                    <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-orangeAccent transition-colors" />
                  </div>
                  <h3 className="font-bold text-ink leading-snug group-hover:text-orangeAccent transition-colors">{a.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{a.sub}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
