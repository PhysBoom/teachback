import React, { useState, useContext } from "react";
import Button from "../components/ui/Button";
import Logo from "../components/ui/Logo";
import { useNavigate } from "react-router-dom";
import GoogleButton from "../components/ui/signup/GoogleButton";
import SignupTextField from "../components/ui/signup/SignupTextField";
import Divider from "../components/ui/signup/Divider";
import { AuthContext } from "../contexts/auth/AuthContext";

function LeftPanel({ isSigningUp}) {
  return (
    <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden border-r border-slate-800/50 bg-navy-deep">
      <Logo />

      <div className="relative z-10 max-w-lg">
        <h1 className="text-white text-6xl font-bold leading-tight tracking-tight mb-8 font-serif">
          {isSigningUp ? 
          <>
          Start your <br />
          <span className="text-primary italic">teaching</span> journey.
          </> : 
          <>
          Welcome <br />
          <span className="text-primary italic">back</span>
          </>}
        </h1>

        {isSigningUp ? <div className="flex items-center gap-4 p-6 bg-navy-dark/40 border border-slate-800 rounded-2xl backdrop-blur-sm">
          <div className="flex -space-x-3">
            <div className="w-10 h-10 rounded-full border-2 border-navy-deep bg-slate-700" />
            <div className="w-10 h-10 rounded-full border-2 border-navy-deep bg-slate-600" />
            <div className="w-10 h-10 rounded-full border-2 border-navy-deep bg-primary flex items-center justify-center text-[10px] font-bold text-white">
            </div>
          </div>
          <div>
            <p className="text-white font-bold text-sm">Join our community</p>
            <p className="text-slate-500 text-xs">
              Mastering subjects through peer teaching.
            </p>
          </div>
        </div>
        : <p className="text-slate-400 text-xl font-medium mb-12 max-w-md">Continue your mastery through teaching</p>    
    }
      </div>

      <footer className="relative z-10">
        <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
          © {new Date().getFullYear()} PEERMASTER. OPEN TO ALL MINDS.
        </p>
      </footer>
    </div>
  );
}

function SignUpForm({ isSigningUp, setIsSigningUp}) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);

  function onSubmit(e) {
    e.preventDefault();
    auth.login({ name, email });
    navigate("/dashboard");
  }

  function onGoogle() {
    auth.logInWithGoogle();
    navigate("/dashboard");
  }

  return (
    <div className="w-full max-w-md">
      <div className="lg:hidden mb-10">
        <Logo textColor="text-navy-dark" />
      </div>

      <div className="mb-10 text-center lg:text-left">
        <h2 className="text-navy-deep text-3xl font-bold mb-2 font-serif">
          {isSigningUp ? "Create your account" : "Log in to Teachback"}
        </h2>
        <p className="text-slate-500 font-medium">
          {isSigningUp ? "Already have an account? " : "Don't have an account? "}
          <a className="text-primary font-bold hover:underline cursor-pointer" onClick={() => setIsSigningUp(!isSigningUp)}>
            {isSigningUp ? "Log in" : "Sign up"}
          </a>
        </p>
      </div>

      <div className="space-y-6">
        <GoogleButton onClick={onGoogle} isSigningUp={isSigningUp} />
        <Divider />

        <form className="space-y-4" onSubmit={onSubmit}>
          <SignupTextField
            label="Full Name"
            id="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <SignupTextField
            label="Email Address"
            id="email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <SignupTextField
            label="Password"
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="pt-4">
              <Button type="submit" size="md" className="w-full">
                {isSigningUp ? "Create Account" : "Log In"}
              </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  const [isSigningUp, setIsSigningUp] = useState(true);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <LeftPanel isSigningUp={isSigningUp} setIsSigningUp={setIsSigningUp} />

      <div className="bg-white text-navy-deep flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 py-12">
        <SignUpForm isSigningUp={isSigningUp} setIsSigningUp={setIsSigningUp} />
      </div>
    </div>
  );
}