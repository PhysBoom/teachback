import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/layout/Header";
import BrowseHero from "../components/layout/browse/BrowseHero";
import SessionsSection from "../components/layout/browse/SessionsSection";
import Footer from "../components/layout/Footer";
import { getSessions } from "../services/api";

export default function BrowseClassesPage() {
  const [query, setQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState("All Topics");
  const topics = ["All Topics", "Science", "AI", "Humanities", "Psychology", "Design"]
  const [sessions, setSessions] = useState([]);

  async function loadSessions() {
    setSessions(await getSessions());
  }

  useEffect(() => {
    loadSessions();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return sessions.filter((s) => {
      const topics = Array.isArray(s.topics) ? s.topics : [];

      const matchesTopic =
        activeTopic === "All Topics"
          ? true
          : topics.some(
              (t) => t.toLowerCase() === activeTopic.toLowerCase()
            );

      const matchesQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        topics.some((t) => t.toLowerCase().includes(q));

      return matchesTopic && matchesQuery;
    });
  }, [sessions, query, activeTopic]);

  return (
    <div className="flex flex-col min-h-screen w-full bg-slate-50">
      <Header />

      <main className="flex-1">
        <BrowseHero
          query={query}
          onQueryChange={setQuery}
          onSearch={() => {}}
          topics={topics}
          activeTopic={activeTopic}
          onTopicChange={setActiveTopic}
        />

        <SessionsSection
          title="Upcoming Sessions"
          sessions={filtered}
        />
      </main>

      <Footer />
    </div>
  );
}