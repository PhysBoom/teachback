export default function TextInput({
  value,
  onChange,
  placeholder = "",
  ...props
}) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="
        w-full rounded-lg
        border border-slate-300 dark:border-slate-700
        bg-white dark:bg-navy-lighter
        px-3 py-2
        text-slate-900 dark:text-slate-100
        placeholder:text-slate-400 dark:placeholder:text-slate-500
        focus:outline-none
        focus:ring-2 focus:ring-slate-400 dark:focus:ring-primary
      "
      {...props}
    />
  );
}