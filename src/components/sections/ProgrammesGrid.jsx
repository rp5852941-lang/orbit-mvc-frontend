import React from "react";
import { Link } from "react-router-dom";
import { SectionHeading } from "../Shared";
import CoursesExplorer from "./CoursesExplorer";
import { Button } from "../ui/button";
import { GraduationCap, ArrowRight } from "lucide-react";

export default function ProgrammesGrid() {
  return (
    <section className="relative py-10 bg-slate-50 overflow-hidden">
      <div className="absolute inset-0 opacity-50 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(23,53,107,0.12) 1px, transparent 0)", backgroundSize: "26px 26px" }} />
      <div className="absolute -right-24 top-20 w-80 h-80 rounded-full bg-orangeAccent/10 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeading
          center
          eyebrow="Academic Programmes"
          title="Programmes for"
          highlight="the Digital Age"
          sub="Future-focused degrees designed for ambitious careers in business, technology, data and the digital economy."
        />
        <div className="flex justify-center mt-4 mb-9">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand bg-white border border-brand/15 rounded-full px-4 py-1.5 shadow-sm">
            <GraduationCap className="w-4 h-4 text-orangeAccent" /> Choose by faculty, course & specialization
          </span>
        </div>

        <CoursesExplorer limit={4}/>

        <div className="text-center mt-12">
          <Link to="/programmes"><Button variant="outline" className="btn-outline rounded-full h-12 px-8 font-semibold">View All Programmes <ArrowRight className="w-4 h-4 ml-1" /></Button></Link>
        </div>
      </div>
    </section>
  );
}
