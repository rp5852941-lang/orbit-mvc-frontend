import React from "react";
import { Link } from "react-router-dom";
import { PageHero, Reveal } from "../components/Shared";
import { IMG } from "../mock";
import viceChancellorImg from "../components/images/chancellor.jpeg";
import { useApply } from "../context/ApplyContext";
import { Button } from "../components/ui/button";
import {
  ArrowRight,
  GraduationCap,
} from "lucide-react";

const paras = [
  "Education becomes meaningful when it enables students to think independently, apply their knowledge and respond confidently to the challenges of a changing world. At Orbit Digital University, we aim to create an academic environment where learning is engaging, relevant and connected to real opportunities.",

  "Our programmes bring together strong academic foundations, practical exposure and the effective use of digital technology. We continually work to ensure that our curriculum remains aligned with industry needs while also developing communication, problem-solving, leadership and professional skills among our learners.",

  "We believe that every student has different goals, responsibilities and ways of learning. Therefore, our academic approach offers the flexibility and support needed to help learners progress with confidence. Our faculty members and academic teams remain committed to guiding students throughout their educational journey and encouraging them to make the most of every learning opportunity.",

  "I warmly welcome you to Orbit Digital University. I hope your time with us will inspire curiosity, strengthen your abilities and prepare you to contribute responsibly and successfully to your profession and society.",
];

export default function ViceChancellorMessage() {
  const { openApply } = useApply();

  return (
    <div>
      <PageHero
        crumb="Vice-Chancellor's Message"
        title="A Message from the Vice-Chancellor"
        sub="Preparing learners with the knowledge, confidence and professional skills required for a changing world."
        image={IMG.grad1}
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[0.85fr_1.15fr] gap-12 items-start">
          {/* Portrait Card */}
          <Reveal className="lg:sticky lg:top-28">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={""}
                alt="Vice-Chancellor of Orbit Digital University"
                className="w-full h-[490px] object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-brand/90 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 p-6 text-white">
                <div className="text-xl font-extrabold">
                  Vice-Chancellor
                </div>

                <div className="text-sm text-white/80">
                  Orbit Digital University
                </div>
              </div>
            </div>
          </Reveal>

          {/* Message */}
          <Reveal delay={100}>
            <span className="eyebrow">
              Vice-Chancellor&apos;s Desk
            </span>

            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-ink leading-tight">
              Preparing learners for{" "}
              <span className="text-orangeAccent">
                a changing world
              </span>
            </h2>

            <div className="mt-6 space-y-5 text-ink-soft text-[17px] leading-relaxed">
              {paras.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Signature */}
            <div className="mt-8 border-t border-slate-100 pt-6">
              <p className="mb-3 text-base font-semibold italic text-ink-soft">
                With best wishes,
              </p>

              <div
                className="text-2xl font-extrabold text-brand"
                style={{
                  fontFamily: "'Plus Jakarta Sans', cursive",
                }}
              >
                Vice-Chancellor
              </div>

              <div className="mt-1 text-sm text-ink-soft">
                Orbit Digital University
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

      {/* Quote Band */}
      <section className="py-14 bg-brand text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <GraduationCap className="w-10 h-10 text-orangeAccent mx-auto" />

          <p className="mt-4 text-2xl sm:text-3xl font-extrabold leading-snug">
            &quot;Learning should inspire curiosity, strengthen
            abilities and prepare every student to contribute
            responsibly to their profession and society.&quot;
          </p>
        </div>
      </section>
    </div>
  );
}