import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import api, { formatApiError } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { PageHeader } from "@/components/common/Bits";
import { Btn, Card, Empty, Pill, inputCls } from "@/components/lms/ui";
import { AcademicFields, FieldWrap, Select } from "@/components/lms/FormFields";
import { labelize } from "@/lib/lms";

// Enter marks of one subject component for every student. Faculty marks wait for admin approval; admin marks are published at once.
export default function MarksEntry() {
  const { user } = useAuth();
  const [f, setF] = useState({}); const [component, setComponent] = useState("internal"); const [max, setMax] = useState("20");
  const [rows, setRows] = useState(null); const [busy, setBusy] = useState(false);
  const load = async () => {
    if (!f.subject_id) return setRows(null);
    try {
      const [roster, marks] = await Promise.all([api.get("/attendance/roster", { params: { subject_id: f.subject_id } }), api.get("/marks/list", { params: { subject_id: f.subject_id, component } })]);
      const byId = Object.fromEntries(marks.data.items.map((m) => [m.student_id, m]));
      setRows(roster.data.students.map((s) => ({ ...s, marks: byId[s.student_id]?.marks_obtained ?? "", status: byId[s.student_id]?.status })));
      const any = marks.data.items[0]; if (any) setMax(String(any.max_marks));
    } catch (e) { toast.error(formatApiError(e)); }
  };
  useEffect(() => { load(); }, [f.subject_id, component]); // eslint-disable-line
  const save = async () => {
    setBusy(true);
    try { const body = { subject_id: f.subject_id, component, max_marks: Number(max), rows: rows.filter((r) => r.marks !== "").map((r) => ({ student_id: r.student_id, marks_obtained: Number(r.marks) })) };
      const { data } = await api.post("/marks/save", body); toast.success(data.status === "published" ? "Marks published" : "Marks submitted for admin approval"); load();
    } catch (e) { toast.error(formatApiError(e)); } finally { setBusy(false); }
  };
  return (
    <div>
      <PageHeader title="Results / Marks" subtitle={user.role === "admin" ? "Marks you save are published to students immediately." : "Marks you submit become visible to students after the admin approves them."} />
      <Card className="mb-4"><div className="grid gap-3 sm:grid-cols-4">
        <AcademicFields values={f} onChange={(p) => setF((x) => ({ ...x, ...p }))} want={user.role === "admin" ? { programme: true, semester: true, subject: true } : { subject: true }} />
        <FieldWrap label="Component" required><Select value={component} onChange={setComponent} options={["internal", "assignment", "practical", "exam"].map((c) => ({ value: c, label: labelize(c) }))} /></FieldWrap>
        <FieldWrap label="Maximum marks" required><input type="number" min="1" className={inputCls} value={max} onChange={(e) => setMax(e.target.value)} /></FieldWrap>
      </div></Card>
      {!f.subject_id ? <Empty text="Select a subject." /> : !rows ? null : rows.length === 0 ? <Empty text="No students in this semester." /> : (
        <Card title={`${rows.length} students`} right={<Btn kind="orange" disabled={busy} onClick={save}>{busy ? "Saving…" : "Save marks"}</Btn>}>
          <div className="divide-y divide-navy/5">{rows.map((r) => (
            <div key={r.student_id} className="flex items-center justify-between gap-3 py-2">
              <div><div className="text-sm font-medium">{r.name}</div><div className="text-xs text-mutedink">{r.enrollment_number}</div></div>
              <div className="flex items-center gap-3">{r.status && <Pill text={r.status} />}<input type="number" min="0" max={max} step="0.5" className={`${inputCls} w-24`} value={r.marks} onChange={(e) => setRows((x) => x.map((y) => (y.student_id === r.student_id ? { ...y, marks: e.target.value } : y)))} /><span className="text-xs text-mutedink">/ {max}</span></div>
            </div>))}</div>
        </Card>)}
    </div>
  );
}
