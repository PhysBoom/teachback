import React from "react";

export default function SearchBar({ value, onChange, onSearch }) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="flex items-center bg-navy-dark border-2 border-primary/50 rounded-xl px-4 py-1 transition-all focus-within:ring-2 focus-within:ring-primary/30">
        {/* icon */}
        <span className="mr-3 text-slate-400" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
            <path d="M10 4a6 6 0 1 1 3.87 10.6l4.26 4.27-1.41 1.41-4.27-4.26A6 6 0 0 1 10 4Zm0 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
          </svg>
        </span>

        <input
          className="bg-transparent border-none focus:ring-0 text-white w-full py-3 placeholder:text-slate-500 font-medium outline-none"
          placeholder="Search for topics (e.g. Quantum Computing, UX Design...)"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onSearch?.();
            }
          }}
          type="text"
        />

        <button
          type="button"
          onClick={() => onSearch?.()}
          className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm ml-2"
        >
          Search
        </button>
      </div>
    </div>
  );
}