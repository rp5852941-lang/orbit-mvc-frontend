import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import useReveal from "../hooks/useReveal";

export function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useReveal();
  return (
    <div ref={ref} className={`${className} ${inView ? "in-view reveal" : "reveal"}`} style={inView ? { animationDelay: `${delay}ms` } : {}}>
      {children}
    </div>
  );
}

export function SectionHeading({ eyebrow, title, highlight, sub, center }) {
  return (
    <div className={center ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      {eyebrow && <span className={`eyebrow ${center ? "justify-center" : ""}`}>{eyebrow}</span>}
      <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-ink leading-tight">
        {title} {highlight && <span className="text-orangeAccent">{highlight}</span>}
      </h2>
      {sub && <p className="mt-3 text-ink-soft text-[17px] leading-relaxed">{sub}</p>}
    </div>
  );
}

export function PageHero({ title, crumb, sub, image }) {
  return (
    <section className="relative bg-brand overflow-hidden">
      {image && (
        <>
          <img src={`${image}?auto=format&fit=crop&w=1600&q=70`} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand via-brand/95 to-brand/70" />
        </>
      )}
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "28px 28px" }} />
      <div className="absolute -right-16 -bottom-20 w-72 h-72 rounded-full bg-orangeAccent/20 blur-3xl" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 sm:py-16">
        <div className="flex items-center gap-2 text-sm text-white/70">
          <Link to="/" className="hover:text-orangeAccent transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-orangeAccent font-semibold">{crumb}</span>
        </div>
        <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold text-white leading-tight max-w-3xl">{title}</h1>
        {sub && <p className="mt-4 text-white/80 text-lg max-w-2xl">{sub}</p>}
      </div>
    </section>
  );
}
