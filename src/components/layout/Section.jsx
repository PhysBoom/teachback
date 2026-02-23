import React from "react";
import Container from "./Container.jsx";

export default function Section({ className = "", containerClassName = "", children }) {
  return (
    <section className={className}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}