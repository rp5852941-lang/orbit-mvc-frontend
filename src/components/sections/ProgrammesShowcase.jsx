import React from "react";
import { Link } from "react-router-dom";
import { programCards } from "../../mock";
import { Reveal, SectionHeading } from "../Shared";
import { useApply } from "../../context/ApplyContext";
import { Button } from "../ui/button";
import {
  BarChart3, Briefcase, Code2, BookOpen, Newspaper, FlaskConical,
  ArrowRight, Clock, Laptop, CheckCircle2,
} from "lucide-react";

const iconMap = { BarChart3, Briefcase, Code2, BookOpen, Newspaper, FlaskConical };

export default function ProgrammesShowcase() {
  const { openApply } = useApply();
  return (
    <section className="relative py-16 bg-brand-soft">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <SectionHeading eyebrow="Academic Programmes" title="Programmes for" highlight="the Digital Age" sub="Programme list in line with UGC (ODL & Online Programmes) Regulations 2020 and NEP 2020." />
          <Link to="/programmes"><Button className="btn-primary rounded-full h-11 px-6 font-semibold whitespace-nowrap">View All Programmes <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
        </div>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programCards.map((p, i) => {
            const Ic = iconMap[p.icon] || BookOpen;
            return (
              <Reveal key={p.slug} delay={i * 50}>
                <div className="card-hover group relative bg-white rounded-2xl overflow-hidden h-full flex flex-col shadow-sm">
                  <div className="h-1.5 bg-brand" />
                  <div className="p-6 flex-1">
                    <div className="flex items-start gap-3">
                      <span className="w-12 h-12 rounded-xl bg-brand-soft text-brand flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:text-white transition-colors"><Ic className="w-6 h-6" /></span>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wide text-brand">{p.school}</div>
                        <h3 className="text-xl font-extrabold text-ink mt-0.5">{p.title}</h3>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-ink-soft leading-relaxed">{p.desc}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="inline-flex items-center gap-1 text-xs bg-slate-50 border border-slate-200 rounded-full px-2.5 py-1 text-ink-soft"><Clock className="w-3 h-3" /> {p.duration}</span>
                      <span className="inline-flex items-center gap-1 text-xs bg-slate-50 border border-slate-200 rounded-full px-2.5 py-1 text-ink-soft"><Laptop className="w-3 h-3" /> {p.mode}</span>
                    </div>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 rounded-full px-2.5 py-1"><CheckCircle2 className="w-3 h-3" /> {p.badge}</span>
                  </div>
                  <div className="px-6 py-4 flex items-center justify-between border-t border-slate-100">
                    <Link to={`/programmes/${p.slug}`} className="text-sm font-bold text-ink hover:text-brand flex items-center gap-1 transition-colors">Know More <ArrowRight className="w-4 h-4" /></Link>
                    <Button onClick={() => openApply(p.title)} className="btn-primary rounded-full h-9 px-5 text-xs font-bold tracking-wide">REGISTER NOW</Button>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
