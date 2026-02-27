export default function FileInput({ onChange, accept, ...props }) {
  return (
    <input
      type="file"
      accept={accept}
      onChange={onChange}
      className="
        w-full rounded-lg
        border border-slate-300 dark:border-slate-700
        bg-white dark:bg-navy-lighter
        px-3 py-2
        text-slate-900 dark:text-slate-100

        file:mr-3
        file:rounded-md
        file:border-0
        file:px-3 file:py-1.5
        file:text-sm file:font-medium

        file:bg-slate-100 dark:file:bg-slate-700
        file:text-slate-800 dark:file:text-slate-200

        hover:file:bg-slate-200 dark:hover:file:bg-slate-600
      "
      {...props}
    />
  );
}