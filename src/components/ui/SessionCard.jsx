import React from "react";

function DateChip({ label }) {
  return (
    <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase mb-3">
      <span aria-hidden="true">
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
          <path d="M7 2h2v2h6V2h2v2h3v18H4V4h3V2Zm13 6H6v12h14V8Z" />
        </svg>
      </span>
      {label}
    </div>
  );
}

function TopicBadge({ topic }) {
  return (
    <div className="absolute top-4 left-4 bg-navy-deep/80 backdrop-blur-md text-white px-3 py-1 rounded text-[10px] font-bold uppercase">
      {topic}
    </div>
  );
}

function CardMedia({ image, icon, topic }) {
  if (image) {
    return (
      <div className="h-48 relative overflow-hidden">
        <img
          alt={topic}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={image}
        />
        <TopicBadge topic={topic} />
      </div>
    );
  }

  return (
    <div className="h-48 relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
        <span className="text-slate-300">
          <svg viewBox="0 0 24 24" className="w-14 h-14" fill="currentColor">
            {/* simple fallback icon */}
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z" />
          </svg>
        </span>
      </div>
      <TopicBadge topic={topic} />
    </div>
  );
}

function Cta({ cta, onClick }) {
  if (cta?.type === "countdown") {
    return (
      <div className="text-slate-400 font-bold text-xs flex items-center gap-1 bg-slate-50 px-3 py-2 rounded">
        <span aria-hidden="true">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 11h5v-2h-4V6h-2v7Z" />
          </svg>
        </span>
        {cta.label}
      </div>
    );
  }

  if (cta?.type === "secondary") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="border border-slate-200 text-slate-700 px-4 py-2 rounded font-bold text-xs hover:bg-slate-50 transition-colors"
      >
        {cta.label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-primary text-white px-4 py-2 rounded font-bold text-xs hover:bg-blue-600 transition-colors"
    >
      {cta?.label || "Join Session"}
    </button>
  );
}

export default function SessionCard({ session, onCta }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all group">
      <CardMedia image={session.image} icon={session.icon} topic={session.topic} />

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