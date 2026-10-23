import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Loader } from "@/components/common/Bits";
import { goToDash } from "@/lib/lms";

export function Forbidden() {
  const { user } = useAuth();
  return (
    <div className="mx-auto max-w-md rounded-xl border border-navy/10 bg-white p-8 text-center shadow-card">
      <div className="font-head text-4xl font-bold text-orange">403</div>
      <h2 className="mt-2 font-head text-lg font-bold text-dark-navy">You don’t have access to this page</h2>
      <p className="mt-1 text-sm text-mutedink">Ask the administrator if you need it enabled for your account.</p>
      <a href={goToDash(user)} className="mt-4 inline-block rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white">Back to dashboard</a>
    </div>
  );
}

// Signed in + the right role (student / faculty / admin)
export function ProtectedRoute({ role, children }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="flex min-h-screen items-center justify-center"><Loader /></div>;
  if (!user) return <Navigate to={`/login?next=${encodeURIComponent(location.pathname)}`} replace />;
  if (role && user.role !== role) return <Navigate to={goToDash(user)} replace />;
  return children;
}

// Shows the page only when the permission checkbox is ON for this user (the API enforces it too).
export function PermissionGuard({ permission, children }) {
  const { can } = useAuth();
  return can(permission) ? children : <Forbidden />;
}
