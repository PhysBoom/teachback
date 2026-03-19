export default function DateTimeInput({ value, onChange, ...props }) {
  const pad = (n) => String(n).padStart(2, "0");

  const now = new Date();
  now.setSeconds(0);
  now.setMilliseconds(0);

  const minValue = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;

  return (
    <input
      type="datetime-local"
      min={minValue}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}