import React, { useEffect, useMemo, useState } from "react";
import { Camera } from "lucide-react";
import { toast } from "sonner";
import api, { formatApiError } from "@/lib/api";
import { Btn, inputCls, resolveImageUrl } from "./ui";
import { FieldWrap, Select, lookup } from "./FormFields";
import { labelize } from "@/lib/lms";

// ONE form for student / faculty / admin (Apply Now, admin "Add", admin "Edit").
// Every field is required - nothing may stay blank. State -> City drop-downs are loaded from the database.
const RULES = {
  email: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address."],
  phone: [/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number."],
  guardian_phone: [/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number."],
  pincode: [/^[1-9]\d{5}$/, "Enter a valid 6-digit pincode."],
};
const GROUPS = {
  student: ["dob", "gender", "blood_group", "address", "state", "city", "pincode", "guardian_name", "guardian_phone"],
  faculty: ["department_id", "designation", "qualification", "experience_years", "employment_type", "joining_date", "bio"],
  admin: [],
};
const LABELS = { name: "Full name", email: "Email", phone: "Mobile number", password: "Password", dob: "Date of birth", gender: "Gender", blood_group: "Blood group", address: "Address", state: "State", city: "City",
  pincode: "Pincode", guardian_name: "Guardian name", guardian_phone: "Guardian mobile", department_id: "Department", designation: "Designation", qualification: "Qualification",
  experience_years: "Experience (years)", employment_type: "Employment type", joining_date: "Joining date", bio: "About / bio" };

export default function PersonForm({ kind, mode = "create", initial = {}, onSubmit, submitLabel, onCancel, presetProgramme, showSemester = false, hideAccount = false }) {
  const edit = mode === "edit";
  const [v, setV] = useState(() => ({ ...initial, programme_id: initial.programme_id ?? presetProgramme ?? "" }));
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [photo, setPhoto] = useState({ id: null, url: initial.photo || null, uploading: false });
  const [opts, setOpts] = useState({ programmes: [], states: [], genders: [], blood_groups: [] });
  const [cities, setCities] = useState([]); const [depts, setDepts] = useState([]); const [sems, setSems] = useState([]);
  const set = (k) => (val) => setV((s) => ({ ...s, [k]: val }));

  useEffect(() => { api.get("/applyNow/options").then((r) => setOpts(r.data)).catch((e) => toast.error(formatApiError(e))); }, []);
  useEffect(() => { if (kind === "faculty") lookup("departments").then(setDepts).catch(() => {}); }, [kind]);
  useEffect(() => {
    let active = true;
    setCities([]);
    const state = opts.states.find((s) => s.name === v.state);
    if (state) {
      api.get("/locations/cities", { params: { state_id: state.id } })
        .then((r) => { if (active) setCities(r.data); })
        .catch((e) => { if (active) toast.error(formatApiError(e)); });
    }
    return () => { active = false; };
  }, [v.state, opts.states]);
  useEffect(() => { setSems([]); if (showSemester && v.programme_id) lookup("semesters", { programme_id: v.programme_id }).then(setSems).catch(() => {}); }, [showSemester, v.programme_id]);

  const uploadPhoto = async (file) => {
    if (!file) return;
    const fd = new FormData(); fd.append("file", file);
    setPhoto((p) => ({ ...p, uploading: true }));
    try { const { data } = await api.post("/uploads/add", fd, { headers: { "Content-Type": "multipart/form-data" } }); setPhoto({ id: data.id, url: data.url, uploading: false }); setErrors((e) => ({ ...e, photo_file_id: undefined })); }
    catch (e) { setPhoto((p) => ({ ...p, uploading: false })); toast.error(formatApiError(e)); }
  };

  const required = useMemo(() => [...(hideAccount ? [] : ["name", "email", "phone", ...(edit ? [] : ["password"])]), ...GROUPS[kind], ...(kind === "student" ? ["programme_id"] : []), ...(showSemester && kind === "student" && !edit ? [] : [])], [kind, edit, showSemester, hideAccount]);
  const validate = () => {
    const e = {};
    required.forEach((k) => { if (v[k] === undefined || v[k] === null || String(v[k]).trim() === "") e[k] = `${LABELS[k] || (k === "programme_id" ? "Programme" : k)} is required.`; });
    Object.entries(RULES).forEach(([k, [re, msg]]) => { if (v[k] && !re.test(String(v[k]))) e[k] = msg; });
    if (!hideAccount && (!edit || v.password)) {
      if (v.password && (v.password.length < 8 || !/[A-Za-z]/.test(v.password) || !/\d/.test(v.password))) e.password = "At least 8 characters with a letter and a number.";
      if (mode === "apply" && v.password !== v.confirm_password) e.confirm_password = "Passwords do not match.";
    }
    if (!hideAccount && !photo.url && !photo.id) e.photo_file_id = "Photo is required.";
    return e;
  };
  const submit = async (event) => {
    event.preventDefault();
    const e = validate(); setErrors(e);
    if (Object.keys(e).length) { toast.error("Please fill every field correctly."); return; }
    const body = { ...v }; if (photo.id) body.photo_file_id = photo.id; if (edit && !body.password) delete body.password;
    setBusy(true);
    try { await onSubmit(body); } catch (err) { const d = err.response?.data?.data; if (d && typeof d === "object") setErrors(d); toast.error(formatApiError(err)); } finally { setBusy(false); }
  };

  const T = (k, props = {}) => <FieldWrap label={LABELS[k]} required error={errors[k]} {...props.wrap}><input className={inputCls} value={v[k] ?? ""} onChange={(e) => set(k)(e.target.value)} {...props.input} /></FieldWrap>;
  const S = (k, options, label) => <FieldWrap label={label || LABELS[k]} required error={errors[k]}><Select value={v[k]} onChange={set(k)} options={options} /></FieldWrap>;

  return (
    <form onSubmit={submit}>
      {!hideAccount && <div className="mb-4 flex items-center gap-4">
        <label className="group relative h-24 w-24 shrink-0 cursor-pointer overflow-hidden rounded-full border-2 border-dashed border-navy/25 bg-canvas">
          {photo.url ? <img src={resolveImageUrl(photo.url)} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full w-full flex-col items-center justify-center text-mutedink"><Camera className="h-6 w-6" /><span className="text-[10px]">Add photo</span></div>}
          <input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={(e) => uploadPhoto(e.target.files?.[0])} />
          {photo.uploading && <div className="absolute inset-0 flex items-center justify-center bg-white/70 text-xs">Uploading…</div>}
        </label>
        <div className="text-xs text-mutedink"><div className="font-semibold text-ink">Photo <span className="text-danger">*</span></div>JPG, PNG or WEBP, up to 5 MB. This photo is shown on the dashboard and ID card.{errors.photo_file_id && <div className="mt-1 text-danger">{errors.photo_file_id}</div>}</div>
      </div>}

      <div className="grid gap-3 sm:grid-cols-2">
        {!hideAccount && <>{T("name")}
        {T("email", { input: { type: "email", disabled: edit && kind === "admin" } })}
        {T("phone", { input: { inputMode: "numeric", maxLength: 10 } })}
        {T("password", { wrap: { label: edit ? "New password (leave blank to keep)" : "Password", required: !edit }, input: { type: "password", autoComplete: "new-password" } })}</>}
        {mode === "apply" && <FieldWrap label="Confirm password" required error={errors.confirm_password}><input type="password" className={inputCls} value={v.confirm_password ?? ""} onChange={(e) => set("confirm_password")(e.target.value)} /></FieldWrap>}

        {kind === "student" && <>
          {T("dob", { input: { type: "date" } })}
          {S("gender", opts.genders.map((g) => ({ value: g, label: labelize(g) })))}
          {S("blood_group", opts.blood_groups.map((g) => ({ value: g, label: g })))}
          <div className="sm:col-span-2">{T("address")}</div>
          <FieldWrap label="State" required error={errors.state}><Select value={v.state} onChange={(s) => setV((x) => ({ ...x, state: s, city: "" }))} options={opts.states.map((s) => ({ value: s.name, label: s.name }))} /></FieldWrap>
          <FieldWrap label="City" required error={errors.city}><Select value={v.city} disabled={!v.state} onChange={set("city")} options={cities.map((c) => ({ value: c.name, label: c.name }))} placeholder={v.state ? "Select city…" : "Choose a state first"} /></FieldWrap>
          {T("pincode", { input: { inputMode: "numeric", maxLength: 6 } })}
          {T("guardian_name")}
          {T("guardian_phone", { input: { inputMode: "numeric", maxLength: 10 } })}
          <FieldWrap label="Programme" required error={errors.programme_id}><Select value={v.programme_id} onChange={(p) => setV((x) => ({ ...x, programme_id: p, semester_id: "" }))} options={opts.programmes.map((p) => ({ value: p.id, label: `${p.code} — ${p.name}` }))} /></FieldWrap>
          {showSemester && <FieldWrap label="Semester" error={errors.semester_id} hint={edit ? "Change this to move the student to another semester." : "Leave empty to start from semester 1."}><Select value={v.semester_id} disabled={!v.programme_id} onChange={set("semester_id")} options={sems.map((s) => ({ value: s.id, label: s.name }))} placeholder="Select semester…" /></FieldWrap>}
        </>}

        {kind === "faculty" && <>
          {S("department_id", depts.map((d) => ({ value: d.id, label: d.name })))}
          {T("designation")}{T("qualification")}
          {T("experience_years", { input: { type: "number", min: 0 } })}
          {S("employment_type", ["full_time", "part_time", "visiting", "contract"].map((o) => ({ value: o, label: labelize(o) })))}
          {T("joining_date", { input: { type: "date" } })}
          <div className="sm:col-span-2"><FieldWrap label="About / bio" required error={errors.bio}><textarea rows={3} className={inputCls} value={v.bio ?? ""} onChange={(e) => set("bio")(e.target.value)} /></FieldWrap></div>
        </>}

        {!hideAccount && edit && kind !== "faculty" && v.status !== undefined && <FieldWrap label="Account status"><Select value={v.status} onChange={set("status")} options={["active", "inactive", "suspended"].map((s) => ({ value: s, label: labelize(s) }))} /></FieldWrap>}
        {!hideAccount && edit && kind === "faculty" && <FieldWrap label="Account status"><Select value={v.status} onChange={set("status")} options={["active", "inactive", "suspended"].map((s) => ({ value: s, label: labelize(s) }))} /></FieldWrap>}
      </div>
      <div className="mt-5 flex justify-end gap-2">{onCancel && <Btn kind="ghost" onClick={onCancel}>Cancel</Btn>}<Btn type="submit" kind="orange" disabled={busy || photo.uploading}>{busy ? "Please wait…" : submitLabel || "Save"}</Btn></div>
    </form>
  );
}
