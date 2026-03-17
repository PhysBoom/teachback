export default function Select({
  value,
  onChange,
  options,
  placeholder = "Select...",
  ...props
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="
        w-full rounded-lg
        border border-slate-300 dark:border-slate-700
        bg-white dark:bg-navy-lighter
        px-3 py-2
        text-slate-900 dark:text-slate-100
        focus:outline-none
        focus:ring-2 focus:ring-slate-400 dark:focus:ring-primary
      "
      {...props}
    >
      <option value="" disabled className="text-slate-400 dark:text-slate-500">
        {placeholder}
      </option>

      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}