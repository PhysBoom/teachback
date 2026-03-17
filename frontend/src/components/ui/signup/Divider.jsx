export default function Divider({ label = "Or with email" }) {
  return (
    <div className="relative flex items-center py-2">
      <div className="flex-grow border-t border-slate-200" />
      <span className="flex-shrink mx-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
        {label}
      </span>
      <div className="flex-grow border-t border-slate-200" />
    </div>
  );
}