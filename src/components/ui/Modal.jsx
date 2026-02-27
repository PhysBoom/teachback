import { useEffect } from "react";

export default function Modal({ open, title, children, onClose }) {
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose?.();
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/70"
        onClick={onClose}
      />

      {/* Modal panel */}
      <div
        className="
          relative
          w-full max-w-lg mx-4
          rounded-2xl shadow-xl p-6
          bg-white dark:bg-navy-lighter
          border border-slate-200 dark:border-slate-800
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-navy-deep dark:text-white">
            {title}
          </h3>

          <button
            onClick={onClose}
            className="
              w-8 h-8 flex items-center justify-center rounded-lg
              text-slate-600 dark:text-slate-300
              hover:bg-slate-100 dark:hover:bg-slate-700
              transition
            "
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="text-slate-700 dark:text-slate-300">
          {children}
        </div>
      </div>
    </div>
  );
}