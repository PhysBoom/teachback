export default function SignupTextField({ label, id, type = "text", placeholder, value, onChange, ...props }) {
  return (
    <div>
      <label
        className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-navy-deep font-medium placeholder:text-slate-400"
        {...props}
      />
    </div>
  );
}