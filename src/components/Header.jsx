import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LOGO, navMenu, topBarLinks, schools, megaLevels, faculties } from "../mock";
import { useApply } from "../context/ApplyContext";
import { useAuth } from "../context/AuthContext";
import { goToDash } from "../lib/lms";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import "./css/Header.css";
import {
  Menu, Phone, Mail, ChevronDown, ArrowRight, GraduationCap,
  BarChart3, Code2, BookOpen, Newspaper, FlaskConical, Plus, LogIn,
} from "lucide-react";

const iconMap = { BarChart3, Code2, BookOpen, Newspaper, FlaskConical };

export default function Header() {
  const { openApply } = useApply();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [openItem, setOpenItem] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpenItem(null); setMobileOpen(false); }, [location.pathname]);

  return (
    <>
      {/* Top bar */}
      <div className="hidden lg:block bg-brand text-white text-[13px] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-orangeAccent" /> +91 98765 43210</span>
            <span className="flex items-center gap-1.5 text-white/80"><Mail className="w-3.5 h-3.5 text-orangeAccent" /> info@orbitdu.edu.in</span>
          </div>
          <div className="flex items-center gap-3">
            {topBarLinks.map((l, i) => (
              <React.Fragment key={l.label}>
                <Link to={l.to} className="text-white/85  top-left  transition-colors font-medium">{l.label}</Link>
                {i < topBarLinks.length - 1 && <span className="h-3 w-px bg-white/25" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur shadow-[0_6px_24px_-12px_rgba(26,37,64,0.25)]" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-[80px] flex items-center justify-between gap-3">
            <Link to="/" className="flex items-center shrink-0">
              <img src={LOGO} alt="Orbit Digital University" className="h-14 sm:h-16 w-auto" />
            </Link>

            <nav className="hidden xl:flex items-center gap-0.5">
              {navMenu.map((item) => (
                <div key={item.label} className="relative shrink-0" onMouseEnter={() => setOpenItem(item.label)} onMouseLeave={() => setOpenItem(null)}>
                  <Link to={item.to} className={`px-2.5 py-2 rounded-lg text-[13.5px] font-semibold flex items-center gap-1 whitespace-nowrap transition-colors ${location.pathname === item.to ? "text-orangeAccent" : "text-ink hover:text-orangeAccent"}`}>
                    {item.label}
                    {(item.children || item.mega) && <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openItem === item.label ? "rotate-180" : ""}`} />}
                  </Link>
                  {openItem === item.label && item.mega && <MegaMenu />}
                  {openItem === item.label && item.children && (
                    <div className="absolute left-0 top-full pt-2 w-80 animate-fade-in">
                      <div className="bg-white rounded-xl shadow-[0_24px_50px_-20px_rgba(26,37,64,0.4)] border border-slate-100 p-2">
                        {item.children.map((c) => (
                          <Link key={c.label} to={c.to} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-ink-soft hover:bg-orangeAccent/10 hover:text-orangeAccent transition-colors">
                            <span className="w-1.5 h-1.5 rounded-full bg-orangeAccent" /> {c.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Button onClick={() => navigate(user ? goToDash(user) : "/login")} data-testid="lms-login-btn" variant="outline" className="hidden sm:inline-flex rounded-full px-5 h-10 font-semibold border-brand/20 text-brand hover:bg-brand/5 hover:text-brand">
                <LogIn className="w-4 h-4 mr-1.5" /> {user ? "My LMS" : "LMS Login"}
              </Button>
              <Button onClick={() => openApply()} data-testid="header-apply-btn" className="hidden sm:inline-flex btn-orange rounded-full px-6 h-10 font-semibold">Apply Now</Button>
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <button className="xl:hidden p-2 rounded-lg hover:bg-slate-100 text-ink"><Menu className="w-6 h-6" /></button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[88%] sm:w-96 overflow-y-auto p-5">
                  <img src={LOGO} alt="logo" className="h-10 mb-5" />
                  <MobileNav user={user} onLms={() => { setMobileOpen(false); navigate(user ? goToDash(user) : "/login"); }} onApply={() => { setMobileOpen(false); openApply(); }} />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

function MegaMenu() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[640px] animate-fade-in">
      <div className="bg-white rounded-2xl shadow-[0_30px_70px_-25px_rgba(13,31,66,0.45)] border border-slate-100 p-6 grid grid-cols-[0.9fr_1.1fr] gap-6">
        {/* By Level */}
        <div className="pr-6 border-r border-slate-100">
          <div className="text-[11px] font-bold uppercase tracking-widest text-orangeAccent mb-3">By Level</div>
          <ul className="space-y-1">
            {megaLevels.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="flex items-center gap-2 py-2 px-2 rounded-lg text-sm font-medium text-ink-soft hover:bg-brand/5 hover:text-brand transition-colors">
                  <GraduationCap className="w-4 h-4 text-brand" /> {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* By Faculties */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-widest text-orangeAccent mb-3">By Faculties</div>
          <ul className="grid grid-cols-1 gap-0.5">
            {faculties.map((f) => (
              <li key={f.id}>
                <Link to={`/programmes?faculty=${f.id}`} className="flex items-center gap-2.5 py-2 px-2 rounded-lg group hover:bg-brand/5 transition-colors">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: f.color }} />
                  <span className="text-sm text-ink-soft group-hover:text-brand font-medium">{f.short}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2 pt-4 border-t flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm text-ink-soft"><GraduationCap className="w-4 h-4 text-orangeAccent" /> 40+ UGC-entitled online & ODL programmes</span>
          <Link to="/programmes" className="text-sm font-semibold text-orangeAccent flex items-center gap-1 hover:gap-2 transition-all">View all <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
    </div>
  );
}

function MobileNav({ user, onLms, onApply }) {
  const [exp, setExp] = useState(null);
  return (
    <div>
      <nav className="flex flex-col">
        {navMenu.map((item) => (
          <div key={item.label} className="border-b border-slate-100">
            <div className="flex items-center justify-between">
              <Link to={item.to} className="py-3 text-ink font-semibold flex-1">{item.label}</Link>
              {item.children && (
                <button onClick={() => setExp(exp === item.label ? null : item.label)} className="p-2 text-ink-soft">
                  <Plus className={`w-4 h-4 transition-transform ${exp === item.label ? "rotate-45" : ""}`} />
                </button>
              )}
            </div>
            {item.children && exp === item.label && (
              <div className="pb-2 pl-3">
                {item.children.map((c) => (
                  <Link key={c.label} to={c.to} className="block py-2 text-sm text-ink-soft hover:text-orangeAccent">{c.label}</Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <Button onClick={onLms} variant="outline" className="w-full rounded-full mt-5 h-11 font-semibold border-brand/20 text-brand hover:bg-brand/5 hover:text-brand">
        <LogIn className="w-4 h-4 mr-1.5" /> {user ? "My LMS" : "LMS Login"}
      </Button>
      <Button onClick={onApply} className="w-full btn-orange rounded-full mt-3 h-11 font-semibold">Apply Now</Button>
    </div>
  );
}
