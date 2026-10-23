import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { faculties, courses } from "../../mock";
import { Reveal } from "../Shared";
import {
  Briefcase, TrendingUp, BarChart3, Landmark, Code2, Terminal, Cpu, MonitorPlay,
  BookOpen, GraduationCap, LineChart, Bot, Database, BrainCircuit, Cog, Wrench,
  ArrowRight, Clock,
} from "lucide-react";

const iconMap = {
  Briefcase, TrendingUp, BarChart3, Landmark, Code2, Terminal, Cpu, MonitorPlay,
  BookOpen, GraduationCap, LineChart, Bot, Database, BrainCircuit, Cog, Wrench,
};

const CHIP_LIMIT = 3;

function CourseCard({ c, delay }) {
  const Ic = iconMap[c.icon] || BookOpen;
  const fac = faculties.find((f) => f.id === c.faculty);
  const color = fac ? fac.color : "#2563eb";
  const shown = c.specializations.slice(0, CHIP_LIMIT);
  const extra = c.specializations.length - CHIP_LIMIT;

  return (
    <Reveal delay={delay}>
      <Link
        to={`/course/${c.slug}`}
        data-testid={`course-card-${c.slug}`}
        className="course-card group block h-full bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_10px_rgba(15,23,42,0.05)] hover:shadow-[0_10px_28px_rgba(15,23,42,0.10)] hover:-translate-y-1 transition-all duration-300 p-5"
      >
        <div className="flex items-center justify-between gap-2">
          <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors" style={{ background: `${color}14`, color }}>
            <Ic className="w-5 h-5" />
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: `${color}14`, color }}>{c.level}</span>
        </div>

        <h3 className="mt-3 text-lg font-extrabold text-ink tracking-tight leading-none">{c.abbr}</h3>
        <p className="mt-1 text-[13px] text-ink-soft font-medium leading-snug line-clamp-2 min-h-[34px]">{c.name}</p>
        <div className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-ink-soft">
          <Clock className="w-3 h-3" style={{ color }} /> {c.duration}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {shown.map((s) => (
            <span key={s} className="text-[10.5px] font-medium text-ink-soft bg-slate-50 border border-slate-200 rounded-full px-2 py-0.5">{s}</span>
          ))}
          {extra > 0 && (
            <span className="text-[10.5px] font-bold rounded-full px-2 py-0.5" style={{ color, background: `${color}12` }}>+{extra}</span>
          )}
        </div>

        <span className="mt-4 inline-flex items-center gap-1 text-[13px] font-bold text-brand group-hover:gap-2 transition-all" style={{ color }}>
          View Programme <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </Link>
    </Reveal>
  );
}

export default function CoursesExplorer() {
  const [active, setActive] = useState("all");

  const tabs = useMemo(
    () => [{ id: "all", short: "All Programmes" }, ...faculties],
    []
  );

  const list = useMemo(
    () =>
      active === "all"
        ? courses
        : courses.filter((c) => c.faculty === active),
    [active]
  );

  // Desktop पर 4 columns × 4 rows = अधिकतम 16 courses
  const visibleCourses = list.slice(0, 16);

  return (
    <div>
      {/* Programme Tabs */}
      <div
        className="flex flex-wrap justify-center gap-2.5"
        data-testid="faculty-tabs"
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            data-testid={`faculty-tab-${t.id}`}
            className={`whitespace-nowrap shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              active === t.id
                ? "bg-brand text-white shadow-md"
                : "bg-white border border-slate-200 text-ink hover:border-brand hover:text-brand"
            }`}
          >
            {t.short}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {visibleCourses.map((c, i) => (
          <CourseCard
            key={c.slug}
            c={c}
            delay={i * 35}
          />
        ))}
      </div>
    </div>
  );
}
