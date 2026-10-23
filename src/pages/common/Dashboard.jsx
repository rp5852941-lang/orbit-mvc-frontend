import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Video, Library, ClipboardList, CalendarCheck, Users, GraduationCap, Layers, FileStack, Radio, LifeBuoy, ClipboardCheck, ShieldCheck, PencilRuler } from "lucide-react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Loader, PageHeader, StatCard } from "@/components/common/Bits";
import { Card, Empty, Avatar } from "@/components/lms/ui";
import { fmtDateTime, fmtDate } from "@/lib/lms";

export default function Dashboard() {
  const { user } = useAuth();
  const [d, setD] = useState(null);
  const nav = useNavigate();
  useEffect(() => { api.get("/dashboard/summary").then((r) => setD(r.data)).catch(() => setD({})); }, []);
  if (!d) return <Loader />;
  const S = (icon, label, value, accent, to) => <StatCard key={label} icon={icon} label={label} value={value ?? "—"} accent={accent} onClick={to ? () => nav(to) : undefined} />;

  if (user.role === "student") {
    const en = d.enrollment;
    if (!en) return <Empty text="No programme has been assigned to your account yet. Please contact the administrator." />;
    return (
      <div>
        <PageHeader title={`Welcome, ${user.name.split(" ")[0]}`} subtitle={`${en.programme_name} · ${en.semester_name} · Session ${en.session_name}`} />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {S(BookOpen, "Subjects", d.subjects, "navy", "/student/courses")}{S(CalendarCheck, "Attendance", d.attendance == null ? "—" : `${d.attendance}%`, "success", "/student/attendance")}
          {S(ClipboardList, "Assignments pending", d.assignments_pending, "orange", "/student/assignments")}{S(PencilRuler, "Upcoming exams", d.exams_upcoming, "blue", "/student/assessments")}
          {S(Video, "Video lectures", d.videos, "navy", "/student/videos")}{S(Library, "E-Books", d.ebooks, "blue", "/student/ebooks")}{S(FileStack, "Study material", d.study_materials, "orange", "/student/materials")}{S(Radio, "Notifications", d.unread_notifications, "danger", "/student/notifications")}
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <Card title="Live classes">{d.live_today.length ? d.live_today.map((c) => <div key={c.id} className="flex items-center justify-between border-b border-navy/5 py-2 text-sm last:border-0"><div><div className="font-medium">{c.topic}</div><div className="text-xs text-mutedink">{c.subject_name} · {fmtDateTime(c.scheduled_at)}</div></div>{c.meeting_link && <a className="font-semibold text-orange" href={c.meeting_link} target="_blank" rel="noreferrer">Join</a>}</div>) : <Empty text="No upcoming classes." />}</Card>
          <Card title="Announcements">{d.announcements.length ? d.announcements.map((a) => <div key={a.id} className="border-b border-navy/5 py-2 text-sm last:border-0"><div className="font-medium">{a.title}</div><div className="text-xs text-mutedink">{a.category} · {fmtDate(a.publish_date)}</div></div>) : <Empty text="No announcements." />}</Card>
        </div>
      </div>
    );
  }
  if (user.role === "faculty") return (
    <div>
      <PageHeader title={`Welcome, ${user.name.split(" ")[0]}`} subtitle="Your teaching overview" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {S(BookOpen, "My subjects", d.subjects, "navy", "/faculty/courses")}{S(Users, "My students", d.students, "blue", "/faculty/students")}{S(Video, "My videos", d.videos, "orange", "/faculty/recorded")}
        {S(ClipboardCheck, "Submissions to grade", d.pending_submissions, "danger", "/faculty/submissions")}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card title="Upcoming classes">{d.upcoming_classes?.length ? d.upcoming_classes.map((c) => <div key={c.id} className="border-b border-navy/5 py-2 text-sm last:border-0"><div className="font-medium">{c.topic}</div><div className="text-xs text-mutedink">{c.subject_name} · {fmtDateTime(c.scheduled_at)}</div></div>) : <Empty text="No upcoming classes." />}</Card>
        <Card title="Subjects assigned to me">{d.my_subjects?.length ? d.my_subjects.map((s) => <div key={s.id} className="flex justify-between border-b border-navy/5 py-2 text-sm last:border-0"><span className="font-medium">{s.name}</span><span className="text-xs text-mutedink">{s.programme_code} · Sem {s.semester_no}</span></div>) : <Empty text="The admin has not assigned any subject to you yet." />}</Card>
      </div>
    </div>
  );
  return (
    <div>
      <PageHeader title="Admin Dashboard" subtitle="Everything at a glance" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {S(GraduationCap, "Students", d.students, "navy", "/admin/students")}{S(Users, "Faculty", d.faculty, "blue", "/admin/faculty")}
        {user.is_super_admin ? S(ShieldCheck, "Admins", d.admins, "orange", "/admin/admins") : S(Layers, "Programmes", d.programmes, "orange", "/admin/programmes")}
        {S(BookOpen, "Subjects", d.subjects, "navy", "/admin/subjects")}{S(Video, "Videos", d.videos, "blue", "/admin/videos")}{S(Library, "E-Books", d.ebooks, "orange", "/admin/ebooks")}
        {S(LifeBuoy, "Open tickets", d.open_tickets, "danger", "/admin/support")}{S(ClipboardCheck, "Marks awaiting approval", d.marks_waiting, "warning", "/admin/approvals")}
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card title="Students per programme">{d.by_programme?.map((p) => <div key={p.code} className="flex items-center justify-between border-b border-navy/5 py-2 text-sm last:border-0"><span className="font-medium">{p.code} <span className="text-xs text-mutedink">{p.name}</span></span><b>{p.students}</b></div>)}</Card>
        <Card title="Recent applications">{d.recent_applications?.length ? d.recent_applications.map((a) => <div key={a.id} className="flex items-center gap-3 border-b border-navy/5 py-2 text-sm last:border-0"><Avatar src={a.photo} name={a.name} /><div className="flex-1"><div className="font-medium">{a.name}</div><div className="text-xs text-mutedink">{a.programme_code}</div></div><div className="text-xs text-mutedink">{fmtDate(a.submitted_at)}</div></div>) : <Empty text="No applications yet." />}</Card>
      </div>
    </div>
  );
}
