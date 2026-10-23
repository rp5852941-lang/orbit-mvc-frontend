import React from "react";
import { Loader2 } from "lucide-react";

export const OrbitLogo = ({ className = "", dark = false }) => (
  <div className={`flex items-center ${className}`} data-testid="orbit-logo">
    <img src={`${process.env.PUBLIC_URL}/orbit-logo.png`} alt="Orbit Digital University" className={`h-11 w-auto object-contain ${dark ? "rounded-lg bg-white px-2 py-1" : ""}`} />
  </div>
);

export const Loader = ({ label = "Loading" }) => (
  <div className="flex h-64 w-full flex-col items-center justify-center gap-3 text-mutedink" data-testid="loader">
    <Loader2 className="h-7 w-7 animate-spin text-orange" />
    <span className="text-sm">{label}…</span>
  </div>
);

export const PageHeader = ({ title, subtitle, children, testid }) => (
  <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between" data-testid={testid}>
    <div>
      <h1 className="font-head text-2xl font-bold tracking-tight text-dark-navy sm:text-3xl">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-mutedink">{subtitle}</p>}
    </div>
    {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
  </div>
);

export const StatusPill = ({ status }) => {
  const map = {
    "Verified": "bg-success/10 text-success", "Paid": "bg-success/10 text-success",
    "Completed": "bg-success/10 text-success", "Active": "bg-success/10 text-success",
    "Excellent": "bg-success/10 text-success", "Pass": "bg-success/10 text-success",
    "Approved": "bg-success/10 text-success", "Admission Confirmed": "bg-success/10 text-success",
    "Pending": "bg-warning/10 text-warning", "Fee Pending": "bg-warning/10 text-warning",
    "Under Review": "bg-bright-blue/10 text-bright-blue", "Submitted": "bg-bright-blue/10 text-bright-blue",
    "Documents Pending": "bg-warning/10 text-warning", "Good": "bg-bright-blue/10 text-bright-blue",
    "In Progress": "bg-bright-blue/10 text-bright-blue", "Draft": "bg-slate-100 text-slate-500",
    "Not Started": "bg-slate-100 text-slate-500", "Locked": "bg-slate-100 text-slate-500",
    "Rejected": "bg-danger/10 text-danger", "Low": "bg-danger/10 text-danger",
    "Admission Offered": "bg-orange/10 text-orange", "Upcoming": "bg-orange/10 text-orange",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${map[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
};

export const StatCard = ({ icon: Icon, label, value, sub, accent = "navy", onClick, testid }) => {
  const accents = {
    navy: "text-navy bg-navy/10", orange: "text-orange bg-orange/10",
    blue: "text-bright-blue bg-bright-blue/10", success: "text-success bg-success/10",
    warning: "text-warning bg-warning/10", danger: "text-danger bg-danger/10",
  };
  return (
    <button
      onClick={onClick}
      data-testid={testid}
      className="group flex w-full items-center gap-4 rounded-xl border border-navy/10 bg-white p-5 text-left shadow-card transition-transform hover:-translate-y-1 hover:shadow-lift"
    >
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${accents[accent]}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="min-w-0">
        <div className="font-head text-2xl font-bold text-dark-navy">{value}</div>
        <div className="truncate text-sm text-mutedink">{label}</div>
        {sub && <div className="text-xs text-orange">{sub}</div>}
      </div>
    </button>
  );
};

export const ProgressBar = ({ value, className = "" }) => (
  <div className={`h-2 w-full overflow-hidden rounded-full bg-navy/10 ${className}`}>
    <div className="h-full rounded-full bg-gradient-to-r from-orbit-blue to-orange transition-all duration-700" style={{ width: `${value}%` }} />
  </div>
);

export const Ring = ({ value, size = 120, label }) => {
  const r = (size - 14) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth="10" className="fill-none stroke-navy/10" />
        <circle cx={size / 2} cy={size / 2} r={r} strokeWidth="10" strokeLinecap="round"
          className="fill-none stroke-orange transition-all duration-1000" strokeDasharray={c} strokeDashoffset={off} />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-head text-2xl font-bold text-dark-navy">{value}%</span>
        {label && <span className="text-[11px] text-mutedink">{label}</span>}
      </div>
    </div>
  );
};

export const EmptyState = ({ icon: Icon, title, sub }) => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-navy/15 bg-white/60 py-16 text-center">
    {Icon && <Icon className="h-10 w-10 text-mutedink/50" />}
    <div className="font-head text-lg font-semibold text-dark-navy">{title}</div>
    {sub && <p className="max-w-sm text-sm text-mutedink">{sub}</p>}
  </div>
);

export const SectionTitle = ({ eyebrow, title, sub, center }) => (
  <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
    {eyebrow && <div className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-orange">{eyebrow}</div>}
    <h2 className="font-head text-2xl font-bold tracking-tight text-dark-navy sm:text-3xl lg:text-4xl">{title}</h2>
    {sub && <p className="mt-3 text-base text-mutedink">{sub}</p>}
  </div>
);
