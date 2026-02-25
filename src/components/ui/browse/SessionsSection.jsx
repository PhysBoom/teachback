import React from "react";
import CreateTopicCard from "../CreateTopicCard";
import SessionCard from "../session-card/SessionCard";
import Pagination from "../Pagination";

export default function SessionsSection({
  title,
  badge,
  sessions,
  onFilterClick,
  onCta,
  onCreateTopic,
}) {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-navy-deep font-serif">{title}</h2>
          {badge ? (
            <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">
              {badge}
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={onFilterClick}
          className="flex items-center gap-2 text-slate-500 text-sm font-medium hover:text-primary transition-colors"
        >
          <span>Filter by availability</span>
          <span aria-hidden="true">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
              <path d="M10 18h4v-2h-4v2Zm-7-14v2h18V4H3Zm3 8h12v-2H6v2Z" />
            </svg>
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sessions.map((s) => (
          <SessionCard key={s.id} session={s} onCta={() => onCta?.(s)} />
        ))}

        <CreateTopicCard onClick={onCreateTopic} title="Can't find a topic?" description="Schedule your own session today!"/>
      </div>

      <Pagination />
    </section>
  );
}