import React from "react";
import SearchBar from "../../ui/SearchBar"
import TopicPills from "./TopicPills";

export default function BrowseHero({
  query,
  onQueryChange,
  onSearch,
  topics,
  activeTopic,
  onTopicChange,
}) {
  return (
    <section className="bg-navy-deep py-16 px-6 relative overflow-hidden">
      {/* glow */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-orange rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-8 font-serif">
          What do you want to master today?
        </h1>

        <SearchBar value={query} onChange={onQueryChange} onSearch={onSearch} />

        <TopicPills
          topics={topics}
          active={activeTopic}
          onChange={onTopicChange}
        />
      </div>
    </section>
  );
}