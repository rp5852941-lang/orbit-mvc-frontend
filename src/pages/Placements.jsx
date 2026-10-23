import React from "react";
import { PageHero, Reveal, SectionHeading } from "../components/Shared";
import { IMG, testimonials } from "../mock";
import { useApply } from "../context/ApplyContext";
import { Button } from "../components/ui/button";
import { TrendingUp, Building2, Briefcase, Star, Quote, ArrowRight } from "lucide-react";

const placementStats = [
  { value: "92%", label: "Placement Rate" },
  { value: "120+", label: "Hiring Partners" },
  { value: "\u20B912 LPA", label: "Highest Package" },
  { value: "\u20B94.8 LPA", label: "Average Package" },
];
const recruiters = ["TechNova", "FinEdge", "MediaWorks", "CloudCore", "BrightBank", "DataForge", "NextGen", "OrbitLabs"];
const support = [
  { icon: Briefcase, title: "Career Counselling", desc: "One-on-one guidance to map your strengths to the right roles and industries." },
  { icon: TrendingUp, title: "Skill Building", desc: "Resume workshops, mock interviews and communication & aptitude training." },
  { icon: Building2, title: "Industry Connect", desc: "Exclusive job drives, internships and networking with 120+ hiring partners." },
];

export default function Placements() {
  const { openApply } = useApply();
  return (
    <div>
      <PageHero crumb="Placements" title="Careers that take off" sub="A dedicated career cell and strong industry network to turn your degree into a great job." image={IMG.grad2} />

      <section className="py-14 bg-brand text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {placementStats.map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-extrabold">{s.value}</div>
              <div className="mt-1 text-white/80 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading center eyebrow="Career Support" title="We support you" highlight="end to end" />
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {support.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="card-hover bg-white rounded-2xl border border-slate-100 p-8 h-full">
                  <span className="w-14 h-14 rounded-2xl bg-brand-soft text-brand flex items-center justify-center"><s.icon className="w-7 h-7" /></span>
                  <h3 className="mt-5 text-xl font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 text-ink-soft leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Recruiters */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading center eyebrow="Our Recruiters" title="Where our learners" highlight="get hired" />
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recruiters.map((r) => (
              <div key={r} className="bg-white rounded-2xl border border-slate-100 py-8 flex items-center justify-center font-extrabold text-lg text-ink/70 hover:text-brand hover:shadow-md transition-all">{r}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Success stories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading center eyebrow="Success Stories" title="From learners to" highlight="leaders" />
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 80}>
                <div className="card-hover bg-white rounded-2xl border border-slate-100 p-7 h-full flex flex-col">
                  <Quote className="w-8 h-8 text-brand/25" />
                  <p className="mt-3 text-ink-soft leading-relaxed flex-1">{t.quote}</p>
                  <div className="flex gap-0.5 mt-4">{[...Array(5)].map((_, k) => <Star key={k} className="w-4 h-4 fill-orangeAccent text-orangeAccent" />)}</div>
                  <div className="mt-4 flex items-center gap-3 pt-4 border-t border-slate-100">
                    <img src={`${t.img}?auto=format&fit=crop&w=100&q=80`} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                    <div><div className="font-bold text-ink text-sm">{t.name}</div><div className="text-xs text-ink-soft">{t.role}</div></div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button onClick={() => openApply()} className="btn-primary rounded-full h-12 px-8 font-semibold">Start Your Journey <ArrowRight className="w-4 h-4 ml-1" /></Button>
          </div>
        </div>
      </section>
    </div>
  );
}
