import React from "react";

export default function Field({ label, children }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-800 dark:text-slate-300">
        {label}
      </label>
      {children}
    </div>
  );
}