import React, { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import api, { formatApiError } from "@/lib/api";
import { Loader, PageHeader } from "@/components/common/Bits";
import { Btn, Modal, Pill, Table, Avatar, Empty, inputCls } from "@/components/lms/ui";
import { FieldWrap } from "@/components/lms/FormFields";
import { fmtDateTime } from "@/lib/lms";

export function FacultyStudents() {
  const [d, setD] = useState(null);
  useEffect(() => { api.get("/facultyPortal/students").then((r) => setD(r.data)).catch((e) => { toast.error(formatApiError(e)); setD({ items: [] }); }); }, []);
  if (!d) return <Loader />;
  return (
    <div><PageHeader title="My Students" subtitle="Students of the programmes and semesters you teach." />
      <Table columns={[{ label: "Student", render: (r) => <div className="flex items-center gap-3"><Avatar src={r.photo} name={r.name} /><div><div className="font-medium">{r.name}</div><div className="text-[11px] text-mutedink">{r.enrollment_number}</div></div></div> },
        { key: "email", label: "Email" }, { key: "phone", label: "Mobile" }, { label: "Programme", render: (r) => `${r.programme_code} · Sem ${r.semester_no}` }]} rows={d.items} empty="No students yet. Ask the admin to assign subjects to you." />
    </div>
  );
}

export function FacultySubmissions({ admin = false }) {
  const [d, setD] = useState(null); const [g, setG] = useState(null);
  const load = useCallback(() => api.get("/submissions/list").then((r) => setD(r.data)).catch((e) => { toast.error(formatApiError(e)); setD({ items: [] }); }), []);
  useEffect(() => { load(); }, [load]);
  if (!d) return <Loader />;
  return (
    <div><PageHeader title="Submissions" subtitle="Assignment answers submitted by students. Grade them here." />
      <Table columns={[{ label: "Student", render: (r) => <div><div className="font-medium">{r.student_name}</div><div className="text-[11px] text-mutedink">{r.subject_name}</div></div> }, { key: "assignment_title", label: "Assignment" }, { label: "Submitted", render: (r) => fmtDateTime(r.submitted_at) },
        { label: "Answer", render: (r) => <div className="max-w-xs"><div className="truncate text-xs">{r.submission_text}</div>{r.file_url && <a className="text-xs font-semibold text-orange" href={r.file_url} target="_blank" rel="noreferrer">Open file</a>}</div> },
        { label: "Marks", render: (r) => r.marks != null ? `${r.marks} / ${r.max_marks}` : "—" }, { label: "Status", render: (r) => <Pill text={r.status} /> }, { label: "", render: (r) => <Btn kind="ghost" onClick={() => setG(r)}>{r.status === "graded" ? "Change grade" : "Grade"}</Btn> }]} rows={d.items} empty="No submissions yet." />
      {g && <GradeModal s={g} onClose={() => setG(null)} onDone={() => { setG(null); load(); }} />}
    </div>
  );
}
function GradeModal({ s, onClose, onDone }) {
  const [marks, setMarks] = useState(s.marks ?? ""); const [fb, setFb] = useState(s.feedback ?? ""); const [busy, setBusy] = useState(false);
  const go = async () => { setBusy(true); try { await api.post("/submissions/grade", { id: s.id, marks, feedback: fb }); toast.success("Graded"); onDone(); } catch (e) { toast.error(formatApiError(e)); } finally { setBusy(false); } };
  return <Modal title={`Grade ${s.student_name}`} onClose={onClose}><p className="mb-3 whitespace-pre-wrap rounded-lg bg-canvas p-3 text-sm">{s.submission_text || "(file only)"}</p>
    <FieldWrap label={`Marks (max ${s.max_marks})`} required><input type="number" min="0" max={s.max_marks} className={inputCls} value={marks} onChange={(e) => setMarks(e.target.value)} /></FieldWrap>
    <div className="mt-3"><FieldWrap label="Feedback"><textarea rows={3} className={inputCls} value={fb} onChange={(e) => setFb(e.target.value)} /></FieldWrap></div>
    <div className="mt-4 flex justify-end gap-2"><Btn kind="ghost" onClick={onClose}>Cancel</Btn><Btn kind="orange" disabled={busy} onClick={go}>Save grade</Btn></div></Modal>;
}
export { Empty };
