import React from "react";
import { whyOrbit, whyCounters, IMG } from "../../mock";
import { Reveal, SectionHeading } from "../Shared";
import { Lightbulb, Target, LifeBuoy, MonitorPlay } from "lucide-react";

const icons = { Lightbulb, Target, LifeBuoy, MonitorPlay };

export default function WhyOrbit() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_1.2fr] gap-14 items-center">
        <div>
          <SectionHeading eyebrow="About Orbit Digital University" title="Why choose" highlight="Orbit" sub="A modern learning ecosystem for students and working professionals who need flexible, technology-enabled and career-focused education." />
          <div className="mt-8 grid grid-cols-2 gap-4">
            {whyCounters.map((c) => (
              <Reveal key={c.label}>
                <div className="rounded-2xl bg-brand text-white p-5 text-center">
                  <div className="text-3xl font-extrabold text-orangeAccent">{c.value}</div>
                  <div className="text-xs text-white/70 mt-1">{c.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-5 text-xs text-ink-soft">Programme numbers are indicative and expanding each academic session.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {whyOrbit.map((w, i) => {
            const Ic = icons[w.icon] || Lightbulb;
            return (
              <Reveal key={w.title} delay={i * 70}>
                <div className={`card-hover rounded-2xl border border-slate-100 p-7 h-full ${i % 2 === 0 ? "bg-orangeAccent/[0.06]" : "bg-white"}`}>
                  <span className="w-12 h-12 rounded-xl bg-orangeAccent text-white flex items-center justify-center"><Ic className="w-6 h-6" /></span>
                  <h3 className="mt-5 text-lg font-bold text-ink">{w.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">{w.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
