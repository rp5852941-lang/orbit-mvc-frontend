import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import api, { formatApiError } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { PageHeader } from "@/components/common/Bits";
import { Btn, Card, Empty, inputCls } from "@/components/lms/ui";
import { AcademicFields, FieldWrap } from "@/components/lms/FormFields";

// Faculty (own subjects) and Admin (any subject) mark / change attendance of a subject for one date.
export default function AttendanceMark() {
  const { user } = useAuth();
  const [f, setF] = useState({}); const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [roster, setRoster] = useState(null); const [busy, setBusy] = useState(false);
  const load = () => f.subject_id && api.get("/attendance/roster", { params: { subject_id: f.subject_id, date } }).then((r) => setRoster(r.data.students.map((s) => ({ ...s, status: s.status || "present" })))).catch((e) => { setRoster(null); toast.error(formatApiError(e)); });
  useEffect(() => { setRoster(null); load(); }, [f.subject_id, date]); // eslint-disable-line
  const setStatus = (id, status) => setRoster((r) => r.map((s) => (s.student_id === id ? { ...s, status } : s)));
  const save = async () => { setBusy(true); try { const { data } = await api.post("/attendance/save", { subject_id: f.subject_id, date, rows: roster.map((s) => ({ student_id: s.student_id, status: s.status })) }); toast.success("Attendance saved"); load(); return data; } catch (e) { toast.error(formatApiError(e)); } finally { setBusy(false); } };
  return (
    <div>
      <PageHeader title="Attendance" subtitle="Choose a subject and date, mark every student and save. You can come back and change it later." />
      <Card className="mb-4"><div className="grid gap-3 sm:grid-cols-4">
        <AcademicFields values={f} onChange={(p) => setF((x) => ({ ...x, ...p }))} want={user.role === "admin" ? { programme: true, semester: true, subject: true } : { subject: true }} />
        <FieldWrap label="Date" required><input type="date" max={new Date().toISOString().slice(0, 10)} className={inputCls} value={date} onChange={(e) => setDate(e.target.value)} /></FieldWrap>
      </div></Card>
      {!f.subject_id ? <Empty text="Select a subject to see its students." /> : !roster ? null : roster.length === 0 ? <Empty text="No students are enrolled in this subject's semester." /> : (
        <Card title={`${roster.length} students`} right={<div className="flex gap-2"><Btn kind="ghost" onClick={() => setRoster((r) => r.map((s) => ({ ...s, status: "present" })))}>All present</Btn><Btn kind="orange" disabled={busy} onClick={save}>{busy ? "Saving…" : "Save attendance"}</Btn></div>}>
          <div className="divide-y divide-navy/5">{roster.map((s) => (
            <div key={s.student_id} className="flex flex-wrap items-center justify-between gap-2 py-2">
              <div><div className="text-sm font-medium">{s.name}</div><div className="text-xs text-mutedink">{s.enrollment_number}</div></div>
              <div className="flex gap-1">{["present", "absent", "late", "excused"].map((st) => <button key={st} type="button" onClick={() => setStatus(s.student_id, st)} className={`rounded-md px-3 py-1 text-xs font-semibold capitalize ${s.status === st ? (st === "present" ? "bg-success text-white" : st === "absent" ? "bg-danger text-white" : "bg-orange text-white") : "bg-canvas text-ink hover:bg-navy/10"}`}>{st}</button>)}</div>
            </div>))}</div>
        </Card>)}
    </div>
  );
}
