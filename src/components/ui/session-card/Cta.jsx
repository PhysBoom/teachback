import { useEffect, useState, useRef } from "react";
import Button from "../Button";

function formatRemaining(ms) {
  if (ms <= 0) return "00:00";

  const totalMinutes = Math.floor(ms / 1000 / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const days = Math.floor(totalHours / 24);

  if (days >= 1) {
    return `${days} day${days > 1 ? "s" : ""}`;
  }

  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;

  const paddedHours = String(hours).padStart(2, "0");
  const paddedMinutes = String(minutes).padStart(2, "0");

  return `${paddedHours}:${paddedMinutes}`;
}

export default function Cta({ timeRemainingMs, onClick }) {
  const [remaining, setRemaining] = useState(
    typeof timeRemainingMs === "number" ? Math.max(0, timeRemainingMs) : null
  );
  const intervalRef = useRef(null);

  useEffect(() => {
    if (typeof timeRemainingMs !== "number") {
      setRemaining(null);
      return;
    }
    setRemaining(Math.max(0, timeRemainingMs));
  }, [timeRemainingMs]);

  useEffect(() => {
    if (remaining === null) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r === null) return null;
        const next = r - 1000;
        if (next <= 0) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [remaining]);

  if (remaining === null) return null;

  if (remaining <= 0) {
    return (
      <Button
        onClick={onClick}
        className="bg-primary text-white px-4 py-2 rounded font-bold text-xs hover:bg-blue-600 transition-colors"
      >
        Join Session
      </Button>
    );
  }

  const formatted = formatRemaining(remaining);

  return (
    <div className="text-slate-400 font-bold text-xs flex items-center gap-1 bg-slate-50 px-3 py-2 rounded">
      <span aria-hidden="true">
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 11h5v-2h-4V6h-2v7Z" />
        </svg>
      </span>
      {formatted}
    </div>
  );
}