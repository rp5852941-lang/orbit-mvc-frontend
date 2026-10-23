import React, { useState } from "react";
import { Link } from "react-router-dom";
import { announcements, whyOrbit, whyCounters } from "../../mock";
import { Reveal } from "../Shared";
import {
  ChevronRight, ArrowRight, Lightbulb, Target, LifeBuoy, MonitorPlay,
} from "lucide-react";

const whyIcons = { Lightbulb, Target, LifeBuoy, MonitorPlay };
const tabs = Object.keys(announcements);
const dot = { backgroundImage: "radial-gradient(circle at 1px 1px, rgba(23,53,107,0.25) 1px, transparent 0)", backgroundSize: "24px 24px" };

export default function AnnouncementsWhy() {
  const [tab, setTab] = useState(tabs[0]);
  return (
    <section className="relative py-10 bg-slate-50 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.6] pointer-events-none" style={dot} />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-[0.9fr_1.1fr] gap-8">
        {/* LEFT: Announcements */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 border-t-4 border-t-orangeAccent">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="eyebrow">Latest Updates</span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-ink">Announcements &amp; <span className="text-orangeAccent">Notices</span></h2>
            </div>
            <Link to="/admissions" className="text-sm font-semibold text-orangeAccent flex items-center gap-1 hover:gap-2 transition-all shrink-0 mt-1">View All <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="mt-4 flex gap-6 border-b border-slate-100">
            {tabs.map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`pb-3 text-sm font-semibold border-b-2 -mb-px transition-colors ${tab === t ? "border-orangeAccent text-brand" : "border-transparent text-ink-soft hover:text-ink"}`}>{t}</button>
            ))}
          </div>
          <div className="mt-2 divide-y divide-slate-100">
            {announcements[tab].map((a) => (
              <div key={a.title} className="group flex items-center gap-4 py-4 cursor-pointer">
                <div className="shrink-0 w-14 h-14 rounded-xl bg-brand/5 text-brand flex flex-col items-center justify-center">
                  <span className="text-xl font-extrabold leading-none">{a.day}</span>
                  <span className="text-[10px] font-bold tracking-wide">{a.mon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-ink text-[15px] leading-snug group-hover:text-orangeAccent transition-colors">{a.title}</h3>
                  <p className="text-sm text-ink-soft mt-0.5">{a.sub}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-orangeAccent group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Why Choose */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 border-t-4 border-t-brand">
          <span className="eyebrow">About Orbit Digital University</span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-ink">Why Choose Orbit Digital University</h2>
          <p className="mt-2 text-ink-soft text-sm leading-relaxed">A modern learning ecosystem for students and working professionals who need flexible, technology-enabled and career-focused education.</p>

          <div className="mt-6 grid sm:grid-cols-[1.3fr_0.7fr] gap-5">
            <div className="grid grid-cols-2 gap-4">
              {whyOrbit.map((w) => {
                const Ic = whyIcons[w.icon] || Lightbulb;
                return (
                  <div key={w.title} className="rounded-xl border border-slate-100 p-4 hover:border-orangeAccent/40 hover:shadow-sm transition-all">
                    <span className="w-10 h-10 rounded-lg bg-orangeAccent/10 text-orangeAccent flex items-center justify-center"><Ic className="w-5 h-5" /></span>
                    <h3 className="mt-3 font-bold text-ink text-sm">{w.title}</h3>
                    <p className="mt-1 text-xs text-ink-soft leading-relaxed">{w.desc}</p>
                  </div>
                );
              })}
            </div>
            <div className="rounded-2xl bg-brand text-white p-5 flex flex-col justify-between">
              {whyCounters.map((c, i) => (
                <div key={c.label} className={`py-2.5 ${i < whyCounters.length - 1 ? "border-b border-white/10" : ""}`}>
                  <div className="text-2xl font-extrabold text-orangeAccent">{c.value}</div>
                  <div className="text-[11px] uppercase tracking-wide text-white/70">{c.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
