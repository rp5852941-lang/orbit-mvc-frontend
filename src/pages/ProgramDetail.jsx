import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PageHero, Reveal, SectionHeading } from "../components/Shared";
import { programCards, IMG, whyChoose } from "../mock";
import { useApply } from "../context/ApplyContext";
import { Button } from "../components/ui/button";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "../components/ui/accordion";
import {
  CheckCircle2, Clock, Laptop, Award, ArrowRight, GraduationCap,
  BadgeCheck, Wallet, Users, ShieldCheck,
} from "lucide-react";

const curriculum = [
  { sem: "Semester 1", topics: ["Foundation & Core Concepts", "Communication Skills", "Digital Tools & IT Basics"] },
  { sem: "Semester 2", topics: ["Applied Theory", "Analytical Methods", "Elective I"] },
  { sem: "Semester 3", topics: ["Specialisation Core", "Project Work", "Elective II"] },
  { sem: "Final Semester", topics: ["Capstone / Dissertation", "Internship", "Industry Certification"] },
];
const outcomes = ["Industry-ready skills", "UGC-recognised degree", "Portfolio & live projects", "Placement assistance"];

export default function ProgramDetail() {
  const { slug } = useParams();
  const { openApply } = useApply();
  const prog = programCards.find((p) => p.slug === slug) || programCards[0];

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  return (
    <div>
      <PageHero crumb={prog.school} title={prog.title} sub={prog.desc} image={IMG.study} />

      {/* Quick facts */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Clock, label: "Duration", value: prog.duration },
            { icon: Laptop, label: "Mode", value: prog.mode },
            { icon: BadgeCheck, label: "Recognition", value: prog.badge },
            { icon: Wallet, label: "Fees", value: "EMI Available" },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-xl bg-brand-soft text-brand flex items-center justify-center"><f.icon className="w-5 h-5" /></span>
              <div>
                <div className="text-xs text-ink-soft">{f.label}</div>
                <div className="font-bold text-ink text-sm">{f.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.6fr_1fr] gap-12">
          {/* Main */}
          <div>
            <Reveal>
              <SectionHeading eyebrow="Programme Overview" title="About the" highlight="programme" />
              <p className="mt-4 text-ink-soft leading-relaxed">{prog.desc} Delivered through Orbit's smart LMS with live interactive sessions, recorded lectures and continuous assessment, this programme is designed to fit around your career and life commitments while keeping you industry-ready.</p>
            </Reveal>

            <Reveal className="mt-10">
              <h3 className="text-xl font-extrabold text-ink mb-4">Programme Structure</h3>
              <Accordion type="single" collapsible defaultValue="item-0" className="space-y-3">
                {curriculum.map((c, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="bg-white border border-slate-100 rounded-2xl px-5">
                    <AccordionTrigger className="font-bold text-ink hover:no-underline py-4">{c.sem}</AccordionTrigger>
                    <AccordionContent className="pb-4">
                      <ul className="space-y-2">
                        {c.topics.map((t) => (
                          <li key={t} className="flex items-center gap-2 text-ink-soft"><CheckCircle2 className="w-4 h-4 text-brand" /> {t}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>

            <Reveal className="mt-10">
              <h3 className="text-xl font-extrabold text-ink mb-4">Learning Outcomes</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {outcomes.map((o) => (
                  <div key={o} className="flex items-center gap-2.5 bg-brand-soft rounded-xl px-4 py-3 text-ink font-medium"><Award className="w-5 h-5 text-brand" /> {o}</div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl bg-brand text-white p-7 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-brand/40 blur-xl" />
                <GraduationCap className="w-8 h-8 text-orangeAccent relative z-10" />
                <h3 className="mt-3 text-xl font-extrabold relative z-10">Apply for {prog.title}</h3>
                <p className="mt-2 text-sm text-white/75 relative z-10">Admissions open for July 2025. Speak to a counsellor and get complete fee & scholarship details.</p>
                <Button onClick={() => openApply(prog.title)} className="btn-orange rounded-full w-full h-12 mt-5 font-semibold relative z-10">Apply Now <ArrowRight className="w-4 h-4 ml-1" /></Button>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-6">
                <h4 className="font-bold text-ink mb-3">Why this programme</h4>
                <ul className="space-y-3 text-sm">
                  {[{ i: ShieldCheck, t: "UGC-DEB entitled degree" }, { i: Users, t: "Learn from industry mentors" }, { i: Wallet, t: "No-cost EMI options" }].map((x, k) => (
                    <li key={k} className="flex items-center gap-2.5 text-ink-soft"><x.i className="w-4 h-4 text-brand" /> {x.t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* related */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading eyebrow="Explore More" title="Related" highlight="programmes" />
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {programCards.filter((p) => p.slug !== prog.slug).slice(0, 3).map((p) => (
              <Link key={p.slug} to={`/programmes/${p.slug}`} className="card-hover bg-white rounded-2xl border border-slate-100 p-6 block" style={{ borderLeft: `4px solid ${p.color}` }}>
                <div className="text-[11px] font-bold uppercase tracking-wide" style={{ color: p.color }}>{p.school}</div>
                <h3 className="text-lg font-extrabold text-ink mt-1">{p.title}</h3>
                <p className="mt-2 text-sm text-ink-soft line-clamp-2">{p.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand">Know More <ArrowRight className="w-4 h-4" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
