import React from "react";
import Icon from "./Icon.jsx";

export default function Logo({ compact = false, textColor="" }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`size-9 flex items-center justify-center bg-primary text-white border border-black shadow-hard`}>
        <Icon name="auto_stories" className="text-xl" />
      </div>
      {!compact && (
        <h2 className={`text-xl font-bold tracking-tight ${textColor}`}>PeerMaster</h2>
      )}
    </div>
  );
}