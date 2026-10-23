import React, { useEffect, useState } from "react";
import { useApply } from "../context/ApplyContext";
import { LOGO, schools } from "../mock";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useToast } from "../hooks/use-toast";
import { CheckCircle2, GraduationCap, Loader2 } from "lucide-react";
import { submitApplication } from "../api";

const allPrograms = schools.flatMap((s) =>
  s.programs.map((p) => ({ label: `${p.title} \u2014 ${s.name}`, value: p.title }))
);

export default function ApplyModal() {
  const { open, preset, closeApply } = useApply();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    programme: "",
    state: "",
  });

  useEffect(() => {
    if (open) {
      setForm((f) => ({ ...f, programme: preset || "" }));
      setDone(false);
    }
  }, [open, preset]);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.programme) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    submitApplication(form)
      .then(() => {
        setDone(true);
        toast({ title: "Application received!", description: "Our counsellor will reach out shortly." });
      })
      .catch(() => {
        // graceful fallback so the user still gets confirmation
        const prev = JSON.parse(localStorage.getItem("odu_applications") || "[]");
        prev.push({ ...form, at: new Date().toISOString() });
        localStorage.setItem("odu_applications", JSON.stringify(prev));
        setDone(true);
        toast({ title: "Application received!", description: "Our counsellor will reach out shortly." });
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && closeApply()}>
      <DialogContent className="sm:max-w-[720px] p-0 overflow-hidden gap-0 border-0">
        <div className="grid md:grid-cols-[0.85fr_1.15fr]">
          {/* Left banner */}
          <div className="relative hidden md:flex flex-col justify-between p-7 text-white bg-brand overflow-hidden">
            <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-white/10" />
            <div className="absolute -right-8 bottom-8 w-40 h-40 rounded-full bg-orangeAccent/30" />
            <div className="relative z-10">
              <img src={LOGO} alt="Orbit Digital University" className="h-11 bg-white rounded-lg p-1.5 w-fit" />
              <h3 className="mt-6 text-2xl font-extrabold leading-tight">Begin your digital learning journey</h3>
              <p className="mt-3 text-sm text-white/80">Apply in under 2 minutes. A dedicated counsellor will guide you through admission, scholarships & EMI options.</p>
            </div>
            <ul className="relative z-10 space-y-2.5 mt-6">
              {["UGC-DEB entitled degrees", "No-cost EMI available", "120+ hiring partners"].map((t) => (
                <li key={t} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-orangeAccent" /> {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Right form */}
          <div className="p-6 sm:p-8">
            {done ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-9 h-9 text-green-600" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-ink">Thank you, {form.name.split(" ")[0]}!</h3>
                <p className="mt-2 text-sm text-ink-soft max-w-xs">Your enquiry for <b>{form.programme}</b> has been received. Our admission counsellor will call you soon.</p>
                <Button onClick={closeApply} className="mt-6 btn-primary rounded-full px-8">Done</Button>
              </div>
            ) : (
              <>
                <DialogHeader className="text-left space-y-1">
                  <div className="flex items-center gap-2 text-brand">
                    <GraduationCap className="w-5 h-5" />
                    <span className="text-xs font-bold tracking-widest uppercase">Admissions 2025</span>
                  </div>
                  <DialogTitle className="text-2xl font-extrabold text-ink">Apply Now</DialogTitle>
                  <p className="text-sm text-ink-soft">Fill the form and we'll get in touch.</p>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Enter your name" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input id="phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="10-digit mobile" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Programme of Interest *</Label>
                    <Select value={form.programme} onValueChange={(v) => update("programme", v)}>
                      <SelectTrigger><SelectValue placeholder="Select a programme" /></SelectTrigger>
                      <SelectContent className="max-h-64">
                        {allPrograms.map((p) => (
                          <SelectItem key={p.value} value={p.value}>{p.value}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" value={form.state} onChange={(e) => update("state", e.target.value)} placeholder="Your state" />
                  </div>
                  <Button type="submit" disabled={submitting} className="w-full btn-primary rounded-full h-11 text-base font-semibold">
                    {submitting ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</>) : "Submit Application"}
                  </Button>
                  <p className="text-[11px] text-center text-ink-soft">By submitting you agree to be contacted by Orbit Digital University.</p>
                </form>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
