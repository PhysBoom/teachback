import React from "react";

function getPageNumbers(currentPage, totalPages) {
  const pages = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  pages.push(1);

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  if (start > 2) pages.push("ellipsis-start");

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages - 1) pages.push("ellipsis-end");

  pages.push(totalPages);

  return pages;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (!totalPages || totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="mt-16 flex justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-all
          ${
            currentPage === 1
              ? "border-slate-200 text-slate-300 cursor-not-allowed"
              : "border-slate-200 text-slate-400 hover:text-primary hover:border-primary"
          }`}
        aria-label="Previous page"
      >
        ‹
      </button>

      {pages.map((p, index) =>
        typeof p === "string" ? (
          <span
            key={p + index}
            className="w-10 h-10 flex items-center justify-center text-slate-400"
          >
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={
              p === currentPage
                ? "w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold"
                : "w-10 h-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all"
            }
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-all
          ${
            currentPage === totalPages
              ? "border-slate-200 text-slate-300 cursor-not-allowed"
              : "border-slate-200 text-slate-400 hover:text-primary hover:border-primary"
          }`}
        aria-label="Next page"
      >
        ›
      </button>
    </div>
  );
}