import React from "react";

export default function SiteShell({ children }) {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden geometric-overlay">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-5%] right-[-5%] w-[35%] h-[50%] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[25%] h-[40%] bg-accent-orange/5 rounded-full blur-[80px]" />
        <div className="absolute top-[15%] left-[5%] w-24 h-24 border border-primary/10 rotate-12" />
        <div className="absolute bottom-[15%] right-[10%] w-16 h-16 border border-accent-orange/10 -rotate-12" />
      </div>

      <div className="flex h-full grow flex-col relative z-10">{children}</div>
    </div>
  );
}