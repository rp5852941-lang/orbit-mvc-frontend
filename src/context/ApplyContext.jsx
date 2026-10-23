import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const ApplyContext = createContext(null);

// Programme codes that exist in the LMS backend (used by /apply/:code)
const LMS_CODES = new Set([
  "BCA", "BBA", "BCOM", "BSCCS", "BTECH", "BA", "BSCDS", "BSCAI",
  "MBA", "MCA", "MCOM", "MSCCS", "MTECH", "MA", "MSCDS", "PGDDM", "DCA", "CERTFS",
]);

// "B.Com — Bachelor of Commerce" -> "BCOM"; returns "" if it is not a known LMS programme
function toProgrammeCode(programme) {
  if (typeof programme !== "string" || !programme) return "";
  const head = programme.split(/\s[—-]\s/)[0];
  const code = head.replace(/[.\s]/g, "").toUpperCase();
  return LMS_CODES.has(code) ? code : "";
}

/**
 * "Apply Now" no longer opens a pop-up. Every Apply button now takes the visitor
 * to the full /apply admission flow (same as the DEMOS project).
 * `openApply` keeps the same name/signature so all existing buttons keep working.
 */
export function ApplyProvider({ children }) {
  const navigate = useNavigate();

  const openApply = (programme = "") => {
    const code = toProgrammeCode(programme);
    navigate(code ? `/apply/${code}` : "/apply");
  };

  return (
    <ApplyContext.Provider value={{ openApply }}>
      {children}
    </ApplyContext.Provider>
  );
}

export const useApply = () => {
  const ctx = useContext(ApplyContext);
  if (!ctx) throw new Error("useApply must be used within ApplyProvider");
  return ctx;
};
