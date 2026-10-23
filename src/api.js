// Helpers used by the public website pages (no login needed).
import api from "./api/client";

export const API = api.defaults.baseURL;
export const submitContact = (data) => api.post("/contact/add", data);
export const fetchContacts = () => api.get("/contact/list");
export const fetchApplications = () => api.get("/applyNow/list");
export const submitApplication = (data) => api.post("/applyNow/add", data);
