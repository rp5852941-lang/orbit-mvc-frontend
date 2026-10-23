import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import api from "@/lib/api";

// View-side session: the token lives in localStorage; the user (role, permissions, sidebar) always comes from /auth/me.
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!!localStorage.getItem("orbit_token"));

  const loadMe = useCallback(async () => {
    if (!localStorage.getItem("orbit_token")) { setUser(null); setLoading(false); return null; }
    try { const { data } = await api.get("/auth/me"); setUser(data); return data; }
    catch { localStorage.removeItem("orbit_token"); setUser(null); return null; }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    loadMe();
    const clear = () => setUser(null);
    window.addEventListener("orbit:unauthorized", clear);
    const refresh = () => localStorage.getItem("orbit_token") && loadMe();   // pick up admin changes (permissions) when the tab is focused again
    window.addEventListener("focus", refresh);
    return () => { window.removeEventListener("orbit:unauthorized", clear); window.removeEventListener("focus", refresh); };
  }, [loadMe]);

  const accept = (data) => { localStorage.setItem("orbit_token", data.token); setUser(data.user); return data.user; };
  const login = async (email, password, role) => accept((await api.post("/auth/login", { email, password, role })).data);
  const logout = async () => { try { await api.post("/auth/logout"); } catch { /* token may already be dead */ } localStorage.removeItem("orbit_token"); setUser(null); };
  const can = (code) => !!user?.permissions?.includes(code);

  return <AuthContext.Provider value={{ user, loading, login, logout, accept, refreshUser: loadMe, can, sidebar: user?.sidebar || [] }}>{children}</AuthContext.Provider>;
}
