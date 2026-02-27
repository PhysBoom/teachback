import React, { useEffect, useMemo, useState } from "react";
import CreateTopicCard from "../../ui/CreateTopicCard";
import SessionCard from "../../ui/session-card/SessionCard";
import Pagination from "../../ui/Pagination";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 6;

export default function SessionsSection({ title, sessions = [], onCta }) {
  const [page, setPage] = useState(1);
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(sessions.length / PAGE_SIZE)),
    [sessions]
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
    else if (page < 1) setPage(1);
  }, [page, totalPages]);

  const pagedSessions = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return sessions.slice(start, end);
  }, [sessions, page]);

  return (
    <section className="max-w-[1200px] mx-auto px-6 py-16 bg-transparent">
      <h2 className="text-3xl font-bold text-navy-deep dark:text-white font-serif mb-10">
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pagedSessions.map((s) => (
          <SessionCard key={s.id} session={s} onCta={() => onCta?.(s)} />
        ))}

        <CreateTopicCard
          onClick={() => navigate("/dashboard?schedulingSession=true")}
          title="Can't find a topic?"
          description="Schedule your own session today!"
        />
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => {
              const next = Math.max(1, Math.min(totalPages, p));
              setPage(next);
            }}
          />
        </div>
      )}
    </section>
  );
}