import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { heroSlides, heroBadges } from "../mock";
import { useApply } from "../context/ApplyContext";
import { Button } from "./ui/button";
import {
  ChevronLeft, ChevronRight, ArrowRight, Phone, Sparkles, GraduationCap,
  Clock, ShieldCheck, Award, TrendingUp, CheckCircle2,
} from "lucide-react";

const badgeIcons = [ShieldCheck, Award, TrendingUp];

export default function HeroSlider() {
  const { openApply } = useApply();
  const [index, setIndex] = useState(0);
  const count = heroSlides.length;
  const go = useCallback((i) => setIndex((i + count) % count), [count]);
  const next = useCallback(() => setIndex((p) => (p + 1) % count), [count]);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  const slide = heroSlides[index];

  return (
    <section className="relative overflow-hidden bg-brand" data-testid="hero-slider">
      <div className="relative h-[520px] sm:h-[560px] lg:h-[560px]">
        {/* Backgrounds */}
        {heroSlides.map((s, i) => (
          <div key={s.id} className={`absolute inset-0 transition-opacity duration-[900ms] ease-out ${i === index ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
            <img src={`${s.image}?auto=format&fit=crop&w=1920&q=80`} alt={s.title} className="w-full h-full object-cover object-right" />
            {/* Navy zone on the left keeps text crisp; image ~25% visible on the right */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, #17356b 0%, #17356b 46%, rgba(23,53,107,0.85) 62%, rgba(23,53,107,0.45) 100%)" }} />
            <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "30px 30px" }} />
          </div>
        ))}

        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="w-full grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
            {/* Left text zone */}
            <div key={slide.id} className="text-white animate-fade-up pb-20 lg:pb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase bg-orangeAccent text-white">
                <Sparkles className="w-3.5 h-3.5" /> Admissions Open 2026-27
              </span>
              <h1 className="mt-5 text-6xl sm:text-7xl font-black leading-none tracking-tight">{slide.abbr}</h1>
              <p className="mt-2 text-xl sm:text-2xl font-bold text-orangeAccent">{slide.title}</p>
              <p className="mt-4 text-lg font-semibold italic text-white/90">{slide.tagline}</p>
              <p className="mt-3 max-w-lg text-white/70 leading-relaxed">{slide.desc}</p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {slide.chips.map((c) => (
                  <span key={c} className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold bg-white/10 border border-white/15 text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-orangeAccent" /> {c}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Button onClick={() => openApply(`${slide.abbr} — ${slide.title}`)} className="btn-orange rounded-full h-12 px-7 text-base font-semibold" data-testid="hero-apply-btn">
                  Apply Now <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Link to={`/course/${slide.slug}`} className="inline-flex items-center gap-2 font-bold text-white border-b-2 border-white/40 hover:border-orangeAccent hover:text-orangeAccent pb-0.5 transition-colors" data-testid="hero-course-link">
                  Course Details <ArrowRight className="w-4 h-4" />
                </Link>
               
              </div>
            </div>

            {/* Right comparison cards */}
            <div className="hidden lg:grid grid-cols-3 gap-4 pb-16">
              {slide.cards.map((c, i) => (
                <div
                  key={c.name + i}
                  className={`animate-fade-up rounded-2xl p-5 text-center border transition-all ${c.hi ? "bg-orangeAccent border-orangeAccent shadow-2xl scale-[1.05] text-white" : "bg-white/95 border-white/60 shadow-lg text-ink"}`}
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <span className={`mx-auto w-11 h-11 rounded-xl flex items-center justify-center ${c.hi ? "bg-white/20 text-white" : "bg-brand/10 text-brand"}`}>
                    <GraduationCap className="w-5 h-5" />
                  </span>
                  <div className={`mt-3 font-extrabold text-[15px] leading-tight ${c.hi ? "text-white" : "text-ink"}`}>{c.name}</div>
                  <div className={`mt-4 pt-3 border-t ${c.hi ? "border-white/25" : "border-slate-200"}`}>
                    <div className={`text-[10px] font-bold uppercase tracking-widest ${c.hi ? "text-white/70" : "text-ink-soft/70"}`}>Duration</div>
                    <div className={`inline-flex items-center gap-1 text-sm font-bold ${c.hi ? "text-white" : "text-brand"}`}><Clock className="w-3.5 h-3.5" /> {c.duration}</div>
                  </div>
                  <div className="mt-3">
                    <div className={`text-[10px] font-bold uppercase tracking-widest ${c.hi ? "text-white/70" : "text-ink-soft/70"}`}>Eligibility</div>
                    <div className={`text-xs font-medium mt-0.5 ${c.hi ? "text-white/90" : "text-ink-soft"}`}>{c.elig}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust badges strip */}
        <div className="absolute z-10 bottom-14 lg:bottom-16 left-0 right-0">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center gap-x-7 gap-y-2 justify-center lg:justify-start">
            {heroBadges.map((b, i) => {
              const Ic = badgeIcons[i] || ShieldCheck;
              return (
                <span key={b} className="inline-flex items-center gap-2 text-sm font-semibold text-white/85">
                  <Ic className="w-4 h-4 text-orangeAccent" /> {b}
                </span>
              );
            })}
          </div>
        </div>

       
        <button onClick={() => go(index - 1)} aria-label="Previous" data-testid="hero-prev" className="absolute z-20 left-4 lg:left-6 top-[44%] w-11 h-11 rounded-full bg-white/15 hover:bg-white text-white hover:text-ink flex items-center justify-center transition-colors backdrop-blur"><ChevronLeft className="w-5 h-5" /></button>
        <button onClick={() => go(index + 1)} aria-label="Next" data-testid="hero-next" className="absolute z-20 right-4 lg:right-6 top-[44%] w-11 h-11 rounded-full bg-white/15 hover:bg-white text-white hover:text-ink flex items-center justify-center transition-colors backdrop-blur"><ChevronRight className="w-5 h-5" /></button>

        <div className="absolute z-20 bottom-6 left-0 right-0 flex items-center justify-center gap-2">
          {heroSlides.map((s, i) => (
            <button key={s.id} onClick={() => go(i)} aria-label={`Slide ${i + 1}`} className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-7 bg-orangeAccent" : "w-2 bg-white/40 hover:bg-white/70"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
