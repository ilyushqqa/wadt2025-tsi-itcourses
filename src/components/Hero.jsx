import React from "react";

export default function Hero() {
  return (
    <header className="hero">
      <div className="content container">
        <div className="chip">Hands‑on • Job‑ready • Front‑End</div>
        <h1 className="headline">Learn Together. Build the Future.</h1>
        <p className="sub">
          Study with passionate mentors, collaborate with peers, and grow your skills.
        </p>
        <div className="cta-row">
          <a className="btn brand" href="#courses">Browse Courses</a>
          <a className="btn" href="#signup">Get Early Access</a>
        </div>
      </div>
    </header>
  );
}

