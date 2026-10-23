import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import { inputCls } from "./ui";
import { labelize, toInputDateTime } from "@/lib/lms";

// Small cache so the same drop-down is not fetched again and again
const cache = {};
export async function lookup(type, params = {}) {
  const key = type + JSON.stringify(params);
  if (!cache[key]) cache[key] = api.get("/lookup/list", { params: { type, ...params } }).then((r) => r.data).catch((e) => { delete cache[key]; throw e; });
  return cache[key];
}
export const clearLookups = () => Object.keys(cache).forEach((k) => delete cache[k]);

export const FieldWrap = ({ label, required, error, children, hint }) => (
  <label className="block text-sm">
    <span className="mb-1 block text-xs font-semibold text-ink">{label}{required && <span className="text-danger"> *</span>}</span>
    {children}
    {hint && <span className="mt-0.5 block text-[11px] text-mutedink">{hint}</span>}
    {error && <span className="mt-0.5 block text-xs text-danger">{error}</span>}
  </label>
);

export const Select = ({ value, onChange, options, placeholder = "Select…", disabled }) => (
  <select className={inputCls} value={value ?? ""} onChange={(e) => onChange(e.target.value)} disabled={disabled}>
    <option value="">{placeholder}</option>
    {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
  </select>
);

// Programme -> Semester -> Subject drop-downs that depend on each other (only the ones the form needs).
export function AcademicFields({ values, onChange, errors = {}, want = { programme: true, semester: true, subject: true }, required = {} }) {
  const [progs, setProgs] = useState([]); const [sems, setSems] = useState([]); const [subs, setSubs] = useState([]);
  useEffect(() => { lookup("programmes").then(setProgs).catch(() => {}); }, []);
  useEffect(() => { setSems([]); if (values.programme_id) lookup("semesters", { programme_id: values.programme_id }).then(setSems).catch(() => {}); }, [values.programme_id]);
  useEffect(() => { setSubs([]); if (want.subject && (values.semester_id || values.programme_id)) lookup("subjects", { programme_id: values.programme_id, semester_id: values.semester_id }).then(setSubs).catch(() => {}); }, [values.programme_id, values.semester_id, want.subject]);
  return (
    <>
      {want.programme && <FieldWrap label="Programme" required={required.programme !== false} error={errors.programme_id}>
        <Select value={values.programme_id} onChange={(v) => onChange({ programme_id: v, semester_id: "", subject_id: "" })} options={progs.map((p) => ({ value: p.id, label: `${p.code} — ${p.name}` }))} /></FieldWrap>}
      {want.semester && <FieldWrap label="Semester" required={required.semester !== false} error={errors.semester_id}>
        <Select value={values.semester_id} disabled={!values.programme_id} onChange={(v) => onChange({ semester_id: v, subject_id: "" })} options={sems.map((s) => ({ value: s.id, label: s.name }))} placeholder={values.programme_id ? "Select semester…" : "Choose a programme first"} /></FieldWrap>}
      {want.subject && <FieldWrap label="Subject" required={required.subject !== false} error={errors.subject_id}>
        <Select value={values.subject_id} disabled={!values.semester_id && !values.programme_id} onChange={(v) => onChange({ subject_id: v })} options={subs.map((s) => ({ value: s.id, label: s.name }))} placeholder="Select subject…" /></FieldWrap>}
    </>
  );
}

// Renders one field from the definition the API sent (/api/<entity>/meta)
export function FieldInput({ field, value, onChange, error }) {
  const { type, label, required, options } = field;
  let input;
  if (type === "enum") input = <Select value={value} onChange={onChange} options={options.map((o) => ({ value: o, label: labelize(o) }))} />;
  else if (type === "text") input = <textarea rows={3} className={inputCls} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
  else if (type === "bool") input = <input type="checkbox" checked={!!Number(value)} onChange={(e) => onChange(e.target.checked ? 1 : 0)} />;
  else if (type === "date") input = <input type="date" className={inputCls} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
  else if (type === "time") input = <input type="time" className={inputCls} value={String(value ?? "").slice(0, 5)} onChange={(e) => onChange(e.target.value)} />;
  else if (type === "datetime") input = <input type="datetime-local" className={inputCls} value={toInputDateTime(value)} onChange={(e) => onChange(e.target.value)} />;
  else if (type === "int" || type === "decimal") input = <input type="number" step={type === "int" ? 1 : "0.01"} min={field.min} className={inputCls} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />;
  else if (field.ref === "departments") input = <RefSelect type="departments" value={value} onChange={onChange} />;
  else if (field.ref === "academic_sessions") input = <RefSelect type="sessions" value={value} onChange={onChange} />;
  else if (field.ref === "users") input = <StudentSelect value={value} onChange={onChange} />;
  else input = <input className={inputCls} value={value ?? ""} maxLength={field.max} onChange={(e) => onChange(e.target.value)} />;
  return <FieldWrap label={label} required={required} error={error}>{input}</FieldWrap>;
}

export function RefSelect({ type, value, onChange }) {
  const [rows, setRows] = useState([]);
  useEffect(() => { lookup(type).then(setRows).catch(() => {}); }, [type]);
  return <Select value={value} onChange={onChange} options={rows.map((r) => ({ value: r.id, label: r.name || r.code }))} />;
}

export function StudentSelect({ value, onChange }) {
  const [q, setQ] = useState(""); const [rows, setRows] = useState([]);
  useEffect(() => { const t = setTimeout(() => api.get("/lookup/list", { params: { type: "students", q } }).then((r) => setRows(r.data)).catch(() => {}), 250); return () => clearTimeout(t); }, [q]);
  return (
    <div className="space-y-1">
      <input className={inputCls} placeholder="Type a name or enrollment number…" value={q} onChange={(e) => setQ(e.target.value)} />
      <Select value={value} onChange={onChange} options={rows.map((r) => ({ value: r.id, label: `${r.name} (${r.enrollment_number || "—"})` }))} placeholder="Select student…" />
    </div>
  );
}
