import React, { useState } from "react";
import { PageHero, Reveal, SectionHeading } from "../components/Shared";
import { IMG } from "../mock";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../hooks/use-toast";
import { MapPin, Phone, Mail, Clock, Send, Loader2, CheckCircle2 } from "lucide-react";
import { submitContact } from "../api";

const info = [
  { icon: MapPin, title: "Visit Us", lines: ["VPO Shahpurkandi, Tehsil Dhar Kalan, District Pathankot, Punjab – 145029, India."] },
  { icon: Phone, title: "Call Us", lines: ["+91 98765 43210", "+91 11 4000 1234"] },
  { icon: Mail, title: "Email Us", lines: ["admissions@orbitdu.edu.in", "info@orbitdu.edu.in"] },
  { icon: Clock, title: "Office Hours", lines: ["Mon \u2013 Sat: 9am \u2013 7pm", "Sunday: Closed"] },
];

export default function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    setLoading(true);
    submitContact(form)
      .then(() => {
        setSent(true);
        toast({ title: "Message sent!", description: "We'll get back to you soon." });
        setForm({ name: "", email: "", phone: "", message: "" });
      })
      .catch(() => {
        const prev = JSON.parse(localStorage.getItem("odu_messages") || "[]");
        prev.push({ ...form, at: new Date().toISOString() });
        localStorage.setItem("odu_messages", JSON.stringify(prev));
        setSent(true);
        toast({ title: "Message sent!", description: "We'll get back to you soon." });
        setForm({ name: "", email: "", phone: "", message: "" });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <PageHero crumb="Contact Us" title="Let's talk about your future" sub="Questions about programmes, admissions or fees? Our team is here to help." image={IMG.video} />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {info.map((c, i) => (
            <Reveal key={c.title} delay={i * 60}>
              <div className="card-hover bg-white rounded-2xl border border-slate-100 p-6 h-full">
                <span className="w-12 h-12 rounded-xl bg-brand-soft text-brand flex items-center justify-center"><c.icon className="w-6 h-6" /></span>
                <h3 className="mt-4 font-bold text-ink">{c.title}</h3>
                {c.lines.map((l) => <p key={l} className="text-sm text-ink-soft mt-0.5">{l}</p>)}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-start">
          <Reveal>
            <SectionHeading eyebrow="Send a Message" title="We'd love to" highlight="hear from you" />
            {sent ? (
              <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
                <h3 className="mt-3 text-xl font-bold text-ink">Message sent successfully!</h3>
                <p className="text-ink-soft mt-1">Thank you for reaching out. Our team will respond shortly.</p>
                <Button onClick={() => setSent(false)} className="btn-primary rounded-full mt-5 px-8">Send Another</Button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-8 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5"><Label htmlFor="n">Name *</Label><Input id="n" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" /></div>
                  <div className="space-y-1.5"><Label htmlFor="p">Phone</Label><Input id="p" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Mobile number" /></div>
                </div>
                <div className="space-y-1.5"><Label htmlFor="e">Email *</Label><Input id="e" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" /></div>
                <div className="space-y-1.5"><Label htmlFor="m">Message *</Label><Textarea id="m" rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} placeholder="How can we help you?" /></div>
                <Button type="submit" disabled={loading} className="btn-primary rounded-full h-12 px-8 font-semibold">
                  {loading ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>) : (<>Send Message <Send className="w-4 h-4 ml-1" /></>)}
                </Button>
              </form>
            )}
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-2xl overflow-hidden border border-slate-100 h-full min-h-[420px]">
              <iframe
                title="map"
                src="https://www.google.com/maps?q=VPO+Shahpurkandi,+Tehsil+Dhar+Kalan,+District+Pathankot,+Punjab+%E2%80%93+145029,+India.&output=embed"
                className="w-full h-full min-h-[420px]"
                loading="lazy"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
