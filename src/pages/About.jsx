import React from "react";
import { PageHero, Reveal, SectionHeading } from "../components/Shared";
import { stats, IMG, whyChoose, approvals } from "../mock";
import { useApply } from "../context/ApplyContext";
import { Button } from "../components/ui/button";
import {
  Target, Eye, Heart, CheckCircle2, ArrowRight,
  ShieldCheck, MonitorPlay, Users, Award, Wallet, Briefcase,
} from "lucide-react";

const iconMap = { ShieldCheck, MonitorPlay, Users, Award, Wallet, Briefcase };
const values = [
  { icon: Target, title: "Our Mission", desc: "To democratise quality higher education through technology, making recognised degrees accessible to every learner, anywhere." },
  { icon: Eye, title: "Our Vision", desc: "To be India's most trusted digital university, shaping career-ready graduates for a rapidly evolving world." },
  { icon: Heart, title: "Our Values", desc: "Integrity, inclusivity, innovation and learner success sit at the heart of everything we do." },
];

export default function About() {
  const { openApply } = useApply();
  return (
    <div>
      <PageHero crumb="About Us" title="Thought of a Digital University" sub="Orbit Digital University is reimagining higher education for the digital age — flexible, affordable and future-focused." image={IMG.grad1} />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <SectionHeading eyebrow="Who We Are" title="Empowering learners for the" highlight="future of work" sub="Founded on the belief that geography should never limit ambition, Orbit Digital University delivers UGC-entitled online and ODL programmes across five schools. Our learner-first approach combines expert faculty, a powerful LMS and dedicated career support." />
            <ul className="mt-6 space-y-3">
              {["Recognised by UGC-DEB, AICTE aligned curriculum", "25,000+ active learners across India & abroad", "Industry partnerships for real placement outcomes"].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-ink font-medium"><CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" /> {t}</li>
              ))}
            </ul>
            <Button onClick={() => openApply()} className="btn-primary rounded-full h-12 px-7 mt-7 font-semibold">Join Orbit <ArrowRight className="w-4 h-4 ml-1" /></Button>
          </Reveal>
          <Reveal delay={120} className="grid grid-cols-2 gap-4">
            <img src={`${IMG.collab}?auto=format&fit=crop&w=500&q=80`} alt="campus" className="rounded-2xl h-56 w-full object-cover" />
            <img src={`${IMG.textbooks}?auto=format&fit=crop&w=500&q=80`} alt="study" className="rounded-2xl h-56 w-full object-cover mt-8" />
            <img src={`${IMG.video}?auto=format&fit=crop&w=500&q=80`} alt="online" className="rounded-2xl h-56 w-full object-cover" />
            <img src={`${IMG.grad2}?auto=format&fit=crop&w=500&q=80`} alt="grad" className="rounded-2xl h-56 w-full object-cover mt-8" />
          </Reveal>
        </div>
      </section>

      {/* Stats band */}
      <section className="py-14 bg-brand text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-extrabold">{s.value}</div>
              <div className="mt-1 text-white/80 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission vision values */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading center eyebrow="What Drives Us" title="Purpose, vision &" highlight="principles" />
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="card-hover bg-white rounded-2xl border border-slate-100 p-8 h-full text-center">
                  <span className="w-14 h-14 rounded-2xl bg-brand-soft text-brand flex items-center justify-center mx-auto"><v.icon className="w-7 h-7" /></span>
                  <h3 className="mt-5 text-xl font-bold text-ink">{v.title}</h3>
                  <p className="mt-2 text-ink-soft leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose reuse */}
      <section className="py-10 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading center eyebrow="The Orbit Advantage" title="Why students" highlight="choose us" />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((w, i) => {
              const Ic = iconMap[w.icon] || ShieldCheck;
              return (
                <Reveal key={w.title} delay={i * 60}>
                  <div className="card-hover group bg-white rounded-2xl border border-slate-100 p-7 h-full">
                    <span className="w-12 h-12 rounded-xl bg-brand-soft text-brand flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors"><Ic className="w-6 h-6" /></span>
                    <h3 className="mt-5 text-lg font-bold text-ink">{w.title}</h3>
                    <p className="mt-2 text-sm text-ink-soft leading-relaxed">{w.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            <span className="text-sm font-semibold text-ink-soft">Approved by:</span>
            {approvals.map((a) => <span key={a} className="text-xl font-extrabold text-brand/70">{a}</span>)}
          </div>
        </div>
      </section>
    </div>
  );
}
