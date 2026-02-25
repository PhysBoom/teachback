import React, { useMemo, useState } from "react";
import Header from "../components/layout/Header.jsx";

import SessionCard from "../components/ui/session-card/SessionCard.jsx";
import CreateTopicCard from "../components/ui/CreateTopicCard.jsx";
import Button from "../components/ui/Button.jsx";

/** ---------- Small page components ---------- */

function Tabs({ tabs, activeKey, onChange }) {
  return (
    <div className="inline-flex p-1 bg-slate-100 rounded-lg">
      {tabs.map((t) => {
        const active = t.key === activeKey;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={[
              "px-6 py-2 rounded-md text-sm transition-colors",
              active
                ? "bg-white text-primary shadow-sm ring-1 ring-slate-200 font-bold"
                : "text-slate-500 hover:text-slate-700 font-medium",
            ].join(" ")}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

function PageHeader({ activeTab, onTabChange, counts, onHistory, onCreate }) {
  const tabs = useMemo(
    () => [
      { key: "active", label: `Active Sessions (${counts.active})` },
      { key: "completed", label: "Completed" },
      { key: "drafts", label: "Drafts" },
    ],
    [counts]
  );

  return (
    <div className="bg-white border-b border-slate-200 py-6">
      <div className="max-w-[1600px] mx-auto px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-5xl font-medium tracking-tight text-slate-900 mb-6">
            My Classes
          </h1>
          <Tabs tabs={tabs} activeKey={activeTab} onChange={onTabChange} />
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={onCreate}>
            <span className="material-symbols-outlined text-lg">add</span>
            Create New Session
          </Button>
        </div>
      </div>
    </div>
  );
}

function SessionsGrid({ sessions, onJoin, onCreateTopic }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
      {sessions.map((s) => (
        <SessionCard key={s.id} session={s} onCta={() => onJoin(s)} />
      ))}

      <CreateTopicCard
        title="Schedule New Session"
        description="Pick a topic and invite peers"
        onClick={onCreateTopic}
      />
    </div>
  );
}


export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("active");

  // Replace this with real data (query/loader/etc)
  const allSessions = useMemo(
    () => [
      {
        id: "1",
        topic: "GAN Models",
        title: "GAN Models",
        description:
          "Master Generative Adversarial Networks by teaching the core architecture and loss functions.",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCPiJLvGmOr7h_mDNaLmUyRKBbu0okoFKXUaN8ovzFfidDKyFnovdZE4Mm18KC2tNh4kpTQNQ1-YCZPgRwTRR7qjMqqrgglPRkRlqCFs6MuPT_yKt8YmqxXxuNkznig-rLnNXz0mkbaDXjCLnr6AYNtLcMITWV9qwOwNJpJd6Cimjy-UrdlLdFTpykMoKWrk_DEZ2aeOrD72tA0y_5eYw3IZv3Meg9Bud9-Si5QBXcWWK3UdOFH0caL31EXCs54yCnZShuWhIx_M1Q",
        dateLabel: "15 mins left",
        status: "active",
        teacher: {
          name: "Prof. Henderson",
          avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAtKoRJvGdeDO9bllNk6BGClcR6SM7dlXw1rch8cXFXsVazBABq-owzNrMCjk5P-BY6nY3Sg8UgRznRLHoxpKT_TJBHIK0aIyrR5grG0Lpo0JQgHhXF-G9q6eliHVWOZGZDvqoDJkpbD9GA_e47FTlNbWaDNWE33Hiomd_XjqLhW2htiL26bGhJQCmqROVfNCYMy1iChZ_taK-5xrhRid8YMhv6rKy0qBRSOoptcLSWM_TyVs6YhdZTMn5Glksx8vn5LNQVPhFU1Aw",
        },
        cta: { label: "Join Zoom", disabled: false },
      },
      {
        id: "2",
        topic: "AI Mysticism",
        title: "Secrets of AI Mysticism",
        description:
          "Exploring the philosophical boundaries of machine consciousness and the Turing test.",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDEsf-lKt0fW5qqTs3SV6UtvorrQZUtteey8SKsndOgcSpyzM_HI10MpteDV7J8coo-XWIdr_ZpIWaKRgo-sJYCSZmFDYuuUz4T1JYP_18dauID1aP9hi3b0IYfNVj-K9BOnR7JlMNzX9Eix2ko2EKN9s8sHNqqhSOIZBPsLRThXp5t2NGXD3egvFNNUfvRpAFW-eV8bOPGif3yEXCDaRJeUAc4tolSgW9RuPig9SDzWgquG0B4tLieLC3fnxXtIcmUeciFRJ2dnrM",
        dateLabel: "In 2 hours",
        status: "active",
        teacher: {
          name: "Prof. Henderson",
          avatar:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAtKoRJvGdeDO9bllNk6BGClcR6SM7dlXw1rch8cXFXsVazBABq-owzNrMCjk5P-BY6nY3Sg8UgRznRLHoxpKT_TJBHIK0aIyrR5grG0Lpo0JQgHhXF-G9q6eliHVWOZGZDvqoDJkpbD9GA_e47FTlNbWaDNWE33Hiomd_XjqLhW2htiL26bGhJQCmqROVfNCYMy1iChZ_taK-5xrhRid8YMhv6rKy0qBRSOoptcLSWM_TyVs6YhdZTMn5Glksx8vn5LNQVPhFU1Aw",
        },
        cta: { label: "Join Zoom", disabled: true },
      },
    ],
    []
  );

  const counts = useMemo(() => {
    const active = allSessions.filter((s) => s.status === "active").length;
    const completed = allSessions.filter((s) => s.status === "completed").length;
    const drafts = allSessions.filter((s) => s.status === "draft").length;
    return { active, completed, drafts };
  }, [allSessions]);

  const sessionsForTab = useMemo(() => {
    if (activeTab === "active") return allSessions.filter((s) => s.status === "active");
    if (activeTab === "completed") return allSessions.filter((s) => s.status === "completed");
    return allSessions.filter((s) => s.status === "draft");
  }, [allSessions, activeTab]);

  function handleJoin(session) {
    // wire up to your routing / zoom join / etc
    console.log("CTA clicked:", session.id);
  }

  function handleCreateTopic() {
    console.log("Create topic/session clicked");
  }

  function handleHistory() {
    console.log("History clicked");
  }

  function handleCreateSession() {
    console.log("Create new session clicked");
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Use YOUR app header component */}
      <Header />

      {/* Page header from the HTML mock */}
      <PageHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={counts}
        onHistory={handleHistory}
        onCreate={handleCreateSession}
      />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto px-8 py-10">
          <SessionsGrid
            sessions={sessionsForTab}
            onJoin={handleJoin}
            onCreateTopic={handleCreateTopic}
          />
        </div>
      </main>
    </div>
  );
}