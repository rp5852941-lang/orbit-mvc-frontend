import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { programCards, IMG } from "../../mock";
import { useApply } from "../../context/ApplyContext";
import { Button } from "../ui/button";
import {
  BarChart3, Briefcase, Code2, BookOpen, Newspaper, FlaskConical,
  ChevronLeft, ChevronRight, ArrowRight, Clock, Laptop, CheckCircle2,
} from "lucide-react";

const iconMap = { BarChart3, Briefcase, Code2, BookOpen, Newspaper, FlaskConical };
const imgFor = {
  "bcom-mcom": IMG.textbooks,
  "bba-mba": IMG.collab,
  "bca-mca": IMG.video,
  "ba-ma-blis": IMG.study,
  "ba-jmc": IMG.lecture,
  "bsc-msc": IMG.grad1,
};

export default function ProgrammesSlider() {
  const { openApply } = useApply();
  const [index, setIndex] = useState(0);
  const count = programCards.length;
  const go = useCallback((i) => setIndex((i + count) % count), [count]);
  const next = useCallback(() => setIndex((p) => (p + 1) % count), [count]);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  const p = programCards[index];
  const Ic = iconMap[p.icon] || BookOpen;

  return (
    <section className="py-16 bg-brand-soft">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="eyebrow justify-center">Academic Programmes</span>
          <h2 className="mt-3 text-3xl sm:text-[2.6rem] font-extrabold text-ink leading-tight">
            Programmes for <span className="text-orangeAccent">the Digital Age</span>
          </h2>
          <p className="mt-3 text-ink-soft">Programme list in line with UGC (ODL & Online Programmes) Regulations 2020 and NEP 2020.</p>
        </div>

        {/* Faculty tabs */}
        <div className="mt-8 flex flex-wrap justify-center gap-1">
          {programCards.map((c, i) => {
            const TIc = iconMap[c.icon] || BookOpen;
            return (
              <button key={c.slug} onClick={() => go(i)} className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${i === index ? "bg-brand text-white shadow-md" : "bg-white text-ink-soft hover:text-brand border border-slate-200"}`}>
                <TIc className="w-4 h-4" /> {c.title}
              </button>
            );
          })}
        </div>

        {/* Banner */}
        <div className="mt-10 relative">
          <div className="relative rounded-[2rem] overflow-hidden shadow-[0_40px_80px_-40px_rgba(23,53,107,0.5)] min-h-[440px] flex">
            {programCards.map((c, i) => (
              <img key={c.slug} src={`${imgFor[c.slug] || IMG.lecture}?auto=format&fit=crop&w=1600&q=80`} alt={c.title} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[900ms] ${i === index ? "opacity-100" : "opacity-0"}`} />
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand/90 to-brand/30" />
            <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "26px 26px" }} />

            <div key={p.slug} className="relative z-10 w-full flex items-center px-8 sm:px-14 py-12">
              <div className="max-w-xl text-white animate-fade-up">
                <div className="flex items-center gap-3">
                  <span className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur"><Ic className="w-6 h-6 text-white" /></span>
                  <span className="text-[12px] font-bold uppercase tracking-widest text-white/85">{p.school}</span>
                </div>
                <h3 className="mt-5 text-3xl sm:text-4xl font-extrabold leading-tight">{p.title}</h3>
                <p className="mt-4 text-white/85 leading-relaxed">{p.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/12 border border-white/20 rounded-full px-3 py-1.5"><Clock className="w-3.5 h-3.5" /> {p.duration}</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/12 border border-white/20 rounded-full px-3 py-1.5"><Laptop className="w-3.5 h-3.5" /> {p.mode}</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/12 border border-white/20 rounded-full px-3 py-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-green-300" /> {p.badge}</span>
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button onClick={() => openApply(p.title)} className="btn-orange rounded-full h-12 px-7 font-semibold">Register Now <ArrowRight className="w-4 h-4 ml-1" /></Button>
                  <Link to={`/programmes/${p.slug}`}><Button variant="outline" className="rounded-full h-12 px-7 font-semibold bg-white/10 border-white/40 text-white hover:bg-white hover:text-brand">Know More</Button></Link>
                </div>
              </div>
            </div>

            <button onClick={() => go(index - 1)} aria-label="Previous" className="absolute z-20 left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white text-white hover:text-brand flex items-center justify-center transition-colors backdrop-blur"><ChevronLeft className="w-5 h-5" /></button>
            <button onClick={() => go(index + 1)} aria-label="Next" className="absolute z-20 right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white text-white hover:text-brand flex items-center justify-center transition-colors backdrop-blur"><ChevronRight className="w-5 h-5" /></button>

            <div className="absolute z-20 bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
              {programCards.map((c, i) => (
                <button key={c.slug} onClick={() => go(i)} aria-label={`Slide ${i + 1}`} className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-8 bg-orangeAccent" : "w-2.5 bg-white/50 hover:bg-white/80"}`} />
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <Link to="/programmes"><Button className="btn-primary rounded-full h-12 px-8 font-semibold">View All Programmes <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
        </div>
      </div>
    </section>
  );
}
