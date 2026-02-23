import React from "react";
import Logo from "../ui/Logo.jsx";
import Button from "../ui/Button.jsx";

const NAV = [
  { label: "How it Works", href: "#" },
  { label: "Community", href: "#" },
  { label: "Pricing", href: "#" },
];

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-slate-800/60 px-6 md:px-12 py-5 sticky top-0 bg-navy-deep/80 backdrop-blur-md z-50">
      <Logo />

      <div className="hidden md:flex flex-1 justify-end gap-10">
        <nav className="flex items-center gap-8">
          {NAV.map((item) => (
            <a
              key={item.label}
              className="text-slate-400 text-sm font-medium hover:text-primary transition-colors"
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex gap-4">
          <Button size="sm" variant="primary">
            Get Started Free
          </Button>
          <Button size="sm" variant="ghost">
            Log In
          </Button>
        </div>
      </div>
    </header>
  );
}