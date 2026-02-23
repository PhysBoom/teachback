import React from "react";
import Icon from "../ui/Icon.jsx";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/60 py-16 px-6 bg-navy-deep relative z-10">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1">
          <div className="flex items-center gap-3 text-primary mb-6">
            <Icon name="auto_stories" className="text-2xl" />
            <h2 className="text-white text-xl font-bold tracking-tight">PeerMaster</h2>
          </div>
          <p className="text-slate-500 font-medium text-sm leading-relaxed">
            Redefining how the world learns through collaboration and the Feynman Technique.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">Platform</h4>
          <ul className="flex flex-col gap-3 text-sm font-medium text-slate-500">
            <li><a className="hover:text-primary transition-colors" href="#">Topics</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Circles</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Resources</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">Company</h4>
          <ul className="flex flex-col gap-3 text-sm font-medium text-slate-500">
            <li><a className="hover:text-primary transition-colors" href="#">Our Story</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Philosophy</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-xs uppercase tracking-widest">
            Stay Connected
          </h4>
          <div className="flex gap-3">
            <div className="w-10 h-10 border border-slate-800 flex items-center justify-center rounded-lg hover:border-primary cursor-pointer text-slate-500 hover:text-primary transition-all">
              <Icon name="public" className="text-xl" />
            </div>
            <div className="w-10 h-10 border border-slate-800 flex items-center justify-center rounded-lg hover:border-accent-orange cursor-pointer text-slate-500 hover:text-accent-orange transition-all">
              <Icon name="alternate_email" className="text-xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto mt-16 pt-8 border-t border-slate-800/40 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
          © 2024 PEERMASTER. OPEN TO ALL MINDS.
        </p>
        <div className="flex gap-6">
          <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:text-slate-400">
            PRIVACY
          </p>
          <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:text-slate-400">
            TERMS
          </p>
        </div>
      </div>
    </footer>
  );
}