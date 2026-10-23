import React, { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, BookOpenCheck } from "lucide-react";
import api, { formatApiError } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Loader, PageHeader } from "@/components/common/Bits";
import { Btn, Card, Empty, Modal, Pill, Table, Avatar, Toggle, inputCls, confirmBox } from "@/components/lms/ui";
import { AcademicFields, FieldWrap, Select } from "@/components/lms/FormFields";
import PersonForm from "@/components/lms/PersonForm";
import { FeesManage, PaymentsManage } from "@/pages/common/Resources";
import { fmtDate, fmtDateTime, labelize } from "@/lib/lms";

function useList(url, params) {
  const [d, setD] = useState(null);
  const key = JSON.stringify(params || {});
  const load = useCallback(() => api.get(url, { params }).then((r) => setD(r.data)).catch((e) => { toast.error(formatApiError(e)); setD({ items: [] }); }), [url, key]); // eslint-disable-line
  useEffect(() => { const t = setTimeout(load, 200); return () => clearTimeout(t); }, [load]);
  return [d, load];
}
const person = (r) => <div className="flex items-center gap-3"><Avatar src={r.photo} name={r.name} /><div><div className="font-medium">{r.name}</div><div className="text-[11px] text-mutedink">{r.email}</div></div></div>;
const SearchBar = ({ f, setF, children }) => <div className="mb-4 flex flex-wrap items-end gap-3 rounded-xl border border-navy/10 bg-white p-3 shadow-card"><input className={`${inputCls} max-w-xs`} placeholder="Search name, email, number…" value={f.q || ""} onChange={(e) => setF({ ...f, q: e.target.value })} />{children}</div>;
const iconBtn = "rounded p-1.5 hover:bg-navy/10";

/* ---------- Applications (people who filled the Apply Now form) ---------- */
export function Applications() {
  const [f, setF] = useState({}); const [d, load] = useList("/applyNow/list", f); const [edit, setEdit] = useState(null);
  const open = async (r) => { try { setEdit((await api.get("/applyNow/get", { params: { id: r.id } })).data); setEdit((e) => ({ ...e, application_id: r.id })); } catch (e) { toast.error(formatApiError(e)); } };
  const del = async (r) => { if (!confirmBox(`Delete ${r.name}'s application and student account?`)) return; try { await api.delete("/applyNow/delete", { params: { id: r.id } }); toast.success("Deleted"); load(); } catch (e) { toast.error(formatApiError(e)); } };
  if (!d) return <Loader />;
  return (
    <div><PageHeader title="Applications" subtitle="Everyone who completes the Apply Now form becomes a student automatically." />
      <SearchBar f={f} setF={setF} />
      <Table columns={[{ label: "Applicant", render: person }, { key: "enrollment_number", label: "Enrollment no." }, { label: "Programme", render: (r) => r.programme_code }, { label: "City", render: (r) => `${r.city || ""}, ${r.state || ""}` }, { label: "Applied", render: (r) => fmtDate(r.submitted_at) }, { label: "Now", render: (r) => <Pill text={r.role} tone="b" /> },
        { label: "", render: (r) => <div className="flex"><button title="Edit" className={`${iconBtn} text-navy`} onClick={() => open(r)}><Pencil className="h-4 w-4" /></button><button title="Delete" className={`${iconBtn} text-danger`} onClick={() => del(r)}><Trash2 className="h-4 w-4" /></button></div> }]} rows={d.items} empty="No applications yet." />
      {edit && <Modal title={`Edit application — ${edit.name}`} wide onClose={() => setEdit(null)}><PersonForm kind="student" mode="edit" showSemester initial={edit} onCancel={() => setEdit(null)} submitLabel="Save changes" onSubmit={async (b) => { await api.put("/applyNow/edit", { ...b, id: edit.application_id }); toast.success("Saved"); setEdit(null); load(); }} /></Modal>}
    </div>
  );
}

/* ---------- Students ---------- */
export function Students() {
  const [f, setF] = useState({}); const [d, load] = useList("/students/list", f); const [edit, setEdit] = useState(null); const [add, setAdd] = useState(false); const [promote, setPromote] = useState(null);
  const open = async (r) => { try { setEdit((await api.get("/students/get", { params: { id: r.id } })).data); } catch (e) { toast.error(formatApiError(e)); } };
  const del = async (r) => { if (!confirmBox(`Delete student ${r.name}?`)) return; try { await api.delete("/students/delete", { params: { id: r.id } }); toast.success("Deleted"); load(); } catch (e) { toast.error(formatApiError(e)); } };
  if (!d) return <Loader />;
  return (
    <div><PageHeader title="Students" subtitle="Edit any student, move them to another semester, reset their password, or switch them to Faculty."><Btn kind="orange" onClick={() => setAdd(true)}><Plus className="h-4 w-4" /> Add student</Btn></PageHeader>
      <SearchBar f={f} setF={setF}><div className="w-72"><AcademicFields values={f} onChange={(p) => setF((x) => ({ ...x, ...p }))} want={{ programme: true, semester: true }} required={{ programme: false, semester: false }} /></div></SearchBar>
      <Table columns={[{ label: "Student", render: person }, { key: "enrollment_number", label: "Enrollment no." }, { label: "Programme", render: (r) => `${r.programme_code} · Sem ${r.semester_no}` }, { label: "Status", render: (r) => <Pill text={r.status} /> },
        { label: "Faculty?", render: (r) => <Toggle on={false} onChange={() => setPromote(r)} labelOff="Student" /> },
        { label: "", render: (r) => <div className="flex"><button title="Edit" className={`${iconBtn} text-navy`} onClick={() => open(r)}><Pencil className="h-4 w-4" /></button><button title="Delete" className={`${iconBtn} text-danger`} onClick={() => del(r)}><Trash2 className="h-4 w-4" /></button></div> }]} rows={d.items} empty="No students found." />
      {edit && <Modal title={`Edit student — ${edit.name}`} wide onClose={() => setEdit(null)}><PersonForm kind="student" mode="edit" showSemester initial={edit} onCancel={() => setEdit(null)} submitLabel="Save changes" onSubmit={async (b) => { await api.put("/students/edit", { ...b, id: edit.id }); toast.success("Student updated"); setEdit(null); load(); }} /></Modal>}
      {add && <Modal title="Add student" wide onClose={() => setAdd(false)}><PersonForm kind="student" mode="create" showSemester onCancel={() => setAdd(false)} submitLabel="Create student" onSubmit={async (b) => { await api.post("/students/add", b); toast.success("Student created"); setAdd(false); load(); }} /></Modal>}
      {promote && <Modal title={`Make ${promote.name} faculty`} wide onClose={() => setPromote(null)}><p className="mb-3 text-sm text-mutedink">Fill the faculty details. The person keeps their student record and can be switched back at any time.</p>
        <PersonForm kind="faculty" mode="create" hideAccount onCancel={() => setPromote(null)} submitLabel="Switch to Faculty" onSubmit={async (b) => { await api.post("/faculty/toggle", { ...b, id: promote.id, faculty: true }); toast.success(`${promote.name} is now faculty`); setPromote(null); load(); }} /></Modal>}
    </div>
  );
}

/* ---------- Faculty ---------- */
export function Faculty() {
  const [f, setF] = useState({}); const [d, load] = useList("/faculty/list", f); const [edit, setEdit] = useState(null); const [add, setAdd] = useState(false); const [assign, setAssign] = useState(null); const [demote, setDemote] = useState(null);
  const open = async (r) => { try { setEdit((await api.get("/faculty/get", { params: { id: r.id } })).data); } catch (e) { toast.error(formatApiError(e)); } };
  const del = async (r) => { if (!confirmBox(`Delete faculty ${r.name}?`)) return; try { await api.delete("/faculty/delete", { params: { id: r.id } }); toast.success("Deleted"); load(); } catch (e) { toast.error(formatApiError(e)); } };
  const toStudent = async (r) => {
    try { await api.post("/faculty/toggle", { id: r.id, faculty: false }); toast.success(`${r.name} is now a student`); load(); }
    catch (e) { if (e.response?.status === 422) setDemote(r); else toast.error(formatApiError(e)); }   // created directly as faculty: needs student details
  };
  if (!d) return <Loader />;
  return (
    <div><PageHeader title="Faculty Management" subtitle="Add faculty, assign the subjects they teach, or switch them back to Student."><Btn kind="orange" onClick={() => setAdd(true)}><Plus className="h-4 w-4" /> Add faculty</Btn></PageHeader>
      <SearchBar f={f} setF={setF} />
      <Table columns={[{ label: "Faculty", render: person }, { key: "employee_id", label: "Employee id" }, { key: "department_name", label: "Department" }, { key: "designation", label: "Designation" }, { label: "Subjects", render: (r) => r.subjects_count }, { label: "Status", render: (r) => <Pill text={r.status} /> },
        { label: "Faculty?", render: (r) => <Toggle on onChange={() => confirmBox(`Switch ${r.name} to Student?`) && toStudent(r)} labelOn="Faculty" /> },
        { label: "", render: (r) => <div className="flex"><button title="Assign subjects" className={`${iconBtn} text-orange`} onClick={() => setAssign(r)}><BookOpenCheck className="h-4 w-4" /></button><button title="Edit" className={`${iconBtn} text-navy`} onClick={() => open(r)}><Pencil className="h-4 w-4" /></button><button title="Delete" className={`${iconBtn} text-danger`} onClick={() => del(r)}><Trash2 className="h-4 w-4" /></button></div> }]} rows={d.items} empty="No faculty yet." />
      {edit && <Modal title={`Edit faculty — ${edit.name}`} wide onClose={() => setEdit(null)}><PersonForm kind="faculty" mode="edit" initial={edit} onCancel={() => setEdit(null)} submitLabel="Save changes" onSubmit={async (b) => { await api.put("/faculty/edit", { ...b, id: edit.id }); toast.success("Faculty updated"); setEdit(null); load(); }} /></Modal>}
      {add && <Modal title="Add faculty" wide onClose={() => setAdd(false)}><PersonForm kind="faculty" mode="create" onCancel={() => setAdd(false)} submitLabel="Create faculty" onSubmit={async (b) => { await api.post("/faculty/add", b); toast.success("Faculty created"); setAdd(false); load(); }} /></Modal>}
      {assign && <AssignModal fac={assign} onClose={() => setAssign(null)} onDone={() => { setAssign(null); load(); }} />}
      {demote && <Modal title={`Make ${demote.name} a student`} wide onClose={() => setDemote(null)}><p className="mb-3 text-sm text-mutedink">This person was created as faculty, so student details are needed once.</p>
        <PersonForm kind="student" mode="create" hideAccount onCancel={() => setDemote(null)} submitLabel="Switch to Student" onSubmit={async (b) => { await api.post("/faculty/toggle", { ...b, id: demote.id, faculty: false }); toast.success(`${demote.name} is now a student`); setDemote(null); load(); }} /></Modal>}
    </div>
  );
}
function AssignModal({ fac, onClose, onDone }) {
  const [f, setF] = useState({}); const [subs, setSubs] = useState([]); const [sel, setSel] = useState(null); const [all, setAll] = useState({});
  useEffect(() => { api.get("/faculty/get", { params: { id: fac.id } }).then((r) => setSel(new Set(r.data.subject_ids))); }, [fac.id]);
  useEffect(() => { if (f.programme_id) api.get("/lookup/list", { params: { type: "subjects", programme_id: f.programme_id, semester_id: f.semester_id } }).then((r) => { setSubs(r.data); setAll((a) => ({ ...a, ...Object.fromEntries(r.data.map((s) => [s.id, s])) })); }); else setSubs([]); }, [f.programme_id, f.semester_id]);
  const flip = (id) => setSel((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const save = async () => { try { await api.post("/faculty/assign", { id: fac.id, subject_ids: [...sel] }); toast.success("Subjects assigned"); onDone(); } catch (e) { toast.error(formatApiError(e)); } };
  if (!sel) return null;
  return <Modal title={`Subjects taught by ${fac.name}`} wide onClose={onClose}>
    <div className="grid gap-3 sm:grid-cols-2"><AcademicFields values={f} onChange={(p) => setF((x) => ({ ...x, ...p }))} want={{ programme: true, semester: true }} required={{ semester: false }} /></div>
    <div className="mt-3 max-h-64 overflow-y-auto rounded-lg border border-navy/10 p-2">{subs.length ? subs.map((s) => <label key={s.id} className="flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-canvas"><input type="checkbox" checked={sel.has(s.id)} onChange={() => flip(s.id)} />{s.code} — {s.name}</label>) : <Empty text="Choose a programme (and semester) to list its subjects." />}</div>
    <div className="mt-3 text-xs text-mutedink">{sel.size} subject(s) selected in total (across all programmes).</div>
    <div className="mt-4 flex justify-end gap-2"><Btn kind="ghost" onClick={onClose}>Cancel</Btn><Btn kind="orange" onClick={save}>Save assignment</Btn></div></Modal>;
}

/* ---------- Admins (super admin only) ---------- */
export function Admins() {
  const { user } = useAuth(); const [d, load] = useList("/admins/list"); const [edit, setEdit] = useState(null); const [add, setAdd] = useState(false);
  const del = async (r) => { if (!confirmBox(`Delete admin ${r.name}?`)) return; try { await api.delete("/admins/delete", { params: { id: r.id } }); toast.success("Deleted"); load(); } catch (e) { toast.error(formatApiError(e)); } };
  if (!user.is_super_admin) return <Empty text="Only the super admin can manage admins." />;
  if (!d) return <Loader />;
  return (
    <div><PageHeader title="Admin Management" subtitle="Only the super admin can create and remove admins."><Btn kind="orange" onClick={() => setAdd(true)}><Plus className="h-4 w-4" /> Create admin</Btn></PageHeader>
      <Table columns={[{ label: "Admin", render: person }, { key: "phone", label: "Mobile" }, { label: "Last login", render: (r) => fmtDateTime(r.last_login_at) }, { label: "Status", render: (r) => <Pill text={r.status} /> },
        { label: "", render: (r) => <div className="flex"><button className={`${iconBtn} text-navy`} onClick={() => setEdit(r)}><Pencil className="h-4 w-4" /></button><button className={`${iconBtn} text-danger`} onClick={() => del(r)}><Trash2 className="h-4 w-4" /></button></div> }]} rows={d.items} empty="No other admins yet." />
      {add && <Modal title="Create admin" onClose={() => setAdd(false)}><PersonForm kind="admin" mode="create" onCancel={() => setAdd(false)} submitLabel="Create admin" onSubmit={async (b) => { await api.post("/admins/add", b); toast.success("Admin created"); setAdd(false); load(); }} /></Modal>}
      {edit && <Modal title={`Edit admin — ${edit.name}`} onClose={() => setEdit(null)}><PersonForm kind="admin" mode="edit" initial={edit} onCancel={() => setEdit(null)} submitLabel="Save changes" onSubmit={async (b) => { await api.put("/admins/edit", { ...b, id: edit.id }); toast.success("Admin updated"); setEdit(null); load(); }} /></Modal>}
    </div>
  );
}

/* ---------- Access Management: authentication + authorization ---------- */
function Matrix({ modules, state, setState }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">{modules.map((m) => (
      <div key={m.module} className="rounded-lg border border-navy/10 p-3">
        <div className="mb-1 text-[10px] font-bold uppercase tracking-wide text-mutedink">{m.group}</div><div className="mb-2 text-sm font-semibold text-dark-navy">{m.label}</div>
        <div className="flex flex-wrap gap-3">{m.actions.map((a) => (
          <label key={a.code} className="flex cursor-pointer items-center gap-1.5 text-xs" data-testid={`perm-${a.code}`}>
            <input type="checkbox" checked={!!state[a.code]} onChange={(e) => setState({ ...state, [a.code]: e.target.checked })} />{labelize(a.action)}{a.overridden && <span className="rounded bg-orange/10 px-1 text-[9px] font-bold text-orange">custom</span>}
          </label>))}</div>
      </div>))}</div>
  );
}
export function Access() {
  const { user: me } = useAuth();
  const [tab, setTab] = useState("student"); const [users, setUsers] = useState(null); const [q, setQ] = useState(""); const [sel, setSel] = useState(null);
  const [data, setData] = useState(null); const [state, setState] = useState({}); const [busy, setBusy] = useState(false);
  const roleTab = tab.startsWith("role:"); const role = roleTab ? tab.slice(5) : tab;
  useEffect(() => { setSel(null); setData(null); if (!roleTab) { const url = { student: "/students/list", faculty: "/faculty/list", admin: "/admins/list" }[tab]; setUsers(null); api.get(url, { params: { q } }).then((r) => setUsers(r.data.items)).catch(() => setUsers([])); } }, [tab, q]); // eslint-disable-line
  const open = useCallback(async () => {
    try { const r = roleTab ? await api.get("/access/rolePermissions", { params: { role } }) : await api.get("/access/userPermissions", { params: { user_id: sel } });
      const mods = r.data.modules.map((m) => ({ ...m, label: m.label })); setData({ ...r.data, modules: mods });
      setState(Object.fromEntries(mods.flatMap((m) => m.actions.map((a) => [a.code, roleTab ? a.allowed : a.allowed])))); } catch (e) { toast.error(formatApiError(e)); setData(null); }
  }, [roleTab, role, sel]);
  useEffect(() => { if (roleTab || sel) open(); }, [roleTab, role, sel, open]);
  const save = async () => {
    const before = Object.fromEntries(data.modules.flatMap((m) => m.actions.map((a) => [a.code, a.allowed]))); const changed = Object.fromEntries(Object.entries(state).filter(([k, v]) => v !== before[k]));
    if (!Object.keys(changed).length) return toast.info("Nothing changed");
    setBusy(true);
    try { const { data: r } = await api.post(roleTab ? "/access/saveRolePermissions" : "/access/saveUserPermissions", roleTab ? { role, permissions: changed } : { user_id: sel, permissions: changed }); toast.success(r ? "Access saved" : "Saved"); open(); }
    catch (e) { toast.error(formatApiError(e)); } finally { setBusy(false); }
  };
  const tabs = [["student", "Students"], ["faculty", "Faculty"], ...(me.is_super_admin ? [["admin", "Admins"]] : []), ["role:student", "Default: Student"], ["role:faculty", "Default: Faculty"]];
  return (
    <div><PageHeader title="Access Management" subtitle="Authentication & authorization: switch any menu or action ON/OFF for one person, or change the default for a whole role. The sidebar and the API both follow these checkboxes." />
      <div className="mb-4 flex flex-wrap gap-2">{tabs.map(([k, l]) => <button key={k} onClick={() => setTab(k)} className={`rounded-full px-4 py-1.5 text-sm font-semibold ${tab === k ? "bg-navy text-white" : "bg-white text-ink ring-1 ring-navy/15 hover:bg-navy/5"}`}>{l}</button>)}</div>
      <div className={roleTab ? "" : "grid gap-4 lg:grid-cols-[300px_1fr]"}>
        {!roleTab && <Card><input className={`${inputCls} mb-2`} placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />
          <div className="max-h-[60vh] space-y-1 overflow-y-auto">{!users ? <Loader /> : users.length ? users.map((u) => <button key={u.id} onClick={() => setSel(u.id)} className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm ${sel === u.id ? "bg-navy text-white" : "hover:bg-navy/5"}`}><Avatar src={u.photo} name={u.name} size="h-8 w-8" /><div className="min-w-0"><div className="truncate font-medium">{u.name}</div><div className={`truncate text-[11px] ${sel === u.id ? "text-white/70" : "text-mutedink"}`}>{u.email}</div></div></button>) : <Empty text="No users." />}</div></Card>}
        <div>{!roleTab && !sel ? <Empty text="Select a person to manage their access." /> : !data ? <Loader /> : (
          <Card title={roleTab ? `Default access of every ${role}` : `Access of ${data.user.name} (${data.user.role})`} right={<Btn kind="orange" disabled={busy} onClick={save}>{busy ? "Saving…" : "Save access"}</Btn>}>
            {roleTab && <p className="mb-3 text-xs text-mutedink">These checkboxes apply to every {role}, except people who have a custom setting.</p>}
            <Matrix modules={data.modules} state={state} setState={setState} /></Card>)}</div>
      </div>
    </div>
  );
}

/* ---------- Approvals (marks submitted by faculty) ---------- */
export function Approvals() {
  const [d, load] = useList("/marks/list", { status: "submitted" });
  const groups = {}; (d?.items || []).forEach((m) => { const k = `${m.subject_id}|${m.component}`; (groups[k] ||= { subject_id: m.subject_id, subject: m.subject_name, component: m.component, rows: [] }).rows.push(m); });
  const decide = async (g, decision) => { try { await api.post("/marks/approve", { subject_id: g.subject_id, component: g.component, decision }); toast.success(decision === "published" ? "Published to students" : "Rejected"); load(); } catch (e) { toast.error(formatApiError(e)); } };
  if (!d) return <Loader />;
  return (
    <div><PageHeader title="Approvals" subtitle="Marks submitted by faculty are shown to students only after you approve them." />
      {!Object.keys(groups).length ? <Empty text="Nothing is waiting for approval." /> : Object.values(groups).map((g) => (
        <Card key={g.subject_id + g.component} title={`${g.subject} — ${labelize(g.component)}`} className="mb-4" right={<div className="flex gap-2"><Btn kind="ghost" onClick={() => decide(g, "rejected")}>Reject</Btn><Btn kind="orange" onClick={() => decide(g, "published")}>Approve & publish</Btn></div>}>
          <Table columns={[{ key: "student_name", label: "Student" }, { label: "Marks", render: (r) => `${r.marks_obtained} / ${r.max_marks}` }, { key: "grade", label: "Grade" }]} rows={g.rows} /></Card>))}
    </div>
  );
}

export function Activity() {
  const [d] = useList("/activity/list");
  if (!d) return <Loader />;
  return <div><PageHeader title="Activity Log" subtitle="Who did what, and when." /><Table columns={[{ label: "When", render: (r) => fmtDateTime(r.created_at) }, { key: "user_name", label: "User" }, { key: "role_code", label: "Role" }, { label: "Action", render: (r) => labelize(r.action) }, { key: "details", label: "Details" }]} rows={d.items} empty="No activity yet." /></div>;
}

export function SettingsPage() {
  const [d] = useList("/settings/list"); const [v, setV] = useState({});
  useEffect(() => { d?.items && setV(Object.fromEntries(d.items.map((s) => [s.setting_key, s.setting_value]))); }, [d]);
  const save = async () => { try { await api.post("/settings/save", { settings: v }); toast.success("Settings saved"); } catch (e) { toast.error(formatApiError(e)); } };
  if (!d) return <Loader />;
  return <div><PageHeader title="Settings"><Btn kind="orange" onClick={save}>Save settings</Btn></PageHeader><Card><div className="grid gap-3 sm:grid-cols-2">{d.items.map((s) => <FieldWrap key={s.setting_key} label={labelize(s.setting_key)} hint={s.description}><input className={inputCls} value={v[s.setting_key] ?? ""} onChange={(e) => setV({ ...v, [s.setting_key]: e.target.value })} /></FieldWrap>)}</div></Card></div>;
}

export function FeesPage() {
  const [tab, setTab] = useState("structure");
  return <div><div className="mb-4 flex gap-2">{[["structure", "Fee structure"], ["payments", "Payments"]].map(([k, l]) => <button key={k} onClick={() => setTab(k)} className={`rounded-full px-4 py-1.5 text-sm font-semibold ${tab === k ? "bg-navy text-white" : "bg-white ring-1 ring-navy/15"}`}>{l}</button>)}</div>{tab === "structure" ? <FeesManage /> : <PaymentsManage />}</div>;
}
export { Select };
