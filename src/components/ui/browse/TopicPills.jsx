import React from "react";

export default function TopicPills({ topics, active, onChange }) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-10">
      {topics.map((t) => {
        const isActive = t === active;
        return (
          <button
            key={t}
            type="button"
            onClick={() => onChange?.(t)}
            className={
              isActive
                ? "px-5 py-2 rounded-full bg-primary text-white text-sm font-semibold border border-primary/20"
                : "px-5 py-2 rounded-full bg-navy-dark text-slate-400 text-sm font-semibold border border-slate-800 hover:border-primary/50 hover:text-white transition-all"
            }
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}