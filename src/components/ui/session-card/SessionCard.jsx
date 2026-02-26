import React from "react";
import CardMedia from "./CardMedia";
import DateChip from "./DateChip";
import Cta from "./Cta";
import UserPill from "../UserPill";

function formatStartTime(startTime) {
  if (!startTime) return "";
  const d = new Date(startTime);
  // e.g. "Tue, Feb 24 • 14:30"
  const datePart = d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const timePart = d.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  return `${datePart} • ${timePart}`;
}

export default function SessionCard({ session, onCta, showEditMenu = false }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all group">
      <CardMedia image={session.image} topic={session.topic} />

      <div className="p-6">
        <DateChip label={formatStartTime(session.startTime)} />
        <h3 className="text-xl font-bold text-navy-deep mb-3 leading-tight">
          {session.topic}
        </h3>
        <p className="text-slate-500 text-sm mb-6 line-clamp-2">
          {session.description}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <UserPill name={session.teacher?.name} avatar={session.teacher?.avatar} />
          <Cta
            timeRemainingMs={session.startTime - Date.now()}
            onClick={onCta}
          />
        </div>
      </div>
    </div>
  );
}