import React, { useEffect, useState } from "react";
import { LOGO } from "../mock";
import { fetchApplications, fetchContacts } from "../api";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "../components/ui/table";
import { Lock, GraduationCap, Mail, RefreshCw, Loader2, Inbox } from "lucide-react";

const PASSCODE = "orbit2025";

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [tab, setTab] = useState("applications");
  const [apps, setApps] = useState([]);
  const [msgs, setMsgs] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = () => {
    setLoading(true);
    Promise.all([fetchApplications(), fetchContacts()])
      .then(([a, c]) => { setApps(a.data || []); setMsgs(c.data || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { if (authed) load(); }, [authed]);

  const fmt = (d) => (d ? new Date(d).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "-");

  if (!authed) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6 bg-slate-50">
        <div className="w-full max-w-sm bg-white rounded-2xl border border-slate-100 shadow-xl p-8 text-center">
          <img src={LOGO} alt="logo" className="h-11 mx-auto" />
          <div className="mt-5 w-12 h-12 rounded-full bg-brand-soft text-brand flex items-center justify-center mx-auto"><Lock className="w-6 h-6" /></div>
          <h1 className="mt-4 text-xl font-extrabold text-ink">Admin Access</h1>
          <p className="text-sm text-ink-soft mt-1">Enter the passcode to view submissions.</p>
          <form onSubmit={(e) => { e.preventDefault(); code === PASSCODE ? setAuthed(true) : setErr("Incorrect passcode"); }} className="mt-6 space-y-3 text-left">
            <Label htmlFor="pc">Passcode</Label>
            <Input id="pc" type="password" value={code} onChange={(e) => { setCode(e.target.value); setErr(""); }} placeholder="Enter passcode" />
            {err && <p className="text-sm text-red-600">{err}</p>}
            <Button type="submit" className="btn-orange w-full rounded-full h-11 font-semibold">Unlock Dashboard</Button>
          </form>
          <p className="text-[11px] text-ink-soft mt-4">Demo passcode: <b>orbit2025</b></p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-slate-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-ink">Admissions Dashboard</h1>
            <p className="text-sm text-ink-soft">Applications and contact enquiries from the website.</p>
          </div>
          <Button onClick={load} variant="outline" className="rounded-full border-ink/20 text-ink hover:bg-brand hover:text-white hover:border-brand">
            {loading ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-1" />} Refresh
          </Button>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <StatCard icon={GraduationCap} label="Total Applications" value={apps.length} active={tab === "applications"} onClick={() => setTab("applications")} />
          <StatCard icon={Mail} label="Contact Messages" value={msgs.length} active={tab === "messages"} onClick={() => setTab("messages")} />
        </div>

        <div className="mt-6 bg-white rounded-2xl border border-slate-100 overflow-hidden">
          {tab === "applications" ? (
            apps.length === 0 ? <Empty /> : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Phone</TableHead>
                    <TableHead>Programme</TableHead><TableHead>State</TableHead><TableHead>Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apps.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell className="font-semibold text-ink">{a.name}</TableCell>
                      <TableCell>{a.email}</TableCell>
                      <TableCell>{a.phone}</TableCell>
                      <TableCell><span className="text-xs font-semibold bg-brand-soft text-brand rounded-full px-2.5 py-1">{a.programme}</span></TableCell>
                      <TableCell>{a.state || "-"}</TableCell>
                      <TableCell className="text-ink-soft text-sm">{fmt(a.created_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )
          ) : (
            msgs.length === 0 ? <Empty /> : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Phone</TableHead>
                    <TableHead>Message</TableHead><TableHead>Submitted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {msgs.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell className="font-semibold text-ink">{m.name}</TableCell>
                      <TableCell>{m.email}</TableCell>
                      <TableCell>{m.phone || "-"}</TableCell>
                      <TableCell className="max-w-sm text-sm text-ink-soft">{m.message}</TableCell>
                      <TableCell className="text-ink-soft text-sm">{fmt(m.created_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Ic, label, value, active, onClick }) {
  return (
    <button onClick={onClick} className={`text-left rounded-2xl border p-5 flex items-center gap-4 transition-all ${active ? "bg-brand text-white border-brand" : "bg-white border-slate-100 hover:border-brand"}`}>
      <span className={`w-12 h-12 rounded-xl flex items-center justify-center ${active ? "bg-white/15 text-white" : "bg-brand-soft text-brand"}`}><Ic className="w-6 h-6" /></span>
      <div>
        <div className="text-2xl font-extrabold">{value}</div>
        <div className={`text-sm ${active ? "text-white/80" : "text-ink-soft"}`}>{label}</div>
      </div>
    </button>
  );
}

function Empty() {
  return (
    <div className="py-16 text-center text-ink-soft">
      <Inbox className="w-10 h-10 mx-auto text-slate-300" />
      <p className="mt-3 font-medium">No submissions yet.</p>
    </div>
  );
}
