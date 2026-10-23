import React from "react";
import { Link } from "react-router-dom";
import { PageHero, Reveal } from "../components/Shared";
import { IMG } from "../mock";
import { useApply } from "../context/ApplyContext";
import { Button } from "../components/ui/button";
import {
  ArrowRight,
  GraduationCap,
} from "lucide-react";

const paras = [
  "It is my pleasure to welcome you to an academic community where learning is supported by technology, guided by strong academic values and centred on the needs of every student.",

  "At Orbit Digital University, the Office of the Registrar plays an important role in ensuring that each learner’s academic journey is organised, transparent and well supported. From admission and enrolment to examinations, academic records and certification, we are committed to maintaining fairness, accuracy and efficiency at every stage.",

  "Our aim is to make university processes simple and accessible so that students can concentrate on what matters most—their education, personal growth and professional development. We continue to strengthen our digital systems and student-support services to provide timely information, clear guidance and a smooth learning experience.",

  "We also believe that discipline, responsibility and active participation are essential parts of university life. I encourage every student to make full use of the academic resources available, remain engaged with faculty members and approach learning with curiosity and determination.",

  "As you begin your journey with Orbit Digital University, I assure you of our continued support. May your time with us be filled with meaningful learning, valuable experiences and achievements that prepare you for a successful future.",
];

export default function RegistrarMessage() {
  const { openApply } = useApply();

  return (
    <div>
      {/* Page Hero */}
      <PageHero
        crumb="Registrar's Message"
        title="A Message from the Registrar"
        sub="Supporting every learner through transparent, accessible and efficient academic services."
        image={IMG.grad1}
      />

      {/* Main Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
          
          {/* Portrait Card */}
          <Reveal className="lg:sticky lg:top-28">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src=""
                alt="Registrar"
                className="w-full h-[490px] object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-brand/90 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 p-6 text-white">
                <div className="text-xl font-extrabold">
                  [Registrar&apos;s Name]
                </div>

                <div className="text-sm text-white/80">
                  Registrar, Orbit Digital University
                </div>
              </div>
            </div>
          </Reveal>

          {/* Message */}
          <Reveal delay={100}>
            <span className="eyebrow">
              Registrar&apos;s Desk
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-ink leading-tight">
              Supporting every learner through{" "}
              <span className="text-orangeAccent">
                a seamless academic journey
              </span>
            </h2>

            <div className="mt-6 space-y-4 text-ink-soft text-[17px] leading-relaxed">
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
                  [Registrar&apos;s Name]
                </div>

                <div className="text-sm text-ink-soft">
                  Registrar, Orbit Digital University
                </div>
              </div>
            </div>

            {/* Buttons */}
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

      {/* Quote Band */}
      <section className="py-14 bg-brand text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <GraduationCap className="w-10 h-10 text-orangeAccent mx-auto" />

          <p className="mt-4 text-2xl sm:text-3xl font-extrabold leading-snug">
            &quot;Our commitment is to make every academic process
            simple, transparent and supportive, so that students can
            focus on learning and building their future.&quot;
          </p>
        </div>
      </section>
    </div>
  );
}