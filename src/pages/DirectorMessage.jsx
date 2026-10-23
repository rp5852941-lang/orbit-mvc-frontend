import React from "react";
import { Link } from "react-router-dom";
import { PageHero, Reveal } from "../components/Shared";
import { IMG } from "../mock";
import { useApply } from "../context/ApplyContext";
import { Button } from "../components/ui/button";
import {
  Quote,
  ArrowRight,
  GraduationCap,
  Target,
  Globe2,
  Sparkles,
} from "lucide-react";

const paras = [
  "Welcome to Orbit Digital University. Education today is evolving rapidly, and our responsibility is to prepare learners with the knowledge, skills and confidence required to succeed in a digitally connected world.",

  "At Orbit Digital University, we are committed to delivering accessible, flexible and industry-relevant education. Our programmes combine academic excellence with practical learning so that every student can confidently meet the changing demands of modern careers.",

  "As Director, my focus is to create a supportive academic environment where innovation, curiosity and continuous learning are encouraged. I invite you to become part of Orbit Digital University and begin a transformative journey towards a successful future.",
];

const pillars = [
  {
    icon: Target,
    title: "Excellence",
    desc: "Rigorous, industry-aligned academics.",
  },
  {
    icon: Globe2,
    title: "Access",
    desc: "Learning without borders or barriers.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    desc: "Technology-first, future-ready pedagogy.",
  },
];

export default function DirectorMessage() {
  const { openApply } = useApply();

  return (
    <div>
      <PageHero
        crumb="Director's Message"
        title="A Message from the Director"
        sub="Leading Orbit Digital University with a commitment to academic excellence, innovation and student success."
        image={IMG.grad1}
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
          {/* Director portrait card */}
          <Reveal className="lg:sticky lg:top-28">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src=""
                alt="Director of Orbit Digital University"
                className="w-full h-[440px] object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-brand/90 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 p-6 text-white">
                <div className="text-xl font-extrabold">
                  Dr. Director Name
                </div>

                <div className="text-sm text-white/80">
                  Director, Orbit Digital University
                </div>
              </div>
            </div>

            {/* Academic pillars */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;

                return (
                  <div
                    key={pillar.title}
                    className="rounded-2xl bg-brand-soft p-3 text-center"
                    title={pillar.desc}
                  >
                    <span className="w-9 h-9 rounded-lg bg-brand text-white flex items-center justify-center mx-auto">
                      <Icon className="w-4 h-4" />
                    </span>

                    <div className="mt-2 text-xs font-bold text-ink">
                      {pillar.title}
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          {/* Director message */}
          <Reveal delay={100}>
            <span className="eyebrow">Director's Desk</span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-ink leading-tight">
              Inspiring students to{" "}
              <span className="text-orangeAccent">
                achieve their potential
              </span>
            </h2>

            <Quote className="w-10 h-10 text-brand/15 mt-6" />

            <div className="mt-2 space-y-4 text-ink-soft text-[17px] leading-relaxed">
              {paras.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Signature */}
            <div className="mt-8 flex items-center gap-4 border-t border-slate-100 pt-6">
              <div>
                <div
                  className="text-2xl font-extrabold text-brand"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', cursive",
                  }}
                >
                  Director Name
                </div>

                <div className="text-sm text-ink-soft">
                  Director, Orbit Digital University
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                onClick={openApply}
                className="btn-orange rounded-full h-12 px-7 font-semibold"
              >
                Join Orbit
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>

              <Link to="/about">
                <Button
                  variant="outline"
                  className="btn-outline rounded-full h-12 px-7 font-semibold"
                >
                  About the University
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Quote band */}
      <section className="py-14 bg-brand text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <GraduationCap className="w-10 h-10 text-orangeAccent mx-auto" />

          <p className="mt-4 text-2xl sm:text-3xl font-extrabold leading-snug">
            “Education empowers individuals to discover their potential,
            embrace innovation and build a successful future.”
          </p>
        </div>
      </section>
    </div>
  );
}