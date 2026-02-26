import Header from "../components/layout/Header.jsx";

import SessionCard from "../components/ui/session-card/SessionCard.jsx";
import CreateTopicCard from "../components/ui/CreateTopicCard.jsx";
import Button from "../components/ui/Button.jsx";
import { useEffect, useState } from "react";
import { listTeachers, getSessions } from "../services/api.js";

function PageHeader() {
  return (
    <div className="bg-white border-b border-slate-200 py-6">
      <div className="max-w-[1600px] mx-auto px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h1 className="font-display text-5xl font-medium tracking-tight text-slate-900 mb-6">
            My Classes
          </h1>

        <div className="flex items-center gap-3">
          <Button as="a" to="/classes">
            Find Classes
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
        <SessionCard key={s.id} session={s} onCta={() => onJoin(s)} showEditMenu={true} />
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
  const [sessions, setSessions] = useState([]);

  async function loadSessions() {
    const teachers = await listTeachers();
    const me = teachers[0]; // hardcoded "logged in" teacher
    
    const sessions = await getSessions(me.id);
    setSessions(sessions);
  }

  useEffect(() => {
    loadSessions();
  }, []);

  function handleJoin(session) {
    // wire up to your routing / zoom join / etc
    console.log("CTA clicked:", session.id);
  }

  function handleCreateTopic() {
    console.log("Create topic/session clicked");
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <PageHeader />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1600px] mx-auto px-8 py-10">
          <SessionsGrid
            sessions={sessions}
            onJoin={handleJoin}
            onCreateTopic={handleCreateTopic}
          />
        </div>
      </main>
    </div>
  );
}