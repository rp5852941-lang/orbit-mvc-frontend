import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { PageHero, Reveal, SectionHeading } from "../components/Shared";
import { pageContent } from "../pageContent";
import { useApply } from "../context/ApplyContext";
import { Button } from "../components/ui/button";
import {
  Eye, Target, HeartHandshake, Award, ShieldCheck, MonitorPlay, Users, Briefcase,
  Sparkles, LineChart, Video, GraduationCap, BookOpen, Clock, Library, Smartphone,
  Cloud, Wallet, CalendarClock, Handshake, Trophy, LifeBuoy, Laptop, Building2,
  MessagesSquare, CheckCircle2, ArrowRight,
} from "lucide-react";

const icons = {
  Eye, Target, HeartHandshake, Award, ShieldCheck, MonitorPlay, Users, Briefcase,
  Sparkles, LineChart, Video, GraduationCap, BookOpen, Clock, Library, Smartphone,
  Cloud, Wallet, CalendarClock, Handshake, Trophy, LifeBuoy, Laptop, Building2, MessagesSquare,
};

export default function InfoPage() {
  const { slug } = useParams();
  const { openApply } = useApply();
  const data = pageContent[slug];

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl font-extrabold text-ink">Page not found</h1>
        <p className="mt-2 text-ink-soft">The page you are looking for doesn't exist.</p>
        <Link to="/" className="mt-5"><Button className="btn-primary rounded-full px-8 h-11">Back to Home</Button></Link>
      </div>
    );
  }

  return (
    <div>
      <PageHero crumb={data.crumb} title={data.title} sub={data.sub} image={data.image} />

      {/* Intro + image */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <SectionHeading eyebrow={data.crumb} title={data.title} />
            <p className="mt-4 text-ink-soft text-[17px] leading-relaxed">{data.intro}</p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              {data.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-ink font-medium"><CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" /> {p}</li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => openApply()} className="btn-orange rounded-full h-12 px-7 font-semibold">Apply Now <ArrowRight className="w-4 h-4 ml-1" /></Button>
              <Link to="/contact"><Button variant="outline" className="btn-outline rounded-full h-12 px-7 font-semibold">Talk to Us</Button></Link>
            </div>
          </Reveal>
          <Reveal delay={120} className="relative">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
              <img src={`${data.image}?auto=format&fit=crop&w=1000&q=80`} alt={data.title} className="w-full h-[420px] object-cover" />
            </div>
            <div className="absolute -top-4 -left-3 hidden sm:block bg-brand text-white rounded-2xl shadow-xl p-4 w-40">
              <GraduationCap className="w-6 h-6 text-orangeAccent mb-1" />
              <div className="text-sm font-semibold leading-tight">Orbit Digital University</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading center eyebrow="Highlights" title="What you" highlight="get" />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.features.map((f, i) => {
              const Ic = icons[f.i] || Sparkles;
              return (
                <Reveal key={f.t} delay={i * 60}>
                  <div className="card-hover group bg-white rounded-2xl border border-slate-100 p-7 h-full">
                    <span className="w-12 h-12 rounded-xl bg-brand-soft text-brand flex items-center justify-center group-hover:bg-brand group-hover:text-white transition-colors"><Ic className="w-6 h-6" /></span>
                    <h3 className="mt-5 text-lg font-bold text-ink">{f.t}</h3>
                    <p className="mt-2 text-sm text-ink-soft leading-relaxed">{f.d}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-[2rem] bg-brand overflow-hidden px-8 py-12 sm:px-14 text-center">
            <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-orangeAccent/20 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Ready to begin your journey with Orbit?</h2>
              <p className="mt-3 text-white/80 max-w-xl mx-auto">Admissions for 2025-26 are open. Talk to a counsellor today.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button onClick={() => openApply()} className="btn-orange rounded-full h-12 px-8 font-semibold">Apply Now <ArrowRight className="w-4 h-4 ml-1" /></Button>
                <Link to="/programmes"><Button variant="outline" className="rounded-full h-12 px-8 font-semibold bg-transparent border-white/40 text-white hover:bg-white hover:text-brand">Explore Programmes</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
