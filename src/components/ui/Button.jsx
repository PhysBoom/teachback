import React from "react";
import { Link } from "react-router-dom";
import { cn } from "../../utils";

const VARIANTS = {
  primary:
    "bg-primary text-white border border-black shadow-hard hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all",
  secondary:
    "bg-transparent text-slate-300 border border-slate-700 hover:bg-white/5 transition-all",
  ghost: "text-slate-300 hover:text-white transition-colors",
};

const SIZES = {
  sm: "px-5 py-2 text-sm font-bold",
  md: "h-14 px-8 text-lg font-bold",
  lg: "px-10 py-5 text-xl font-bold",
};

export default function Button({
  as = "button",
  variant = "primary",
  size = "sm",
  className = "",
  children,
  ...props
}) {
  // If `as="a"` use React Router Link
  const Comp = as === "a" ? Link : as;

  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center",
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}