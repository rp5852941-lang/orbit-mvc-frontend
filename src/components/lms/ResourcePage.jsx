import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Search, ExternalLink } from "lucide-react";
import api, { formatApiError } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Loader, PageHeader } from "@/components/common/Bits";
import { Btn, Modal, Table, Empty, Pill, inputCls, confirmBox } from "./ui";
import { AcademicFields, FieldInput, Select } from "./FormFields";

const HELPER = ["programme_id", "semester_id", "subject_id"];
const ACADEMIC_SCOPES = ["subject", "ebook", "subject_catalog"];

// One page for every table: filter bar (programme > semester > subject), list or cards, Add / Edit / Delete form.
// The form fields, required flags and permissions all come from the API (/api/<entity>/meta) - nothing is hard-coded per page.
export default function ResourcePage({ entity, title, subtitle, columns, cards, filterStatus, hideFilters, defaultValues = {}, extraActions, readOnly = false, addLabel }) {
  const { user } = useAuth();
  const [meta, setMeta] = useState(null);
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState({});
  const [modal, setModal] = useState(null);       // {row?}
  const academic = meta && ACADEMIC_SCOPES.includes(meta.scope);

  useEffect(() => { api.get(`/${entity}/meta`).then((r) => setMeta(r.data)).catch((e) => toast.error(formatApiError(e))); }, [entity]);
  const load = useCallback(() => {
    const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== "" && v != null));
    return api.get(`/${entity}/list`, { params: { limit: 200, ...params } }).then((r) => setData(r.data)).catch((e) => { setData({ items: [], total: 0 }); toast.error(formatApiError(e)); });
  }, [entity, filters]);
  useEffect(() => { const t = setTimeout(load, filters.q ? 300 : 0); return () => clearTimeout(t); }, [load, filters.q]);

  const remove = async (row) => {
    if (!confirmBox(`Delete this ${meta.title.toLowerCase()}?`)) return;
    try { await api.delete(`/${entity}/delete`, { params: { id: row.id } }); toast.success(`${meta.title} deleted`); load(); } catch (e) { toast.error(formatApiError(e)); }
  };

  const cols = useMemo(() => {
    if (!meta || !columns) return [];
    const list = [...columns];
    if (!readOnly && (meta.can.edit || meta.can.delete || extraActions)) {
      list.push({ label: "Actions", render: (r) => (
        <div className="flex items-center gap-1">
          {extraActions?.(r, load)}
          {meta.can.edit && <button title="Edit" className="rounded p-1.5 text-navy hover:bg-navy/10" onClick={() => setModal({ row: r })}><Pencil className="h-4 w-4" /></button>}
          {meta.can.delete && <button title="Delete" className="rounded p-1.5 text-danger hover:bg-danger/10" onClick={() => remove(r)}><Trash2 className="h-4 w-4" /></button>}
        </div>) });
    }
    return list;
  }, [meta, columns, readOnly, extraActions]); // eslint-disable-line

  if (!meta || !data) return <Loader />;
  const canAdd = !readOnly && meta.can.create;
  const setF = (patch) => setFilters((f) => ({ ...f, ...patch }));

  return (
    <div>
      <PageHeader title={title} subtitle={subtitle}>
        {canAdd && <Btn kind="orange" onClick={() => setModal({})}><Plus className="h-4 w-4" /> {addLabel || `Add ${meta.title.toLowerCase()}`}</Btn>}
      </PageHeader>

      {!hideFilters && (
        <div className="mb-4 flex flex-wrap items-end gap-3 rounded-xl border border-navy/10 bg-white p-3 shadow-card">
          {academic && user.role === "admin" && <div className="grid flex-1 gap-3 sm:grid-cols-3"><AcademicFields values={filters} onChange={setF} want={{ programme: true, semester: true, subject: meta.scope !== "subject_catalog" }} required={{ programme: false, semester: false, subject: false }} /></div>}
          {academic && user.role === "faculty" && <div className="min-w-[220px]"><AcademicFields values={filters} onChange={setF} want={{ subject: true }} required={{ subject: false }} /></div>}
          {filterStatus && <div className="w-40"><Select value={filters.status} onChange={(v) => setF({ status: v })} options={filterStatus.map((s) => ({ value: s, label: s.replace(/_/g, " ") }))} placeholder="All status" /></div>}
          <div className="relative min-w-[200px] flex-1 sm:max-w-xs"><Search className="absolute left-3 top-2.5 h-4 w-4 text-mutedink" />
            <input className={`${inputCls} pl-9`} placeholder="Search…" value={filters.q || ""} onChange={(e) => setF({ q: e.target.value })} /></div>
          {Object.values(filters).some(Boolean) && <Btn kind="ghost" onClick={() => setFilters({})}>Clear</Btn>}
        </div>
      )}

      {cards ? (
        data.items.length === 0 ? <Empty text="Nothing has been added for your programme and semester yet." /> :
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {data.items.map((r) => (
            <div key={r.id} className="flex flex-col rounded-xl border border-navy/10 bg-white p-4 shadow-card">
              <div className="mb-1 flex flex-wrap gap-1.5">{cards.badges?.(r)}</div>
              <div className="font-head text-sm font-bold text-dark-navy">{cards.title(r)}</div>
              <div className="mt-1 flex-1 text-xs text-mutedink">{cards.sub?.(r)}</div>
              <div className="mt-3 flex items-center justify-between gap-2">
                {r[cards.link] ? <a href={r[cards.link]} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 rounded-md bg-navy px-3 py-1.5 text-xs font-semibold text-white"><ExternalLink className="h-3.5 w-3.5" /> {cards.linkLabel || "Open"}</a> : <span />}
                {!readOnly && (meta.can.edit || meta.can.delete) && <div className="flex">{meta.can.edit && <button className="rounded p-1.5 text-navy hover:bg-navy/10" onClick={() => setModal({ row: r })}><Pencil className="h-4 w-4" /></button>}{meta.can.delete && <button className="rounded p-1.5 text-danger hover:bg-danger/10" onClick={() => remove(r)}><Trash2 className="h-4 w-4" /></button>}</div>}
              </div>
            </div>))}
        </div>
      ) : <Table columns={cols} rows={data.items} empty="No records found." />}
      <div className="mt-2 text-xs text-mutedink">{data.total} record(s)</div>

      {modal && <RecordForm meta={meta} entity={entity} row={modal.row} defaults={defaultValues} onClose={() => setModal(null)} onSaved={() => { setModal(null); load(); }} academic={academic} />}
    </div>
  );
}

export function RecordForm({ meta, entity, row, defaults, onClose, onSaved, academic }) {
  const [v, setV] = useState(() => ({ ...defaults, ...(row || {}) }));
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const names = meta.fields.map((f) => f.name);
  const want = { programme: names.includes("programme_id") || meta.scope === "subject", semester: names.includes("semester_id") || meta.scope === "subject", subject: names.includes("subject_id") };
  const required = { programme: true, semester: true, subject: meta.fields.find((f) => f.name === "subject_id")?.required !== false };
  const rest = meta.fields.filter((f) => !(academic && HELPER.includes(f.name)));
  const save = async () => {
    setBusy(true); setErrors({});
    const body = Object.fromEntries(meta.fields.map((f) => [f.name, v[f.name]]).filter(([, x]) => x !== undefined && x !== null));
    try {
      if (row) await api.put(`/${entity}/edit`, { id: row.id, ...body }); else await api.post(`/${entity}/add`, body);
      toast.success(`${meta.title} saved`); onSaved();
    } catch (e) { setErrors(e.response?.data?.data && typeof e.response.data.data === "object" ? e.response.data.data : {}); toast.error(formatApiError(e)); } finally { setBusy(false); }
  };
  return (
    <Modal title={`${row ? "Edit" : "Add"} ${meta.title.toLowerCase()}`} onClose={onClose} wide>
      <div className="grid gap-3 sm:grid-cols-2">
        {academic && <AcademicFields values={v} onChange={(p) => setV((x) => ({ ...x, ...p }))} errors={errors} want={want} required={required} />}
        {rest.map((f) => <div key={f.name} className={f.type === "text" ? "sm:col-span-2" : ""}><FieldInput field={f} value={v[f.name]} error={errors[f.name]} onChange={(x) => setV((s) => ({ ...s, [f.name]: x }))} /></div>)}
      </div>
      <div className="mt-5 flex justify-end gap-2"><Btn kind="ghost" onClick={onClose}>Cancel</Btn><Btn kind="orange" disabled={busy} onClick={save}>{busy ? "Saving…" : "Save"}</Btn></div>
    </Modal>
  );
}

export const col = (key, label, render) => ({ key, label, render });
export const subjectCol = col("subject_name", "Subject", (r) => <div><div className="font-medium">{r.subject_name || "—"}</div><div className="text-[11px] text-mutedink">{r.programme_code} · Sem {r.semester_no}</div></div>);
export const statusCol = col("status", "Status", (r) => <Pill text={r.status} />);
