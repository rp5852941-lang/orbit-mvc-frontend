import React from "react";
import { lmsFeatures, IMG } from "../../mock";
import { Reveal, SectionHeading } from "../Shared";
import { useApply } from "../../context/ApplyContext";
import { Button } from "../ui/button";
import learningImg from "../images/learning_img.jpeg";
import {
  Video, BookOpenText, ClipboardCheck, LineChart, MessagesSquare, Smartphone,
  ArrowRight, PlayCircle, GraduationCap,
} from "lucide-react";

const icons = { Video, BookOpenText, ClipboardCheck, LineChart, MessagesSquare, Smartphone };

export default function SmartLMS() {
  const { openApply } = useApply();
  return (
    <section className="py-10 bg-white" data-testid="smart-lms">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[45fr_55fr] gap-10 lg:gap-12 items-center">
        {/* Left: image */}
        <Reveal className="relative order-1">
          <div className="relative rounded-[1.75rem] overflow-hidden shadow-xl border border-slate-100">
   <img
  src={learningImg}
  alt="University students learning on the Smart LMS"
  className="w-full h-[420px] lg:h-[480px] object-cover"
/>
            <div className="absolute inset-0 bg-gradient-to-t from-brand/20 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-5 left-6 bg-white rounded-2xl shadow-lg border border-slate-100 px-5 py-3 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-brand text-white flex items-center justify-center"><GraduationCap className="w-5 h-5" /></span>
            <div><div className="text-sm font-bold text-ink">25,000+ Learners</div><div className="text-xs text-ink-soft">Learning on Orbit LMS</div></div>
          </div>
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/95 rounded-full shadow border border-slate-100 px-3.5 py-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-semibold text-ink">Live classes in session</span>
          </div>
        </Reveal>

        {/* Right: heading + 6 compact feature tiles */}
        <div className="order-2">
          <SectionHeading eyebrow="Digital Learning Infrastructure" title="Smart LMS for" highlight="Future-Ready Learning" sub="A modern, bright learning ecosystem for classes, resources, assessments and progress tracking — anytime, anywhere." />

          <div className="mt-7 grid sm:grid-cols-2 gap-3.5">
            {lmsFeatures.map((f, i) => {
              const Ic = icons[f.icon] || Video;
              return (
                <Reveal key={f.title} delay={i * 60}>
                  <div className="card-hover h-full bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-start gap-3">
                    <span className="w-10 h-10 rounded-lg bg-orangeAccent/10 text-orangeAccent flex items-center justify-center shrink-0"><Ic className="w-5 h-5" /></span>
                    <div>
                      <h3 className="font-bold text-ink text-[14px] leading-tight">{f.title}</h3>
                      <p className="mt-1 text-[12.5px] text-ink-soft leading-snug">{f.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button onClick={() => openApply()} className="btn-orange rounded-full h-11 px-6 font-semibold" data-testid="lms-explore-btn">Explore Our LMS <ArrowRight className="w-4 h-4 ml-1" /></Button>
            <Button variant="outline" className="rounded-full h-11 px-6 font-semibold border-brand/25 text-brand hover:bg-brand hover:text-white"><PlayCircle className="w-4 h-4 mr-1" /> Request Demo</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
