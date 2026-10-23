import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, GraduationCap, CalendarDays, BookOpen, Radio, Video, Library, FileStack,
  ClipboardList, FileCheck2, PencilRuler, CalendarCheck, ScrollText, TrendingUp, Award,
  IdCard, BadgeCheck, CreditCard, LifeBuoy, Megaphone, Bell, MessageSquare, MessagesSquare,
  UserCog, Settings, LogOut, Menu, Search, Users, Layers, FolderPlus, ClipboardCheck,
  FileText, Files, ShieldCheck, Building2, Wallet,
} from "lucide-react";
import { OrbitLogo } from "@/components/common/Bits";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { resolveImageUrl } from "./ui";

// Sidebar icons by name (the menu itself - which items, labels, order - comes from the API in user.nav).
const ICONS = {
  LayoutDashboard, GraduationCap, CalendarDays, BookOpen, Radio, Video, Library, FileStack, ClipboardList, FileCheck2, PencilRuler,
  CalendarCheck, ScrollText, TrendingUp, Award, IdCard, BadgeCheck, CreditCard, LifeBuoy, Megaphone, Bell, MessageSquare, MessagesSquare,
  UserCog, Settings, Users, Layers, FolderPlus, ClipboardCheck, FileText, Files, ShieldCheck, Building2, Wallet,
};
const TITLES = { student: "Student LMS", faculty: "Faculty Panel", admin: "Admin Panel" };

function SidebarContent({ role, base, onNav }) {
  const { sidebar: nav } = useAuth();      // built by the database view v_sidebar: only modules whose View checkbox is ON
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-navy/10 p-5"><Link to={base}><OrbitLogo /></Link></div>
      <nav className="flex-1 overflow-y-auto orbit-scroll-thin p-3">
        {nav.map((sec) => (
          <div key={sec.group} className="mb-4">
            <div className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-mutedink">{sec.group}</div>
            {sec.items.map(({ path, label, icon }) => { const Icon = ICONS[icon] || FileText; return (
              <NavLink key={path} to={path} end={path === base} onClick={onNav}
                data-testid={`nav-${label.toLowerCase().replace(/[ &]+/g, "-")}`}
                className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isActive ? "bg-navy text-white shadow-card" : "text-ink hover:bg-navy/5"}`}>
                <Icon className="h-4 w-4 shrink-0" /> <span className="truncate">{label}</span>
              </NavLink>
            ); })}
          </div>
        ))}
      </nav>
    </div>
  );
}

export default function LmsLayout({ role }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [showNotes, setShowNotes] = useState(false);
  const base = `/${role}`;

  useEffect(() => {
    if (!user?.id) {
      setNotes([]);
      return undefined;
    }
    let active = true;
    api.get("/notifications/list")
      .then((r) => { if (active) setNotes(r.data.items || []); })
      .catch((error) => {
        if (active) {
          setNotes([]);
          console.error("Failed to load notifications.", error);
        }
      });
    return () => { active = false; };
  }, [location.pathname, user?.id]);
  const unread = notes.filter((n) => !n.is_read).length;

  return (
    <div className="flex min-h-screen bg-canvas">
      <aside className="hidden w-64 shrink-0 border-r border-navy/10 bg-white lg:block">
        <div className="sticky top-0 h-screen"><SidebarContent role={role} base={base} /></div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-navy/10 bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild><button className="lg:hidden" aria-label="Menu" data-testid="lms-mobile-menu"><Menu className="h-6 w-6 text-navy" /></button></SheetTrigger>
              <SheetContent side="left" className="w-72 bg-white p-0"><SidebarContent role={role} base={base} onNav={() => setOpen(false)} /></SheetContent>
            </Sheet>
            <div className="hidden sm:block"><div className="font-head text-sm font-bold text-dark-navy">{TITLES[role]}</div><div className="text-xs text-mutedink">Orbit Digital University</div></div>
          </div>

          <div className="relative hidden max-w-md flex-1 md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mutedink" />
            <input placeholder="Search…" data-testid="global-search"
              className="w-full rounded-lg border border-navy/15 bg-canvas py-2 pl-9 pr-3 text-sm outline-none focus:border-orange" />
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button onClick={() => setShowNotes(!showNotes)} data-testid="notification-bell" className="relative rounded-lg p-2 hover:bg-navy/5">
                <Bell className="h-5 w-5 text-navy" />
                {unread > 0 && <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange px-1 text-[10px] font-bold text-white">{unread}</span>}
              </button>
              {showNotes && (
                <div className="absolute right-0 top-12 z-50 w-80 rounded-xl border border-navy/10 bg-white p-3 shadow-lift">
                  <div className="mb-2 font-head text-sm font-bold text-dark-navy">Notifications</div>
                  {notes.length === 0 ? <p className="py-4 text-center text-sm text-mutedink">No notifications</p> : notes.slice(0, 6).map((n) => (
                    <div key={n.id} className="flex items-start gap-2 rounded-lg p-2 hover:bg-canvas">
                      <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${n.is_read ? "bg-navy/20" : "bg-orange"}`} />
                      <div><div className="text-sm font-medium text-ink">{n.title}</div><div className="text-xs text-mutedink">{n.message}</div></div>
                    </div>
                  ))}
                  {role === "student" && <button onClick={() => { setShowNotes(false); navigate(`${base}/notifications`); }} className="mt-2 w-full rounded-lg bg-canvas py-2 text-xs font-semibold text-navy">View all</button>}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-navy/10 bg-white px-2 py-1">
              {user?.photo ? <img src={resolveImageUrl(user.photo)} alt="" className="h-8 w-8 rounded-full object-cover" /> : <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">{user?.name?.[0]}</div>}
              <div className="hidden pr-1 sm:block"><div className="text-xs font-semibold text-ink">{user?.name}</div><div className="text-[10px] capitalize text-mutedink">{role}</div></div>
            </div>
            <button onClick={() => { logout(); navigate("/"); }} data-testid="logout-btn" className="rounded-lg p-2 text-danger hover:bg-danger/5" aria-label="Logout"><LogOut className="h-5 w-5" /></button>
          </div>
        </header>

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8" onClick={() => showNotes && setShowNotes(false)}>
          <div className="animate-fade-up"><Outlet /></div>
        </main>
      </div>
    </div>
  );
}
