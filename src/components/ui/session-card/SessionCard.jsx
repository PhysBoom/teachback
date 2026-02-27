import React from "react";
import CardMedia from "./CardMedia";
import DateChip from "./DateChip";
import Cta from "./Cta";
import UserPill from "../UserPill";

function formatStartTime(startTime) {
  if (!startTime) return "";
  const d = new Date(startTime);
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

export default function SessionCard({
  session,
  onEditClicked,
  onDeleteClicked,
  showEditMenu = false,
}) {
  return (
    <div
      className="
        bg-white dark:bg-navy-lighter
        border border-slate-200 dark:border-slate-800
        rounded-2xl overflow-hidden
        transition-all group
        hover:shadow-lg dark:hover:shadow-2xl
      "
    >
      <CardMedia
        sessionId={session.id}
        image={session.image}
        onEditClicked={onEditClicked}
        onDeleteClicked={onDeleteClicked}
        topics={session.topics}
        showEditMenu={showEditMenu}
      />

      <div className="p-6">
        <DateChip label={formatStartTime(session.startTime)} />

        <h3 className="text-xl font-bold text-navy-deep dark:text-white mb-3 leading-tight">
          {session.title}
        </h3>

        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2">
          {session.description}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
          <UserPill
            name={session.teacher?.name}
            avatar={session.teacher?.avatar}
          />

          <Cta
            timeRemainingMs={session.startTime - Date.now()}
            meetingLink={session.meetingLink}
          />
        </div>
      </div>
    </div>
  );
}