import React, { useEffect } from "react";
import { PageHero } from "../components/Shared";
import CoursesExplorer from "../components/sections/CoursesExplorer";
import { IMG, faculties } from "../mock";
import { GraduationCap } from "lucide-react";

export default function Programmes() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div>
      <PageHero crumb="Academic Programmes" title="Programmes for the Digital Age" sub="Future-focused degrees designed for ambitious careers in business, technology, data and the digital economy." image={IMG.lecture} />

      <section className="relative py-16 bg-slate-50 overflow-hidden">
        <div className="absolute inset-0 opacity-50 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(23,53,107,0.12) 1px, transparent 0)", backgroundSize: "26px 26px" }} />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand bg-white border border-brand/15 rounded-full px-4 py-1.5 shadow-sm">
              <GraduationCap className="w-4 h-4 text-orangeAccent" /> {faculties.length} Faculties · UGC-entitled online & ODL degrees
            </span>
          </div>
          <CoursesExplorer />
        </div>
      </section>
    </div>
  );
}
