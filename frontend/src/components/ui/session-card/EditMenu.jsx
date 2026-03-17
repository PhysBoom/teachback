import { useEffect, useRef, useState } from "react";

export default function EditMenu({
  onEditClicked,
  onDeleteClicked,
  sessionId,
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    function handleEscape(e) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleEdit() {
    setOpen(false);
    onEditClicked?.();
  }

  function handleDelete() {
    setOpen(false);
    onDeleteClicked?.(sessionId);
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="size-8 flex items-center justify-center bg-white/90 backdrop-blur rounded-full text-slate-600 hover:text-primary hover:bg-white shadow-sm transition-all focus:outline-none"
      >
        <span className="material-symbols-outlined text-xl">
          more_vert
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-xl border border-slate-100 overflow-hidden z-30"
        >
          <button
            type="button"
            onClick={handleEdit}
            className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">
              edit
            </span>
            Edit
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-slate-50"
          >
            <span className="material-symbols-outlined text-sm">
              delete
            </span>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}