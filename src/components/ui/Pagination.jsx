import React, { useState } from "react";

export default function Pagination() {
  const [page, setPage] = useState(1);
  return (
    <div className="mt-16 flex justify-center gap-2">
      <button
        type="button"
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-primary hover:border-primary transition-all"
        aria-label="Previous page"
      >
        <span aria-hidden="true">‹</span>
      </button>

      {[1, 2, 3].map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => setPage(p)}
          className={
            p === page
              ? "w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold"
              : "w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all"
          }
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        onClick={() => setPage((p) => Math.min(3, p + 1))}
        className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:text-primary hover:border-primary transition-all"
        aria-label="Next page"
      >
        <span aria-hidden="true">›</span>
      </button>
    </div>
  );
}