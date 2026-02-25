import Button from "../Button";

export default function Cta({ cta, onClick }) {
  if (cta?.type === "countdown") {
    return (
      <div className="text-slate-400 font-bold text-xs flex items-center gap-1 bg-slate-50 px-3 py-2 rounded">
        <span aria-hidden="true">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 11h5v-2h-4V6h-2v7Z" />
          </svg>
        </span>
        {cta.label}
      </div>
    );
  }

  return (
    <Button
      onClick={onClick}
      className="bg-primary text-white px-4 py-2 rounded font-bold text-xs hover:bg-blue-600 transition-colors"
    >
      {cta?.label || "Join Session"}
    </Button>
  );
}
