import React from "react";
import { heroFeatures } from "../../mock";
import { Reveal } from "../Shared";
import { GraduationCap, Video, BookOpen, Clock } from "lucide-react";

const icons = { GraduationCap, Video, BookOpen, Clock };

export default function HeroFeatures() {
  return (
    <section className="relative z-30 -mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {heroFeatures.map((f, i) => {
            const Ic = icons[f.icon] || GraduationCap;
            const accent = i % 2 === 0 ? "#f26522" : "#17356b";
            return (
              <Reveal key={f.title} delay={i * 70}>
                <div className="card-hover bg-white rounded-2xl border border-slate-100 p-6 h-full" style={{ borderTop: `3px solid ${accent}` }}>
                  <div className="flex items-center gap-3">
                    <span className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${accent}15`, color: accent }}>
                      <Ic className="w-5 h-5" />
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: accent }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: accent }} /> {f.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-extrabold text-ink leading-snug">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
