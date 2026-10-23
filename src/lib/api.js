// Keep the existing import path working while using the shared API client.
export { default, formatApiError } from "../api/client";
export { default as api } from "../api/client";
import api from "../api/client";
export const API = api.defaults.baseURL;
