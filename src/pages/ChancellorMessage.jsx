import React from "react";
import { Link } from "react-router-dom";
import { PageHero, Reveal } from "../components/Shared";
import { IMG } from "../mock";
import chancellorImg from "../components/images/chancellor.jpeg";
import { useApply } from "../context/ApplyContext";
import { Button } from "../components/ui/button";
import {
  ArrowRight,
  GraduationCap,
} from "lucide-react";

const paras = [
  "We are living at a defining moment in the evolution of education, where knowledge, technology and innovation are coming together to create limitless opportunities for learners across the world.",

  "At Orbit Digital University, our vision is clear — to make quality higher education accessible, flexible, innovative and future-ready. Our academic programmes are designed not merely to award qualifications, but to develop knowledgeable, skilled and confident professionals who are prepared to succeed and lead in an increasingly digital world.",

  "We are committed to creating a learner-centric academic ecosystem founded on academic excellence, innovation, practical skills, digital transformation and continuous support. We encourage every learner to explore new ideas, embrace technology and develop the capabilities required for the careers of tomorrow.",

  "As you begin your journey with Orbit Digital University, I welcome you to become an active part of our growing academic community. Together, let us learn, innovate and build a smarter, brighter and more inclusive future through the power of education.",
];

export default function ChancellorMessage() {
  const { openApply } = useApply();

  return (
    <div>
      <PageHero
        crumb="Chancellor's Message"
        title="A Message from the Chancellor"
        sub="Guiding Orbit Digital University with a vision of accessible, innovative and future-ready education."
        image={IMG.grad1}
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
          
          {/* Portrait card */}
          <Reveal className="lg:sticky lg:top-28">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={chancellorImg}
                alt="Dr. Sandeep Sharma, Chancellor"
                className="w-full h-[490px] object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-brand/90 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 p-6 text-white">
                <div className="text-xl font-extrabold">
                  Dr. Sandeep Sharma
                </div>

                <div className="text-sm text-white/80">
                  Chancellor, Orbit Digital University
                </div>
              </div>
            </div>
          </Reveal>

          {/* Message */}
          <Reveal delay={100}>
            <span className="eyebrow">
              Chancellor&apos;s Desk
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-ink leading-tight">
              Empowering learners to{" "}
              <span className="text-orangeAccent">
                shape the future
              </span>
            </h2>

            <div className="mt-6 space-y-4 text-ink-soft text-[17px] leading-relaxed">
              {paras.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4 border-t border-slate-100 pt-6">
              <div>
                <div
                  className="text-2xl font-extrabold text-brand"
                  style={{
                    fontFamily: "'Plus Jakarta Sans', cursive",
                  }}
                >
                  Dr. Sandeep Sharma
                </div>

                <div className="text-sm text-ink-soft">
                  Chancellor, Orbit Digital University
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                onClick={() => openApply()}
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
            &quot;Education is the most powerful tool to transform
            lives — and digital education makes that power
            limitless.&quot;
          </p>
        </div>
      </section>
    </div>
  );
}