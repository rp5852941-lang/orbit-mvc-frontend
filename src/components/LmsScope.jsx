import React from "react";
import { Outlet } from "react-router-dom";

// Wraps the LMS / Login / Apply pages so they keep the exact DEMOS look
// (fonts, radii, colours) without changing the public Orbit website styles.
export default function LmsScope() {
  return (
    <div className="lms-scope">
      <Outlet />
    </div>
  );
}
