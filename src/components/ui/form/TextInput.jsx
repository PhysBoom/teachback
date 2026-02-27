export default function TextInput({ value, onChange, placeholder = "", ...props }) {
  return (
    <input
      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  );
}
