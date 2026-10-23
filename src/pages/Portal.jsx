import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LOGO } from "../mock";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useToast } from "../hooks/use-toast";
import {
  GraduationCap, FileCheck2, Video, Lock, Loader2, LogOut, CheckCircle2,
  BookOpen, CalendarClock, Download, Radio, Clock, TrendingUp, ClipboardList, Play,
} from "lucide-react";

const configs = {
  student: {
    key: "student",
    icon: GraduationCap,
    title: "Student LMS Login",
    tag: "Learning Management System",
    subtitle: "Access your courses, assignments, grades and learning progress.",
    idLabel: "Enrollment No / Email",
    idPh: "e.g. ODU2025001",
    features: ["Course materials & recorded lectures", "Assignment submission & grades", "Attendance & progress tracking", "Digital library access"],
  },
  exam: {
    key: "exam",
    icon: FileCheck2,
    title: "Examination Portal",
    tag: "Exams & Results",
    subtitle: "View your exam schedule, download hall tickets and check results.",
    idLabel: "Roll Number",
    idPh: "e.g. ODU-EX-24001",
    features: ["Exam time-table & guidelines", "Download admit card / hall ticket", "Results & grade cards", "Re-evaluation requests"],
  },
  online: {
    key: "online",
    icon: Video,
    title: "Online Class Portal",
    tag: "Live & Recorded Classes",
    subtitle: "Join live interactive classes and revisit recorded sessions anytime.",
    idLabel: "Student ID",
    idPh: "e.g. ODU2025001",
    features: ["Live interactive lectures", "Recorded class library", "Class schedule & reminders", "Doubt-clearing sessions"],
  },
};

export default function Portal({ type = "student" }) {
  const cfg = configs[type] || configs.student;
  const Ic = cfg.icon;
  const { toast } = useToast();
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => { setLogged(false); setUid(""); setPwd(""); window.scrollTo(0, 0); }, [type]);

  const submit = (e) => {
    e.preventDefault();
    if (!uid || !pwd) { toast({ title: "Please enter your credentials", variant: "destructive" }); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setLogged(true); toast({ title: "Welcome back!", description: `Signed in to ${cfg.title}.` }); }, 1000);
  };

  if (logged) return <Dashboard cfg={cfg} uid={uid} onLogout={() => setLogged(false)} />;

  return (
    <section className="min-h-[calc(100vh-120px)] grid lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 bg-brand text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "26px 26px" }} />
        <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-orangeAccent/25 blur-3xl" />
        <Link to="/" className="relative z-10"><img src={LOGO} alt="logo" className="h-14 bg-white rounded-xl p-2 w-fit" /></Link>
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 text-orangeAccent font-bold text-sm uppercase tracking-widest"><Ic className="w-5 h-5" /> {cfg.tag}</span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight">{cfg.title}</h1>
          <p className="mt-3 text-white/80 max-w-md">{cfg.subtitle}</p>
          <ul className="mt-7 space-y-3">
            {cfg.features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-white/90"><CheckCircle2 className="w-5 h-5 text-orangeAccent shrink-0" /> {f}</li>
            ))}
          </ul>
        </div>
        <p className="relative z-10 text-xs text-white/50">Demo portal · use any ID & password to sign in.</p>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-slate-50">
        <div className="w-full max-w-md bg-white rounded-2xl border border-slate-100 shadow-xl p-8">
          <div className="lg:hidden mb-6"><img src={LOGO} alt="logo" className="h-11" /></div>
          <span className="w-12 h-12 rounded-xl bg-brand-soft text-brand flex items-center justify-center"><Ic className="w-6 h-6" /></span>
          <h2 className="mt-4 text-2xl font-extrabold text-ink">{cfg.title}</h2>
          <p className="text-sm text-ink-soft mt-1">Sign in to continue to your portal.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="uid">{cfg.idLabel}</Label>
              <Input id="uid" value={uid} onChange={(e) => setUid(e.target.value)} placeholder={cfg.idPh} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="pwd">Password</Label>
              <Input id="pwd" type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="Enter your password" />
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-ink-soft"><input type="checkbox" className="accent-[#17356b]" /> Remember me</label>
              <button type="button" className="text-brand font-semibold hover:underline">Forgot password?</button>
            </div>
            <Button type="submit" disabled={loading} className="btn-primary w-full rounded-full h-11 font-semibold">
              {loading ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Signing in...</>) : (<><Lock className="w-4 h-4 mr-2" /> Sign In</>)}
            </Button>
          </form>
          <p className="mt-5 text-center text-sm text-ink-soft">New to Orbit? <Link to="/admissions" className="text-brand font-semibold hover:underline">Apply for admission</Link></p>
        </div>
      </div>
    </section>
  );
}

function Dashboard({ cfg, uid, onLogout }) {
  return (
    <section className="min-h-[calc(100vh-120px)] bg-slate-50 py-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 bg-brand text-white rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center"><cfg.icon className="w-6 h-6 text-orangeAccent" /></span>
            <div>
              <div className="text-sm text-white/70">{cfg.tag}</div>
              <h1 className="text-xl font-extrabold">Welcome, {uid || "Student"}</h1>
            </div>
          </div>
          <Button onClick={onLogout} variant="outline" className="rounded-full bg-transparent border-white/40 text-white hover:bg-white hover:text-brand"><LogOut className="w-4 h-4 mr-1" /> Logout</Button>
        </div>

        <div className="mt-6">
          {cfg.key === "student" && <StudentDash />}
          {cfg.key === "exam" && <ExamDash />}
          {cfg.key === "online" && <OnlineDash />}
        </div>
      </div>
    </section>
  );
}

const Stat = ({ icon: I, v, l, c = "#17356b" }) => (
  <div className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-3">
    <span className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${c}15`, color: c }}><I className="w-5 h-5" /></span>
    <div><div className="text-xl font-extrabold text-ink">{v}</div><div className="text-xs text-ink-soft">{l}</div></div>
  </div>
);

function StudentDash() {
  const courses = [
    { name: "Business Analytics", prog: 78 },
    { name: "Financial Management", prog: 54 },
    { name: "Marketing Strategy", prog: 91 },
  ];
  return (
    <>
      <div className="grid sm:grid-cols-4 gap-4">
        <Stat icon={BookOpen} v="6" l="Enrolled Courses" />
        <Stat icon={TrendingUp} v="8.4" l="Current CGPA" c="#16a34a" />
        <Stat icon={ClipboardList} v="3" l="Pending Assignments" c="#ea580c" />
        <Stat icon={CheckCircle2} v="86%" l="Attendance" c="#7c3aed" />
      </div>
      <div className="mt-6 bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-ink mb-4">My Courses</h3>
        <div className="space-y-4">
          {courses.map((c) => (
            <div key={c.name}>
              <div className="flex justify-between text-sm mb-1"><span className="font-medium text-ink">{c.name}</span><span className="text-ink-soft">{c.prog}%</span></div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden"><div className="h-full bg-brand rounded-full" style={{ width: `${c.prog}%` }} /></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ExamDash() {
  const exams = [
    { sub: "Business Analytics", date: "18 Sep 2025", time: "10:00 AM", status: "Scheduled" },
    { sub: "Financial Management", date: "21 Sep 2025", time: "02:00 PM", status: "Scheduled" },
    { sub: "Marketing Strategy", date: "25 Sep 2025", time: "10:00 AM", status: "Scheduled" },
  ];
  return (
    <>
      <div className="grid sm:grid-cols-3 gap-4">
        <Stat icon={CalendarClock} v="3" l="Upcoming Exams" />
        <Stat icon={FileCheck2} v="Ready" l="Hall Ticket" c="#16a34a" />
        <Stat icon={TrendingUp} v="A" l="Last Result Grade" c="#ea580c" />
      </div>
      <div className="mt-6 bg-white rounded-2xl border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-ink">Exam Schedule</h3>
          <Button className="btn-orange rounded-full h-9 px-4 text-sm font-semibold"><Download className="w-4 h-4 mr-1" /> Hall Ticket</Button>
        </div>
        <div className="divide-y divide-slate-100">
          {exams.map((e) => (
            <div key={e.sub} className="flex items-center justify-between py-3">
              <div><div className="font-semibold text-ink">{e.sub}</div><div className="text-sm text-ink-soft flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {e.date} · {e.time}</div></div>
              <span className="text-xs font-semibold text-green-700 bg-green-50 rounded-full px-3 py-1">{e.status}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function OnlineDash() {
  const classes = [
    { sub: "Business Analytics — Live Now", teacher: "Prof. R. Nair", live: true },
    { sub: "Financial Management", teacher: "Dr. S. Kapoor", time: "Today · 04:00 PM" },
    { sub: "Marketing Strategy", teacher: "Prof. A. Desai", time: "Tomorrow · 11:00 AM" },
  ];
  return (
    <>
      <div className="grid sm:grid-cols-3 gap-4">
        <Stat icon={Radio} v="1" l="Live Now" c="#dc2626" />
        <Stat icon={CalendarClock} v="4" l="Today's Classes" />
        <Stat icon={Video} v="120+" l="Recorded Lectures" c="#7c3aed" />
      </div>
      <div className="mt-6 bg-white rounded-2xl border border-slate-100 p-6">
        <h3 className="font-bold text-ink mb-4">Your Classes</h3>
        <div className="space-y-3">
          {classes.map((c) => (
            <div key={c.sub} className="flex items-center justify-between bg-slate-50 rounded-xl p-4">
              <div>
                <div className="font-semibold text-ink flex items-center gap-2">{c.live && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}{c.sub}</div>
                <div className="text-sm text-ink-soft">{c.teacher}{c.time ? ` · ${c.time}` : ""}</div>
              </div>
              <Button className={`rounded-full h-9 px-4 text-sm font-semibold ${c.live ? "btn-orange" : "btn-primary"}`}><Play className="w-4 h-4 mr-1" /> {c.live ? "Join Now" : "Details"}</Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
