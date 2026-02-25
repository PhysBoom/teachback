import React from "react";
import CardMedia from "./CardMedia";
import DateChip from "./DateChip";
import Cta from "./Cta";

export default function SessionCard({ session, onCta, showEditMenu = false }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all group">
      <CardMedia image={session.image} topic={session.topic} />

      <div className="p-6">
        <DateChip label={session.dateLabel} />
        <h3 className="text-xl font-bold text-navy-deep mb-3 leading-tight">
          {session.title}
        </h3>
        <p className="text-slate-500 text-sm mb-6 line-clamp-2">
          {session.description}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <img
              className="w-8 h-8 rounded-full border border-slate-200 object-cover"
              src={session.teacher?.avatar}
              alt={session.teacher?.name}
            />
            <span className="text-xs font-bold text-slate-700">
              {session.teacher?.name}
            </span>
          </div>

          <Cta cta={session.cta} onClick={onCta} />
        </div>
      </div>
    </div>
  );
}