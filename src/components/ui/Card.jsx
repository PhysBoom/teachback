import React from "react";
import { cn } from "../../utils";

export default function Card({ className = "", children }) {
  return (
    <div className={cn("rounded-2xl border", className)}>
      {children}
    </div>
  );
}