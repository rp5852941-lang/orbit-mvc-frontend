import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export const inputCls = "w-full rounded-md border border-navy/15 bg-white px-3 py-2 text-sm outline-none focus:border-orange disabled:bg-slate-50";
export const btnCls = "inline-flex items-center justify-center gap-1.5 rounded-md px-3.5 py-2 text-sm font-semibold transition disabled:opacity-50";
export const Btn = ({ kind = "navy", className = "", ...p }) => {
  const k = { navy: "bg-navy text-white hover:bg-dark-navy", orange: "bg-orange text-white hover:opacity-90", ghost: "border border-navy/15 text-ink hover:bg-navy/5", danger: "bg-danger text-white hover:opacity-90" }[kind];
  return <button type="button" className={`${btnCls} ${k} ${className}`} {...p} />;
};

export function Modal({ title, onClose, children, wide = false }) {
  useEffect(() => {
    const f = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", f);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // peeche ka page scroll na ho
    return () => {
      window.removeEventListener("keydown", f);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/45 p-4">
      <div className={`my-6 w-full ${wide ? "max-w-3xl" : "max-w-xl"} rounded-xl bg-white shadow-lift`}>
        <div className="flex items-center justify-between border-b border-navy/10 px-5 py-3">
          <h3 className="font-head text-base font-bold text-dark-navy">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="rounded p-1 hover:bg-navy/5"><X className="h-5 w-5" /></button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>,
    document.body
  );
}

export const Card = ({ title, children, right, className = "" }) => (
  <div className={`rounded-xl border border-navy/10 bg-white p-4 shadow-card ${className}`}>
    {(title || right) && <div className="mb-3 flex items-center justify-between gap-2"><div className="font-head text-sm font-bold text-dark-navy">{title}</div>{right}</div>}
    {children}
  </div>
);

export const Empty = ({ text = "Nothing here yet." }) => <div className="rounded-lg border border-dashed border-navy/15 p-8 text-center text-sm text-mutedink">{text}</div>;

export function Table({ columns, rows, empty }) {
  if (!rows?.length) return <Empty text={empty} />;
  return (
    <div className="overflow-x-auto rounded-lg border border-navy/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-canvas text-[11px] uppercase tracking-wide text-mutedink"><tr>{columns.map((c) => <th key={c.key || c.label} className="whitespace-nowrap px-3 py-2 font-semibold">{c.label}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => (
          <tr key={r.id ?? i} className="border-t border-navy/5 hover:bg-canvas/60">
            {columns.map((c) => <td key={c.key || c.label} className="px-3 py-2 align-middle">{c.render ? c.render(r) : (r[c.key] ?? "—")}</td>)}
          </tr>))}</tbody>
      </table>
    </div>
  );
}

export const Pill = ({ text, tone }) => {
  const t = tone || ({ active: "g", published: "g", success: "g", approved: "g", issued: "g", present: "g", graded: "g", resolved: "g", completed: "g", good: "g", pass: "g",
    inactive: "r", suspended: "r", rejected: "r", failed: "r", absent: "r", revoked: "r", short: "r", fail: "r", closed: "r", cancelled: "r", late: "o", draft: "x", archived: "x",
    pending: "o", submitted: "b", scheduled: "b", live: "o", open: "o", in_progress: "b", on_hold: "o" }[String(text).toLowerCase()] || "x");
  const cls = { g: "bg-success/10 text-success", r: "bg-danger/10 text-danger", o: "bg-orange/10 text-orange", b: "bg-bright-blue/10 text-bright-blue", x: "bg-slate-100 text-slate-600" }[t];
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${cls}`}>{String(text).replace(/_/g, " ")}</span>;
};

export const resolveImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("data:") || url.startsWith("blob:")) return url;
  if (url.startsWith("/")) return url;
  return `/${url}`;
};

export const Avatar = ({ src, name, size = "h-9 w-9" }) => {
  const resolved = resolveImageUrl(src);
  return resolved
    ? <img src={resolved} alt="" className={`${size} rounded-full object-cover`} />
    : <div className={`${size} flex items-center justify-center rounded-full bg-navy text-xs font-bold text-white`}>{(name || "?").slice(0, 1).toUpperCase()}</div>;
};

// The same toggle everywhere: ON / OFF with a label
export const Toggle = ({ on, onChange, disabled, labelOn = "ON", labelOff = "OFF" }) => (
  <button type="button" disabled={disabled} onClick={() => onChange(!on)} className="inline-flex items-center gap-2 disabled:opacity-50">
    <span className={`relative h-6 w-11 rounded-full transition ${on ? "bg-success" : "bg-slate-300"}`}><span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`} /></span>
    <span className="text-xs font-semibold text-ink">{on ? labelOn : labelOff}</span>
  </button>
);

export const confirmBox = (msg) => window.confirm(msg);
