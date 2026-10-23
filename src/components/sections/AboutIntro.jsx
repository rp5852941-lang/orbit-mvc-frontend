import React from "react";
import { Link } from "react-router-dom";
import { aboutCards } from "../../mock";
import { Reveal } from "../Shared";
import { Building2, Eye, Target, Quote, ArrowRight } from "lucide-react";

const icons = { Building2, Eye, Target, Quote };
const dot = { backgroundImage: "radial-gradient(circle at 1px 1px, rgba(23,53,107,0.18) 1px, transparent 0)", backgroundSize: "26px 26px" };

export default function AboutIntro() {
  return (
    <section className="relative py-10 overflow-hidden bg-gradient-to-b from-white via-brand/[0.03] to-white">
      <div className="absolute inset-0 opacity-60 pointer-events-none" style={dot} />
      <div className="absolute -left-24 top-10 w-72 h-72 rounded-full bg-orangeAccent/10 blur-3xl pointer-events-none" />
      <div className="absolute -right-24 bottom-10 w-80 h-80 rounded-full bg-brand/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center max-w-5xl mx-auto">
          <span className="eyebrow justify-center">About Orbit Digital University</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-ink leading-tight lg:whitespace-nowrap">
            Building a <span className="text-orangeAccent">Smarter Future</span> Through Education
          </h2>
          <p className="mt-4 text-ink-soft text-[17px] leading-relaxed">Orbit Digital University is committed to delivering innovative, accessible and industry-relevant education for learners worldwide.</p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aboutCards.map((c, i) => {
            const Ic = icons[c.icon] || Building2;
            const active = i === aboutCards.length - 1;
            return (
              <Reveal key={c.n} delay={i * 70}>
                <div className={`card-hover group relative rounded-2xl border p-7 h-full overflow-hidden ${active ? "bg-brand text-white border-brand shadow-xl" : "bg-white/80 backdrop-blur border-slate-100 shadow-sm"}`}>
                  <span className={`absolute -top-4 -right-2 text-7xl font-extrabold select-none ${active ? "text-white/10" : "text-slate-100 group-hover:text-orangeAccent/15"} transition-colors`}>{c.n}</span>
                  <span className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${active ? "bg-white/15 text-white" : "bg-brand text-white group-hover:bg-orangeAccent"}`}><Ic className="w-6 h-6" /></span>
                  <h3 className={`relative mt-5 text-lg font-bold ${active ? "text-white" : "text-ink"}`}>{c.title}</h3>
                  <span className="relative block w-10 h-1 rounded-full bg-orangeAccent mt-2" />
                  <p className={`relative mt-3 text-sm leading-relaxed ${active ? "text-white/85" : "text-ink-soft"}`}>{c.desc}</p>
                  <Link to={active ? "/chancellor" : "/about"} className="relative mt-4 inline-flex items-center gap-1 text-sm font-bold text-orangeAccent transition-all group-hover:gap-2">{active ? "Read Message" : "Know More"} <ArrowRight className="w-4 h-4" /></Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
