export default function Pill({ label }) {
  return (
    <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full w-fit">
      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
      <span className="text-primary font-semibold uppercase text-[10px] tracking-widest">
        {label}
      </span>
    </div>
  );
}