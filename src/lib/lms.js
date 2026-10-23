// Where to send a signed-in user: /student, /faculty or /admin
export const goToDash = (user) => (user?.role ? `/${user.role}` : "/login");
export const labelize = (s) => String(s ?? "").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
export const fmtDate = (v) => { if (!v) return "—"; const d = new Date(String(v).replace(" ", "T")); return isNaN(d) ? String(v) : d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }); };
export const fmtDateTime = (v) => { if (!v) return "—"; const d = new Date(String(v).replace(" ", "T")); return isNaN(d) ? String(v) : d.toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }); };
export const toInputDateTime = (v) => (v ? String(v).replace(" ", "T").slice(0, 16) : "");
