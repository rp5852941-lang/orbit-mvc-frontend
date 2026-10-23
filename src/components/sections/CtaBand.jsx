import React from "react";
import { Link } from "react-router-dom";
import { useApply } from "../../context/ApplyContext";
import { Button } from "../ui/button";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";

export default function CtaBand() {
  const { openApply } = useApply();
  return (
    <section className="py-10" data-testid="cta-band">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-brand px-8 py-14 sm:px-16 sm:py-15">
          {/* Subtle digital pattern */}
          <div className="absolute inset-0 opacity-[0.10]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "46px 46px" }} />
          {/* Slim accent shapes */}
          <div className="absolute -right-10 top-0 h-full w-1.5 bg-orangeAccent/70 rotate-12" />
          <div className="absolute right-16 -top-6 h-40 w-1 bg-white/20 rotate-12" />
          <div className="absolute -left-24 -bottom-24 w-72 h-72 rounded-full bg-orangeAccent/15 blur-3xl" />

          <div className="relative z-10 grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-8 items-end">
            {/* Asymmetric text block */}
            <div className="text-white">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-orangeAccent">
                <Sparkles className="w-3.5 h-3.5" /> Admissions Open for the 2026–27 Session
              </span>
              <h2 className="mt-4 text-4xl sm:text-5xl lg:text-[2.5rem] font-black leading-[1.02] tracking-tight">
                Build Your Next Chapter<br className="hidden sm:block" /> With <span className="text-orangeAccent">Digital Education</span>
              </h2>
              <p className="mt-5 max-w-xl text-white/70 text-[15px] leading-relaxed">
                Learn on your terms with UGC-aligned online &amp; ODL degrees, a smart LMS and dedicated placement support — designed for ambitious learners and working professionals.
              </p>
            </div>

            {/* Action stack */}
            <div className="flex flex-col gap-3 lg:items-end">
              <Link to="/programmes" className="w-full lg:w-auto">
                <Button className="btn-orange rounded-full w-full lg:w-auto px-8 py-6 text-base font-semibold" data-testid="cta-explore-btn">
                  Explore Programmes <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Button onClick={() => openApply()} variant="outline" className="rounded-full w-full lg:w-auto px-11 py-6 text-base font-semibold bg-transparent border-white/40 text-white hover:bg-white hover:text-brand" data-testid="cta-apply-btn">
                Start Application <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
