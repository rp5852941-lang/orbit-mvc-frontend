import React, { useEffect } from "react";
import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import { ApplyProvider } from "./context/ApplyContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/toaster";

import Home from "./pages/Home";
import About from "./pages/About";
import Programmes from "./pages/Programmes";
import ProgramDetail from "./pages/ProgramDetail";
import Admissions from "./pages/Admissions";
import Placements from "./pages/Placements";
import Contact from "./pages/Contact";
import Portal from "./pages/Portal";
import Admin from "./pages/Admin";
import ChancellorMessage from "./pages/ChancellorMessage";
import RegistrarMessage from "./pages/RegistrarMessage";
import DirectorMessage from "./pages/DirectorMessage";
import ViceChancellorMessage from "./pages/ViceChancellorMessage";
import CourseDetail from "./pages/CourseDetail";
import InfoPage from "./pages/InfoPage";

// ---- LMS: Login, Apply Now and the three panels (view of the MVC project) ----
import Login from "@/pages/auth/Login";
import ApplyNow from "@/pages/apply/ApplyNow";
import LmsLayout from "@/components/lms/LmsLayout";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute, PermissionGuard } from "@/components/auth/Guards";
import { Toaster as SonnerToaster } from "sonner";
import LmsScope from "./components/LmsScope";
import Dashboard from "@/pages/common/Dashboard";
import AttendanceMark from "@/pages/common/AttendanceMark";
import MarksEntry from "@/pages/common/MarksEntry";
import * as R from "@/pages/common/Resources";
import * as ST from "@/pages/student/StudentPages";
import * as FA from "@/pages/faculty/FacultyPages";
import * as AD from "@/pages/admin/AdminPages";

function ScrollTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const section = document.querySelector(hash);

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);

      return () => clearTimeout(timer);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname, hash]);

  return null;
}

// Public Orbit website pages: header + page + footer
function SiteLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

// A page opens only when its module's "view" checkbox is ON for the signed-in user (the API checks it again).
const G = (module, element) => <PermissionGuard permission={`${module}.view`}>{element}</PermissionGuard>;

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.REACT_APP_BASENAME ?? "/website/orbit_new_website"}>
        <AuthProvider>
          <ApplyProvider>
            <ScrollTop />

            <Routes>
              {/* ---------- Public website ---------- */}
              <Route element={<SiteLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/programmes" element={<Programmes />} />
                <Route path="/programmes/:slug" element={<ProgramDetail />} />
                <Route path="/admissions" element={<Admissions />} />
                <Route path="/placements" element={<Placements />} />
                <Route path="/contact" element={<Contact />} />
                {/* old passcode enquiries viewer (was /admin; /admin is now the LMS admin) */}
                <Route path="/enquiries" element={<Admin />} />
                <Route path="/chancellor" element={<ChancellorMessage />} />
                <Route
                  path="/vice-chancellor"
                  element={<ViceChancellorMessage />}
                />
                <Route path="/registrar" element={<RegistrarMessage />} />
                <Route path="/director" element={<DirectorMessage />} />
                <Route path="/course/:slug" element={<CourseDetail />} />
                <Route path="/p/:slug" element={<InfoPage />} />
                <Route path="/student-login" element={<Portal type="student" />} />
                <Route path="/exam-portal" element={<Portal type="exam" />} />
                <Route path="/online-class" element={<Portal type="online" />} />
              </Route>

              {/* ---------- LMS: Login / Apply Now / panels ---------- */}
              <Route element={<LmsScope />}>
                <Route path="/login" element={<Login />} />
                <Route path="/apply" element={<ApplyNow />} />
                <Route path="/apply/:code" element={<ApplyNow />} />

                <Route path="/student" element={<ProtectedRoute role="student"><LmsLayout role="student" /></ProtectedRoute>}>
                  <Route index element={G("student.dashboard", <Dashboard />)} />
                  <Route path="programme" element={G("student.programme", <ST.MyProgramme />)} />
                  <Route path="courses" element={G("student.courses", <R.SubjectsPage />)} />
                  <Route path="live" element={G("student.live_classes", <R.LivePage />)} />
                  <Route path="videos" element={G("student.videos", <R.VideosPage />)} />
                  <Route path="ebooks" element={G("student.ebooks", <R.EbooksPage />)} />
                  <Route path="materials" element={G("student.study_material", <R.MaterialsPage />)} />
                  <Route path="assignments" element={G("student.assignments", <ST.Assignments />)} />
                  <Route path="assessments" element={G("student.exams", <R.ExamsPage title="Assessments & Exams" />)} />
                  <Route path="attendance" element={G("student.attendance", <ST.Attendance />)} />
                  <Route path="results" element={G("student.results", <ST.Results />)} />
                  <Route path="id-card" element={G("student.id_card", <ST.IdCard />)} />
                  <Route path="certificates" element={G("student.certificates", <R.CertificatesPage />)} />
                  <Route path="degree" element={G("student.degree", <R.CertificatesPage title="Digital Degree" />)} />
                  <Route path="fees" element={G("student.fees", <ST.Fees />)} />
                  <Route path="support" element={G("student.support", <R.SupportPage />)} />
                  <Route path="announcements" element={G("student.announcements", <R.AnnouncementsPage />)} />
                  <Route path="notifications" element={G("student.notifications", <ST.Notifications />)} />
                  <Route path="profile" element={G("student.profile", <ST.Profile />)} />
                </Route>

                <Route path="/faculty" element={<ProtectedRoute role="faculty"><LmsLayout role="faculty" /></ProtectedRoute>}>
                  <Route index element={G("faculty.dashboard", <Dashboard />)} />
                  <Route path="classes" element={G("faculty.classes", <R.LivePage manage title="My Classes" />)} />
                  <Route path="courses" element={G("faculty.courses", <R.SubjectsPage title="My Courses" />)} />
                  <Route path="students" element={G("faculty.students", <FA.FacultyStudents />)} />
                  <Route path="live" element={G("faculty.live_classes", <R.LivePage manage />)} />
                  <Route path="recorded" element={G("faculty.recorded_lectures", <R.VideosPage manage title="Recorded Lectures" />)} />
                  <Route path="materials" element={G("faculty.study_material", <R.MaterialsPage manage />)} />
                  <Route path="ebooks" element={G("faculty.ebooks", <R.EbooksPage manage />)} />
                  <Route path="syllabus" element={G("faculty.syllabus", <R.SyllabusPage />)} />
                  <Route path="assignments" element={G("faculty.assignments", <R.AssignmentsManage />)} />
                  <Route path="submissions" element={G("faculty.submissions", <FA.FacultySubmissions />)} />
                  <Route path="exams" element={G("faculty.exams", <R.ExamsPage manage title="Exam Management" />)} />
                  <Route path="question-bank" element={G("faculty.question_bank", <R.QuestionBankPage />)} />
                  <Route path="attendance" element={G("faculty.attendance", <AttendanceMark />)} />
                  <Route path="marks" element={G("faculty.marks", <MarksEntry />)} />
                  <Route path="announcements" element={G("faculty.announcements", <R.AnnouncementsPage manage />)} />
                  <Route path="profile" element={G("faculty.profile", <ST.Profile />)} />
                </Route>

                <Route path="/admin" element={<ProtectedRoute role="admin"><LmsLayout role="admin" /></ProtectedRoute>}>
                  <Route index element={G("admin.dashboard", <Dashboard />)} />
                  <Route path="applications" element={G("admin.applications", <AD.Applications />)} />
                  <Route path="students" element={G("admin.students", <AD.Students />)} />
                  <Route path="faculty" element={G("admin.faculty", <AD.Faculty />)} />
                  <Route path="admins" element={G("admin.admins", <AD.Admins />)} />
                  <Route path="programmes" element={G("admin.programmes", <R.ProgrammesPage />)} />
                  <Route path="departments" element={G("admin.departments", <R.DepartmentsPage />)} />
                  <Route path="subjects" element={G("admin.subjects", <R.SubjectsPage manage title="Subjects" />)} />
                  <Route path="live" element={G("admin.live_classes", <R.LivePage manage />)} />
                  <Route path="videos" element={G("admin.videos", <R.VideosPage manage />)} />
                  <Route path="ebooks" element={G("admin.ebooks", <R.EbooksPage manage />)} />
                  <Route path="materials" element={G("admin.study_material", <R.MaterialsPage manage />)} />
                  <Route path="assignments" element={G("admin.assignments", <R.AssignmentsManage />)} />
                  <Route path="exams" element={G("admin.exams", <R.ExamsPage manage />)} />
                  <Route path="attendance" element={G("admin.attendance", <AttendanceMark />)} />
                  <Route path="marks" element={G("admin.marks", <MarksEntry />)} />
                  <Route path="approvals" element={G("admin.approvals", <AD.Approvals />)} />
                  <Route path="fees" element={G("admin.fees", <AD.FeesPage />)} />
                  <Route path="certificates" element={G("admin.certificates", <R.CertificatesPage manage />)} />
                  <Route path="announcements" element={G("admin.announcements", <R.AnnouncementsPage manage />)} />
                  <Route path="support" element={G("admin.support", <R.SupportPage manage />)} />
                  <Route path="access" element={G("admin.access", <AD.Access />)} />
                  <Route path="activity" element={G("admin.activity_log", <AD.Activity />)} />
                  <Route path="settings" element={G("admin.settings", <AD.SettingsPage />)} />
                </Route>
              </Route>

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            <Toaster />
            <SonnerToaster position="top-right" richColors closeButton />
          </ApplyProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
