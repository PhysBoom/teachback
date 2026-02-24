import Logo from "../ui/Logo.jsx";
import Button from "../ui/Button.jsx";

export default function Header({ showLogoOnly = false, className="", logoTextColor="" }) {
  return (
    <header className={`flex items-center justify-between border-b border-slate-800/60 px-6 md:px-12 py-5 sticky top-0 bg-navy-deep backdrop-blur-md z-50 ${className}`}>
      <Logo textColor={logoTextColor} />

      {!showLogoOnly && 
        <div className="hidden md:flex flex-1 justify-end gap-10">
            <div className="flex gap-4">
            <Button size="sm" variant="primary" as="a" to="/signup">
                Get Started Free
            </Button>
            <Button size="sm" variant="ghost" as="a" to="/classes">
                Browse Classes
            </Button>
            </div>
        </div>
      }
    </header>
  );
}