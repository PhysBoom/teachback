import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header"; // keep if you already have it
import Button from "../components/ui/Button"; // your polymorphic Button (optional). If you don't have it, replace with <button> tags.
import Logo from "../components/ui/Logo";

function Divider({ label = "Or with email" }) {
  return (
    <div className="relative flex items-center py-2">
      <div className="flex-grow border-t border-slate-200" />
      <span className="flex-shrink mx-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
        {label}
      </span>
      <div className="flex-grow border-t border-slate-200" />
    </div>
  );
}

function TextField({ label, id, type = "text", placeholder, value, onChange }) {
  return (
    <div>
      <label
        className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-navy-deep font-medium placeholder:text-slate-400"
      />
    </div>
  );
}

function GoogleButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 py-3.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-bold text-slate-700"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
      Sign up with Google
    </button>
  );
}

function LeftPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden border-r border-slate-800/50 bg-navy-deep">
      <Header showLogoOnly />

      <div className="relative z-10 max-w-lg">
        <h1 className="text-white text-6xl font-bold leading-tight tracking-tight mb-8 font-serif">
          Start your <br />
          <span className="text-primary italic">teaching</span> journey.
        </h1>

        <div className="flex items-center gap-4 p-6 bg-navy-dark/40 border border-slate-800 rounded-2xl backdrop-blur-sm">
          <div className="flex -space-x-3">
            <div className="w-10 h-10 rounded-full border-2 border-navy-deep bg-slate-700" />
            <div className="w-10 h-10 rounded-full border-2 border-navy-deep bg-slate-600" />
            <div className="w-10 h-10 rounded-full border-2 border-navy-deep bg-primary flex items-center justify-center text-[10px] font-bold text-white">
              50K+
            </div>
          </div>
          <div>
            <p className="text-white font-bold text-sm">Join 50,000+ learners</p>
            <p className="text-slate-500 text-xs">
              Mastering subjects through peer teaching.
            </p>
          </div>
        </div>
      </div>

      <footer className="relative z-10">
        <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} PEERMASTER. OPEN TO ALL MINDS.
        </p>
      </footer>
    </div>
  );
}

function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    // TODO: hook into your auth flow
    console.log({ name, email, password });
  }

  function onGoogle() {
    // TODO: hook into Google OAuth
    console.log("Google signup");
  }

  return (
    <div className="w-full max-w-md">
      <div className="lg:hidden mb-10">
        <Logo textColor="text-navy-dark" />
      </div>

      <div className="mb-10 text-center lg:text-left">
        <h2 className="text-navy-deep text-3xl font-bold mb-2 font-serif">
          Create an account
        </h2>
        <p className="text-slate-500 font-medium">
          Already have an account?{" "}
          <Link className="text-primary font-bold hover:underline" to="/login">
            Log in
          </Link>
        </p>
      </div>

      <div className="space-y-6">
        <GoogleButton onClick={onGoogle} />
        <Divider />

        <form className="space-y-4" onSubmit={onSubmit}>
          <TextField
            label="Full Name"
            id="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email Address"
            id="email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="pt-4">
            {/* If you have your Button component, use it. Otherwise swap to <button> */}
            {Button ? (
              <Button type="submit" size="md" className="w-full">
                Create Account
              </Button>
            ) : (
              <button
                type="submit"
                className="w-full py-4 bg-primary text-white font-bold text-lg border border-black shadow-hard hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
              >
                Create Account
              </button>
            )}
          </div>
        </form>

        <p className="text-center text-slate-400 text-[10px] leading-relaxed">
          By signing up, you agree to our{" "}
          <Link className="underline" to="/terms">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link className="underline" to="/privacy">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <LeftPanel />

      <div className="bg-white text-navy-deep flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 py-12">
        {/* keep your existing header if you want it on the right side too */}
        {/* <Header /> */}
        <SignUpForm />
      </div>
    </div>
  );
}