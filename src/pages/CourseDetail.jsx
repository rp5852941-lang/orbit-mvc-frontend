import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { PageHero, Reveal, SectionHeading } from "../components/Shared";
import { courses, faculties, IMG } from "../mock";
import { useApply } from "../context/ApplyContext";
import { Button } from "../components/ui/button";
import {
  Briefcase, TrendingUp, BarChart3, Landmark, Code2, Terminal, Cpu, MonitorPlay,
  BookOpen, GraduationCap, LineChart, Bot, Database, BrainCircuit, Cog, Wrench,
  CheckCircle2, Clock, Laptop, Award, ArrowRight, Wallet, ShieldCheck, Layers, Target,
} from "lucide-react";

const iconMap = {
  Briefcase, TrendingUp, BarChart3, Landmark, Code2, Terminal, Cpu, MonitorPlay,
  BookOpen, GraduationCap, LineChart, Bot, Database, BrainCircuit, Cog, Wrench,
};
const outcomes = ["Industry-ready skills", "UGC-recognised degree", "Live projects & portfolio", "Dedicated placement support"];
const semesters = [
  { sem: "Year 1", topics: ["Foundation & core concepts", "Communication & digital skills", "Introductory electives"] },
  { sem: "Year 2", topics: ["Applied theory", "Analytical methods", "Specialization core I"] },
  { sem: "Final Year", topics: ["Specialization core II", "Capstone / project", "Internship & certification"] },
];

export default function CourseDetail() {
  const { slug } = useParams();
  const { openApply } = useApply();
  const c = courses.find((x) => x.slug === slug) || courses[0];
  const fac = faculties.find((f) => f.id === c.faculty) || faculties[0];
  const color = fac.color;
  const Ic = iconMap[c.icon] || BookOpen;
  const related = courses.filter((x) => x.faculty === c.faculty && x.slug !== c.slug).slice(0, 3);

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  return (
    <div>
      <PageHero crumb={fac.name} title={`${c.abbr} — ${c.name}`} sub={`A ${c.level === "UG" ? "undergraduate" : "postgraduate"} programme under the ${fac.name}, delivered online with a smart LMS and live faculty mentorship.`} image={IMG.lecture} />

      {/* Quick facts */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Clock, label: "Duration", value: c.duration },
            { icon: Layers, label: "Level", value: c.level === "UG" ? "Undergraduate" : "Postgraduate" },
            { icon: Laptop, label: "Mode", value: "Online / ODL" },
            { icon: Wallet, label: "Fees", value: "EMI Available" },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${color}15`, color }}><f.icon className="w-5 h-5" /></span>
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
          <div>
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${color}15`, color }}><Ic className="w-7 h-7" /></span>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest" style={{ color }}>{fac.short}</div>
                  <h2 className="text-2xl font-extrabold text-ink">{c.abbr} Programme Overview</h2>
                </div>
              </div>
              <p className="mt-4 text-ink-soft leading-relaxed">The {c.name} ({c.abbr}) is a {c.duration.toLowerCase()} {c.level === "UG" ? "undergraduate" : "postgraduate"} programme designed to build strong fundamentals and job-ready expertise. Delivered through Orbit's smart LMS with live interactive sessions, recorded lectures and continuous assessment, it lets you learn flexibly while staying industry-relevant.</p>
            </Reveal>

            {/* Specializations */}
            <Reveal className="mt-10">
              <h3 className="text-xl font-extrabold text-ink flex items-center gap-2"><Target className="w-5 h-5" style={{ color }} /> Specializations Offered</h3>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                {c.specializations.map((s) => (
                  <div key={s} className="flex items-center gap-2.5 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                    <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color }} />
                    <span className="text-sm font-medium text-ink">{s}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Curriculum */}
            <Reveal className="mt-10">
              <h3 className="text-xl font-extrabold text-ink mb-4">Programme Structure</h3>
              <div className="space-y-3">
                {semesters.map((sm) => (
                  <div key={sm.sem} className="bg-white border border-slate-100 rounded-2xl p-5">
                    <div className="font-bold text-ink">{sm.sem}</div>
                    <ul className="mt-2 grid sm:grid-cols-3 gap-2">
                      {sm.topics.map((t) => (
                        <li key={t} className="flex items-center gap-2 text-sm text-ink-soft"><CheckCircle2 className="w-4 h-4" style={{ color }} /> {t}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Outcomes */}
            <Reveal className="mt-10">
              <h3 className="text-xl font-extrabold text-ink mb-4">Learning Outcomes</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {outcomes.map((o) => (
                  <div key={o} className="flex items-center gap-2.5 rounded-xl px-4 py-3 font-medium text-ink" style={{ background: `${color}0d` }}><Award className="w-5 h-5" style={{ color }} /> {o}</div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sticky top-28 space-y-6">
              <div className="rounded-2xl bg-brand text-white p-7 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-orangeAccent/25 blur-xl" />
                <GraduationCap className="w-8 h-8 text-orangeAccent relative z-10" />
                <h3 className="mt-3 text-xl font-extrabold relative z-10">Apply for {c.abbr}</h3>
                <p className="mt-2 text-sm text-white/75 relative z-10">Admissions open for 2025-26. Talk to a counsellor for fees, scholarships & EMI options.</p>
                <Button onClick={() => openApply(`${c.abbr} — ${c.name}`)} className="btn-orange rounded-full w-full h-12 mt-5 font-semibold relative z-10">Apply Now <ArrowRight className="w-4 h-4 ml-1" /></Button>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-6">
                <h4 className="font-bold text-ink mb-3">Why this programme</h4>
                <ul className="space-y-3 text-sm">
                  {[{ i: ShieldCheck, t: "UGC-DEB entitled degree" }, { i: MonitorPlay, t: "Live classes + recorded lectures" }, { i: Wallet, t: "No-cost EMI options" }].map((x, k) => (
                    <li key={k} className="flex items-center gap-2.5 text-ink-soft"><x.i className="w-4 h-4" style={{ color }} /> {x.t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-14 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading eyebrow={fac.short} title="Related" highlight="courses" />
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => {
                const RIc = iconMap[r.icon] || BookOpen;
                return (
                  <Link key={r.slug} to={`/course/${r.slug}`} className="card-hover bg-white rounded-2xl border border-slate-100 p-6 block" style={{ borderTop: `3px solid ${color}` }}>
                    <span className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${color}15`, color }}><RIc className="w-5 h-5" /></span>
                    <h3 className="mt-4 text-xl font-extrabold text-ink">{r.abbr}</h3>
                    <p className="text-sm text-ink-soft">{r.name}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-brand">Explore Programme <ArrowRight className="w-4 h-4" /></span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
