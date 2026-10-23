import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, GraduationCap, Presentation, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { OrbitLogo } from "@/components/common/Bits";
import { formatApiError } from "@/lib/api";
import { goToDash } from "@/lib/lms";
import { Btn, inputCls } from "@/components/lms/ui";

// Only three kinds of people can sign in: Student, Faculty, Admin.
const TABS = [{ role: "student", label: "Student", icon: GraduationCap }, { role: "faculty", label: "Faculty", icon: Presentation }, { role: "admin", label: "Admin", icon: ShieldCheck }];

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [role, setRole] = useState(["student", "faculty", "admin"].includes(params.get("role")) ? params.get("role") : "student");
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [show, setShow] = useState(false); const [busy, setBusy] = useState(false);

  useEffect(() => { if (user) navigate(goToDash(user), { replace: true }); }, [user, navigate]);
  const submit = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Enter your email and password.");
    setBusy(true);
    try { const u = await login(email.trim(), password, role); toast.success(`Welcome, ${u.name}`); const next = params.get("next"); navigate(next && next.startsWith(`/${u.role}`) ? next : goToDash(u), { replace: true }); }
    catch (err) { toast.error(formatApiError(err)); } finally { setBusy(false); }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas p-4">
      <div className="w-full max-w-md rounded-2xl border border-navy/10 bg-white p-7 shadow-lift">
        <Link to="/" className="mb-5 flex justify-center"><OrbitLogo /></Link>
        <h1 className="text-center font-head text-xl font-bold text-dark-navy">Sign in to your account</h1>
        <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl bg-canvas p-1">
          {TABS.map(({ role: r, label, icon: Icon }) => (
            <button key={r} type="button" onClick={() => setRole(r)} data-testid={`tab-${r}`}
              className={`flex flex-col items-center gap-1 rounded-lg py-2 text-xs font-semibold transition ${role === r ? "bg-navy text-white shadow-card" : "text-ink hover:bg-white"}`}><Icon className="h-4 w-4" />{label}</button>))}
        </div>
        <form onSubmit={submit} className="mt-5 space-y-3">
          <label className="block text-xs font-semibold text-ink">Email<input data-testid="login-email" type="email" autoComplete="username" className={`${inputCls} mt-1`} value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          <label className="block text-xs font-semibold text-ink">Password
            <div className="relative mt-1"><input data-testid="login-password" type={show ? "text" : "password"} autoComplete="current-password" className={`${inputCls} pr-10`} value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-2 top-2 text-mutedink">{show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}</button></div></label>
          <Btn kind="orange" className="w-full py-2.5" disabled={busy} onClick={submit} data-testid="login-submit">{busy ? "Signing in…" : `Sign in as ${TABS.find((t) => t.role === role).label}`}</Btn>
        </form>
        <p className="mt-5 text-center text-sm text-mutedink">New here? <Link to="/apply" className="font-semibold text-orange">Apply now</Link> — completing the form makes you a student.</p>
      </div>
    </div>
  );
}
