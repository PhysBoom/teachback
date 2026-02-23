import React from "react";

export default function Container({ className = "", children }) {
  return <div className={`max-w-[1200px] mx-auto px-6 ${className}`}>{children}</div>;
}