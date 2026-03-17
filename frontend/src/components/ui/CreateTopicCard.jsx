import React from "react";

export default function CreateTopicCard({ onClick, title, description }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        bg-slate-50 dark:bg-navy-dark/40
        border-2 border-dashed border-slate-300 dark:border-slate-700
        rounded-2xl
        flex flex-col items-center justify-center
        p-10 text-center
        hover:bg-slate-100 dark:hover:bg-navy-lighter
        transition-all cursor-pointer group
      "
    >
      <div
        className="
          w-16 h-16
          bg-white dark:bg-navy-lighter
          rounded-full
          flex items-center justify-center
          mb-4 shadow-sm
          group-hover:scale-110 transition-transform
        "
      >
        <span className="text-primary">
          <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
            <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6Z" />
          </svg>
        </span>
      </div>

      <h3 className="text-lg font-bold text-navy-deep dark:text-white">
        {title}
      </h3>

      <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-[200px]">
        {description}
      </p>
    </button>
  );
}