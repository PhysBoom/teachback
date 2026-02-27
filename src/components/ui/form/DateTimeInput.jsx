import React from "react";

export default function DateTimeInput({ value, onChange, ...props }) {
  // Format current time to YYYY-MM-DDTHH:MM (required format for datetime-local)
  const now = new Date();
  const minValue = new Date(now.getTime() - now.getSeconds() * 1000 - now.getMilliseconds())
    .toISOString()
    .slice(0, 16);

  return (
    <input
      type="datetime-local"
      min={minValue}
      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400"
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}