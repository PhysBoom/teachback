import React from "react";

export default function DateTimeInput({ value, onChange, ...props }) {
  const now = new Date();
  const minValue = new Date(
    now.getTime() - now.getSeconds() * 1000 - now.getMilliseconds()
  )
    .toISOString()
    .slice(0, 16);

  return (
    <input
      type="datetime-local"
      min={minValue}
      value={value}
      onChange={onChange}
      className="
        w-full rounded-lg
        border border-slate-300 dark:border-slate-700
        bg-white dark:bg-navy-lighter
        px-3 py-2
        text-slate-900 dark:text-slate-100
        focus:outline-none
        focus:ring-2 focus:ring-slate-400 dark:focus:ring-primary
        placeholder:text-slate-400 dark:placeholder:text-slate-500
      "
      {...props}
    />
  );
}