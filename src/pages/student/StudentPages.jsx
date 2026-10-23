import React, { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { Download } from "lucide-react";
import api, { formatApiError } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Loader, PageHeader, OrbitLogo } from "@/components/common/Bits";
import { Btn, Card, Empty, Modal, Pill, Table, Avatar, inputCls } from "@/components/lms/ui";
import { FieldWrap } from "@/components/lms/FormFields";
import { fmtDate, fmtDateTime, labelize } from "@/lib/lms";

const useGet = (url, params) => {
  const [data, setData] = useState(null);
  const load = useCallback(() => api.get(url, { params }).then((r) => setData(r.data)).catch((e) => { toast.error(formatApiError(e)); setData(false); }), [url, JSON.stringify(params)]); // eslint-disable-line
  useEffect(() => { load(); }, [load]);
  return [data, load];
};
const Row = ({ k, v }) => <div className="flex justify-between gap-4 border-b border-navy/5 py-2 text-sm last:border-0"><span className="text-mutedink">{k}</span><span className="text-right font-medium">{v || "—"}</span></div>;

export function MyProgramme() {
  const [d] = useGet("/portal/programme");
  if (d === null) return <Loader />; if (!d) return <Empty text="No programme assigned yet." />;
  const { programme: p, enrollment: e } = d;
  return (
    <div><PageHeader title="My Programme" subtitle="Everything below depends on the programme and semester the admin has set for you." />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card title={p.name} className="lg:col-span-2"><p className="mb-3 text-sm text-mutedink">{p.description}</p>
          <Row k="Programme code" v={p.code} /><Row k="Department" v={p.department_name} /><Row k="Level" v={labelize(p.level)} /><Row k="Duration" v={`${p.duration_years} years · ${p.total_semesters} semesters`} /><Row k="Mode" v={p.mode} /><Row k="Eligibility" v={p.eligibility} /></Card>
        <Card title="My semester"><div className="mb-3 rounded-lg bg-navy p-4 text-white"><div className="text-xs opacity-80">Current</div><div className="font-head text-xl font-bold">{e.semester_name}</div><div className="text-xs opacity-80">Session {e.session_name}</div></div>
          <Row k="Subjects" v={d.subjects.length} /><Row k="Credits" v={d.credits} /></Card>
      </div>
      <Card title={`Subjects of ${e.semester_name}`} className="mt-4"><Table columns={[{ key: "code", label: "Code" }, { key: "name", label: "Subject" }, { key: "credits", label: "Credits" }, { key: "subject_type", label: "Type", render: (r) => labelize(r.subject_type) }]} rows={d.subjects} /></Card>
    </div>
  );
}

export function Attendance() {
  const [d] = useGet("/attendance/summary");
  if (d === null) return <Loader />; if (!d) return <Empty text="No attendance data." />;
  return (
    <div><PageHeader title="Attendance" subtitle={`Minimum required: ${d.minimum}%`} />
      <div className="mb-4 grid gap-4 sm:grid-cols-3"><Card><div className="text-xs text-mutedink">Overall attendance</div><div className={`font-head text-3xl font-bold ${d.overall >= d.minimum ? "text-success" : "text-danger"}`}>{d.overall}%</div></Card></div>
      <Table columns={[{ key: "code", label: "Code" }, { key: "subject", label: "Subject" }, { key: "attended", label: "Attended" }, { key: "total", label: "Classes" },
        { label: "Percentage", render: (r) => <div className="flex items-center gap-2"><div className="h-2 w-28 overflow-hidden rounded bg-slate-100"><div className={`h-full ${r.percentage >= d.minimum ? "bg-success" : "bg-danger"}`} style={{ width: `${r.percentage}%` }} /></div>{r.percentage}%</div> },
        { label: "Status", render: (r) => <Pill text={r.status} /> }]} rows={d.subjects} />
    </div>
  );
}

export function Results() {
  const [d] = useGet("/portal/results");
  if (d === null) return <Loader />;
  return (
    <div><PageHeader title="Results" subtitle="Only marks approved by the university are shown." />
      {!d?.length ? <Empty text="No results have been published yet." /> : d.map((s) => (
        <Card key={s.semester_no} title={`Semester ${s.semester_no}`} right={<Pill text={s.result} />} className="mb-4">
          <Table columns={[{ key: "code", label: "Code" }, { key: "subject", label: "Subject" }, { label: "Components", render: (r) => Object.entries(r.components).map(([k, v]) => <span key={k} className="mr-2 text-xs"><b>{labelize(k)}</b> {v}</span>) },
            { label: "Total", render: (r) => `${r.obtained} / ${r.max}` }, { key: "percentage", label: "%" }, { key: "grade", label: "Grade" }, { label: "Result", render: (r) => <Pill text={r.result} /> }]} rows={s.subjects} /></Card>))}
    </div>
  );
}

export function Fees() {
  const [d] = useGet("/portal/fees");
  if (d === null) return <Loader />; if (!d) return <Empty text="No fee data." />;
  const inr = (n) => `₹ ${Number(n).toLocaleString("en-IN")}`;
  return (
    <div><PageHeader title="Fee & Payments" />
      <div className="mb-4 grid gap-4 sm:grid-cols-3">{[["Total fee", d.total, ""], ["Paid", d.paid, "text-success"], ["Pending", d.pending, "text-danger"]].map(([k, v, c]) => <Card key={k}><div className="text-xs text-mutedink">{k}</div><div className={`font-head text-2xl font-bold ${c}`}>{inr(v)}</div></Card>)}</div>
      <Card title="Fee structure" className="mb-4"><Table columns={[{ key: "fee_type", label: "Fee" }, { label: "Amount", render: (r) => inr(r.amount) }, { label: "Due", render: (r) => fmtDate(r.due_date) }]} rows={d.fees} empty="No fees set for your programme." /></Card>
      <Card title="Payment history"><Table columns={[{ label: "Date", render: (r) => fmtDate(r.paid_at || r.created_at) }, { label: "Amount", render: (r) => inr(r.amount) }, { label: "Mode", render: (r) => labelize(r.payment_mode) }, { key: "receipt_no", label: "Receipt" }, { label: "Status", render: (r) => <Pill text={r.status} /> }]} rows={d.payments} empty="No payments yet." /></Card>
    </div>
  );
}

export function IdCard() {
  const { user } = useAuth(); const p = user.profile || {}; const e = user.enrollment || {};
  return (
    <div><PageHeader title="Digital ID Card"><Btn kind="ghost" onClick={() => window.print()}><Download className="h-4 w-4" /> Print</Btn></PageHeader>
      <div className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-navy/15 bg-white shadow-lift">
        <div className="bg-navy p-4 text-center text-white"><div className="flex justify-center"><OrbitLogo dark /></div><div className="mt-1 text-[11px] tracking-widest opacity-80">STUDENT IDENTITY CARD</div></div>
        <div className="flex flex-col items-center p-6"><Avatar src={user.photo} name={user.name} size="h-28 w-28" />
          <div className="mt-3 font-head text-xl font-bold text-dark-navy">{user.name}</div><div className="text-sm text-mutedink">{e.programme_name}</div>
          <div className="mt-4 w-full"><Row k="Enrollment no." v={p.enrollment_number} /><Row k="Semester" v={e.semester_name} /><Row k="Session" v={e.session_name} /><Row k="Date of birth" v={fmtDate(p.dob)} /><Row k="Blood group" v={p.blood_group} /><Row k="Mobile" v={user.phone} /></div></div>
      </div>
    </div>
  );
}

export function Assignments() {
  const [rows, load] = useGet("/assignments/list", { limit: 200 });
  const [sub, setSub] = useState(null);
  const [subs, loadSubs] = useGet("/submissions/list");
  if (rows === null || subs === null) return <Loader />;
  const mine = Object.fromEntries((subs?.items || []).map((s) => [s.assignment_id, s]));
  return (
    <div><PageHeader title="Assignments" subtitle="Assignments of your programme and semester." />
      <Table columns={[{ label: "Assignment", render: (r) => <div><div className="font-medium">{r.title}</div><div className="text-[11px] text-mutedink">{r.subject_name}</div></div> }, { label: "Due", render: (r) => fmtDate(r.due_date) }, { key: "max_marks", label: "Marks" },
        { label: "My status", render: (r) => mine[r.id] ? <div><Pill text={mine[r.id].status} />{mine[r.id].marks != null && <span className="ml-2 text-xs font-semibold">{mine[r.id].marks}/{r.max_marks}</span>}</div> : <Pill text="pending" /> },
        { label: "", render: (r) => mine[r.id]?.status === "graded" ? null : <Btn kind="orange" onClick={() => setSub(r)}>{mine[r.id] ? "Re-submit" : "Submit"}</Btn> }]} rows={rows?.items || []} empty="No assignments yet." />
      {sub && <SubmitModal a={sub} onClose={() => setSub(null)} onDone={() => { setSub(null); load(); loadSubs(); }} />}
    </div>
  );
}
function SubmitModal({ a, onClose, onDone }) {
  const [text, setText] = useState(""); const [file, setFile] = useState(null); const [busy, setBusy] = useState(false);
  const go = async () => {
    setBusy(true);
    try { let file_id; if (file) { const fd = new FormData(); fd.append("file", file); file_id = (await api.post("/uploads/add", fd, { headers: { "Content-Type": "multipart/form-data" } })).data.id; }
      await api.post("/submissions/submit", { assignment_id: a.id, submission_text: text, file_id }); toast.success("Assignment submitted"); onDone();
    } catch (e) { toast.error(formatApiError(e)); } finally { setBusy(false); }
  };
  return <Modal title={`Submit: ${a.title}`} onClose={onClose}><p className="mb-3 text-sm text-mutedink">{a.instructions}</p>
    <FieldWrap label="Your answer"><textarea rows={4} className={inputCls} value={text} onChange={(e) => setText(e.target.value)} /></FieldWrap>
    <div className="mt-3"><FieldWrap label={`Attach a file (${a.allowed_types})`}><input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} /></FieldWrap></div>
    <div className="mt-4 flex justify-end gap-2"><Btn kind="ghost" onClick={onClose}>Cancel</Btn><Btn kind="orange" disabled={busy} onClick={go}>{busy ? "Submitting…" : "Submit"}</Btn></div></Modal>;
}

export function Notifications() {
  const [d, load] = useGet("/notifications/list");
  if (d === null) return <Loader />;
  const read = async (n) => { try { await api.put("/notifications/edit", { id: n.id, is_read: 1 }); load(); } catch (e) { toast.error(formatApiError(e)); } };
  return (
    <div><PageHeader title="Notifications" />
      {!d?.items?.length ? <Empty text="You have no notifications." /> : <div className="space-y-2">{d.items.map((n) => (
        <div key={n.id} className={`flex items-start justify-between gap-3 rounded-xl border p-4 ${n.is_read ? "border-navy/10 bg-white" : "border-orange/30 bg-orange/5"}`}>
          <div><div className="text-sm font-semibold">{n.title}</div><div className="text-sm text-mutedink">{n.message}</div><div className="mt-1 text-[11px] text-mutedink">{fmtDateTime(n.created_at)}</div></div>
          {!n.is_read && <Btn kind="ghost" onClick={() => read(n)}>Mark read</Btn>}</div>))}</div>}
    </div>
  );
}

export function Profile() {
  const { user } = useAuth(); const p = user.profile || {};
  const [pw, setPw] = useState({ current_password: "", new_password: "" }); const [busy, setBusy] = useState(false);
  const change = async () => { setBusy(true); try { await api.post("/auth/changePassword", pw); toast.success("Password changed"); setPw({ current_password: "", new_password: "" }); } catch (e) { toast.error(formatApiError(e)); } finally { setBusy(false); } };
  const rows = user.role === "student" ? [["Enrollment no.", p.enrollment_number], ["University email", p.university_email], ["Date of birth", fmtDate(p.dob)], ["Gender", labelize(p.gender)], ["Blood group", p.blood_group], ["Address", p.address], ["City / State", `${p.city || ""}, ${p.state || ""}`], ["Pincode", p.pincode], ["Guardian", `${p.guardian_name || ""} (${p.guardian_phone || ""})`], ["Programme", user.enrollment?.programme_name], ["Semester", user.enrollment?.semester_name]]
    : user.role === "faculty" ? [["Employee id", p.employee_id], ["Department", p.department_name], ["Designation", p.designation], ["Qualification", p.qualification], ["Experience", `${p.experience_years ?? ""} years`], ["Employment", labelize(p.employment_type)], ["Joined", fmtDate(p.joining_date)], ["About", p.bio]] : [];
  return (
    <div><PageHeader title="My Profile" subtitle="To change these details please ask the administrator." />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2"><div className="mb-4 flex items-center gap-4"><Avatar src={user.photo} name={user.name} size="h-20 w-20" /><div><div className="font-head text-xl font-bold text-dark-navy">{user.name}</div><div className="text-sm text-mutedink">{user.email} · {user.phone}</div><Pill text={user.status} /></div></div>{rows.map(([k, v]) => <Row key={k} k={k} v={v} />)}</Card>
        {!user.is_super_admin && <Card title="Change password"><div className="space-y-3"><FieldWrap label="Current password" required><input type="password" className={inputCls} value={pw.current_password} onChange={(e) => setPw({ ...pw, current_password: e.target.value })} /></FieldWrap>
          <FieldWrap label="New password" required hint="8+ characters with a letter and a number"><input type="password" className={inputCls} value={pw.new_password} onChange={(e) => setPw({ ...pw, new_password: e.target.value })} /></FieldWrap><Btn kind="orange" disabled={busy} onClick={change}>Update password</Btn></div></Card>}
      </div>
    </div>
  );
}
