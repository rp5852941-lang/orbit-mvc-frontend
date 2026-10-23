import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { OrbitLogo } from "@/components/common/Bits";
import PersonForm from "@/components/lms/PersonForm";

// Apply Now: a completed form creates the person as a STUDENT (the admin can later switch them to faculty) and signs them in.
export default function ApplyNow() {
  const { code } = useParams();
  const { accept } = useAuth();
  const navigate = useNavigate();
  const [preset, setPreset] = useState("");
  const [session, setSession] = useState(null);
  useEffect(() => { api.get("/applyNow/options").then((r) => { setSession(r.data.session); const p = r.data.programmes.find((x) => x.code === (code || "").toUpperCase()); if (p) setPreset(p.id); }).catch(() => {}); }, [code]);

  const submit = async (body) => {
    const { data } = await api.post("/applyNow/add", body);
    accept(data); toast.success("You are registered as a student. Welcome!"); navigate("/student", { replace: true });
  };
  return (
    <div className="min-h-screen bg-canvas px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="mb-4 flex justify-center"><OrbitLogo /></Link>
        <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-lift sm:p-8">
          <h1 className="font-head text-2xl font-bold text-dark-navy">Apply Now</h1>
          <p className="mt-1 text-sm text-mutedink">Fill every field and submit. You will be registered as a student of the programme you choose{session ? ` for the session ${session.name}` : ""} and can start learning right away.</p>
          <div className="mt-6"><PersonForm key={preset} kind="student" mode="apply" presetProgramme={preset} submitLabel="Submit application" onSubmit={submit} /></div>
          <p className="mt-5 text-center text-sm text-mutedink">Already registered? <Link to="/login" className="font-semibold text-orange">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}
