import React from "react";
import ResourcePage, { col, subjectCol, statusCol } from "@/components/lms/ResourcePage";
import { Pill } from "@/components/lms/ui";
import { fmtDate, fmtDateTime, labelize } from "@/lib/lms";

// Every list page of the three panels. `manage` = faculty/admin (table + Add/Edit/Delete), otherwise the student card view.
// What a person may add/edit/delete is decided by the API (permissions), not here.
const pub = ["draft", "published", "archived"];
const badge = (t, k) => <span key={k || t} className="rounded-full bg-navy/5 px-2 py-0.5 text-[10px] font-semibold text-navy">{t}</span>;
const where = (r) => `${r.programme_code} · Sem ${r.semester_no}${r.subject_name ? ` · ${r.subject_name}` : ""}`;

export const VideosPage = ({ manage, title = "Video Lectures" }) => manage
  ? <ResourcePage entity="videos" title={title} subtitle="Upload and manage recorded lectures." filterStatus={pub} columns={[col("title", "Title", (r) => <div className="font-medium">{r.title}</div>), subjectCol, col("duration_seconds", "Duration", (r) => `${Math.round(r.duration_seconds / 60)} min`), statusCol]} />
  : <ResourcePage entity="videos" title={title} subtitle="Recorded lectures of your programme and semester." readOnly cards={{ title: (r) => r.title, sub: (r) => `${r.subject_name} · ${Math.round(r.duration_seconds / 60)} min`, link: "video_url", linkLabel: "Watch", badges: (r) => badge(r.subject_name) }} />;

export const EbooksPage = ({ manage, title = "E-Books" }) => manage
  ? <ResourcePage entity="ebooks" title={title} subtitle="Books for a programme and semester (a subject is optional)." filterStatus={pub} columns={[col("title", "Title", (r) => <div><div className="font-medium">{r.title}</div><div className="text-[11px] text-mutedink">{r.author}</div></div>), col("programme_code", "Programme", (r) => `${r.programme_code} · Sem ${r.semester_no}`), col("subject_name", "Subject"), col("category", "Category"), statusCol]} />
  : <ResourcePage entity="ebooks" title={title} subtitle="Books for your programme and semester." readOnly cards={{ title: (r) => r.title, sub: (r) => `${r.author} · ${r.pages} pages`, link: "file_url", linkLabel: "Read", badges: (r) => [badge(r.category, "c"), r.subject_name && badge(r.subject_name, "s")] }} />;

export const MaterialsPage = ({ manage, title = "Study Material" }) => manage
  ? <ResourcePage entity="studyMaterials" title={title} subtitle="Notes, slides and practice sheets." filterStatus={pub} columns={[col("title", "Title"), subjectCol, col("material_type", "Type", (r) => labelize(r.material_type)), statusCol]} />
  : <ResourcePage entity="studyMaterials" title={title} subtitle="Notes and files for your semester." readOnly cards={{ title: (r) => r.title, sub: (r) => r.subject_name, link: "file_url", linkLabel: "Download", badges: (r) => badge(labelize(r.material_type)) }} />;

export const LivePage = ({ manage, title = "Live Classes" }) => <ResourcePage entity="liveClasses" title={title} subtitle="Scheduled online classes." readOnly={!manage} filterStatus={["scheduled", "live", "completed", "cancelled"]}
  columns={[col("topic", "Topic", (r) => <div className="font-medium">{r.topic}</div>), subjectCol, col("scheduled_at", "When", (r) => fmtDateTime(r.scheduled_at)), col("duration_minutes", "Minutes"),
    col("meeting_link", "Join", (r) => r.status !== "cancelled" && r.meeting_link ? <a className="font-semibold text-orange" href={r.meeting_link} target="_blank" rel="noreferrer">Join</a> : "—"), statusCol]} />;

export const AssignmentsManage = ({ title = "Assignments" }) => <ResourcePage entity="assignments" title={title} subtitle="Create assignments for the subjects you teach." filterStatus={["draft", "active", "closed"]}
  columns={[col("title", "Title", (r) => <div className="font-medium">{r.title}</div>), subjectCol, col("due_date", "Due", (r) => fmtDate(r.due_date)), col("max_marks", "Marks"), statusCol]} />;

export const ExamsPage = ({ manage, title = "Exams" }) => <ResourcePage entity="exams" title={title} subtitle={manage ? "Schedule and publish exams." : "Your upcoming and past assessments."} readOnly={!manage} filterStatus={["draft", "published", "closed"]}
  columns={[col("title", "Exam", (r) => <div className="font-medium">{r.title}</div>), subjectCol, col("exam_type", "Type", (r) => labelize(r.exam_type)), col("exam_date", "Date", (r) => `${fmtDate(r.exam_date)} ${String(r.start_time).slice(0, 5)}`),
    col("duration_minutes", "Minutes"), col("total_marks", "Marks", (r) => `${r.total_marks} (pass ${r.passing_marks})`), statusCol]} />;

export const SubjectsPage = ({ manage, title = "My Courses" }) => <ResourcePage entity="subjects" title={title} subtitle={manage ? "The subject catalogue of every programme and semester." : "Subjects of your programme and current semester."} readOnly={!manage} filterStatus={["active", "inactive"]}
  columns={[col("code", "Code"), col("name", "Subject", (r) => <div className="font-medium">{r.name}</div>), col("programme_code", "Programme", (r) => `${r.programme_code} · Sem ${r.semester_no}`), col("credits", "Credits"), col("subject_type", "Type", (r) => labelize(r.subject_type)), statusCol]} />;

export const SyllabusPage = () => <ResourcePage entity="syllabus" title="Syllabus" subtitle="Units / modules of the subjects you teach." columns={[col("sort_order", "#"), col("title", "Module / unit", (r) => <div className="font-medium">{r.title}</div>), subjectCol]} />;
export const QuestionBankPage = () => <ResourcePage entity="questionBank" title="Question Bank" subtitle="Questions you can reuse in exams." columns={[col("question_text", "Question", (r) => <div className="max-w-md truncate">{r.question_text}</div>), subjectCol, col("question_type", "Type", (r) => r.question_type.toUpperCase()), col("difficulty", "Level", (r) => labelize(r.difficulty)), col("marks", "Marks")]} />;

export const AnnouncementsPage = ({ manage, title = "Announcements" }) => <ResourcePage entity="announcements" title={title} subtitle="Notices for students and faculty." readOnly={!manage} hideFilters={!manage} filterStatus={pub}
  columns={[col("title", "Title", (r) => <div><div className="font-medium">{r.title}</div><div className="max-w-md truncate text-[11px] text-mutedink">{r.body}</div></div>), col("category", "Category"), col("audience", "For", (r) => labelize(r.audience)), col("publish_date", "Date", (r) => fmtDate(r.publish_date)), statusCol]} />;

export const SupportPage = ({ manage, title = "Support Tickets" }) => <ResourcePage entity="supportTickets" title={title} subtitle={manage ? "Tickets raised by students." : "Raise a problem and track its status."} filterStatus={["open", "in_progress", "resolved", "closed"]} addLabel="Raise ticket"
  defaultValues={{ priority: "medium" }} columns={[...(manage ? [col("user_name", "Raised by")] : []), col("subject", "Subject", (r) => <div className="font-medium">{r.subject}</div>), col("category", "Category"), col("priority", "Priority", (r) => <Pill text={r.priority} tone={r.priority === "urgent" || r.priority === "high" ? "r" : "x"} />), statusCol]} />;

export const FeesManage = () => <ResourcePage entity="feeStructures" title="Fee Structure" subtitle="Fees of every programme." columns={[col("programme_code", "Programme"), col("fee_type", "Fee"), col("amount", "Amount", (r) => `₹ ${Number(r.amount).toLocaleString("en-IN")}`), col("due_date", "Due", (r) => fmtDate(r.due_date))]} />;
export const PaymentsManage = () => <ResourcePage entity="payments" title="Payments" subtitle="Record and track fee payments." hideFilters={false} columns={[col("student_name", "Student"), col("amount", "Amount", (r) => `₹ ${Number(r.amount).toLocaleString("en-IN")}`), col("payment_mode", "Mode", (r) => labelize(r.payment_mode)), col("receipt_no", "Receipt"), statusCol]} />;
export const CertificatesPage = ({ manage, filterType, title = "Certificates" }) => <ResourcePage entity="certificates" title={title} subtitle={manage ? "Issue certificates and degrees." : "Your certificates."} readOnly={!manage} hideFilters={!manage}
  columns={[...(manage ? [col("student_name", "Student")] : []), col("title", "Title", (r) => <div className="font-medium">{r.title}</div>), col("cert_type", "Type", (r) => labelize(r.cert_type)), col("certificate_no", "No."), col("issue_date", "Issued", (r) => fmtDate(r.issue_date)), statusCol]} />;
export const DepartmentsPage = () => <ResourcePage entity="departments" title="Departments" subtitle="Departments used for programmes and faculty." filterStatus={["active", "inactive"]} columns={[col("code", "Code"), col("name", "Name", (r) => <div className="font-medium">{r.name}</div>), col("description", "Description"), statusCol]} />;
export const ProgrammesPage = () => <ResourcePage entity="programmes" title="Programmes" subtitle="Add a programme (semesters are created automatically), then add its subjects, videos and e-books." filterStatus={["active", "inactive"]}
  columns={[col("code", "Code"), col("name", "Programme", (r) => <div><div className="font-medium">{r.name}</div><div className="text-[11px] text-mutedink">{r.department_name}</div></div>), col("level", "Level", (r) => labelize(r.level)), col("total_semesters", "Semesters"), col("fee_per_year", "Fee / year", (r) => `₹ ${Number(r.fee_per_year).toLocaleString("en-IN")}`), statusCol]} />;
