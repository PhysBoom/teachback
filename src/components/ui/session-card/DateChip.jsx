export default function DateChip({ label }) {
  return (
    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase mb-3">
      <span aria-hidden="true">
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
          <path d="M7 2h2v2h6V2h2v2h3v18H4V4h3V2Zm13 6H6v12h14V8Z" />
        </svg>
      </span>
      {label}
    </div>
  );
}