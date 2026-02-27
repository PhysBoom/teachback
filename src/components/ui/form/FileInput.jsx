export default function FileInput({ onChange, accept, ...props }) {
  return (
    <input
      type="file"
      accept={accept}
      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-slate-800 hover:file:bg-slate-200"
      onChange={onChange}
      {...props}
    />
  );
}