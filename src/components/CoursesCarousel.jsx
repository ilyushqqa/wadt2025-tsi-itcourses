import React, { useEffect, useRef } from "react";

export default function CoursesCarousel({ courses, index, setIndex, onEnroll }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[index];
    if (!child) return;
    const left = child.offsetLeft - (track.clientWidth - child.clientWidth) / 2;
    track.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [index]);

  return (
    <section id="courses" className="container carousel">
      <h2 style={{ margin: "0 0 12px" }}>Popular Front‑End Courses</h2>
      <div ref={trackRef} className="track">
        {courses.map((c, i) => (
          <article key={c.id} className="card" onMouseEnter={() => setIndex(i)}>
            <div className="cover" style={{ backgroundImage: `url(${c.cover})` }} />
            <div className="body">
              <h3>{c.title}</h3>
              <div className="meta">
                <span className="chip">{c.level}</span>
                <span className="chip">Duration: 4 weeks</span>
              </div>
              <p style={{ opacity: 0.85 }}>{c.blurb}</p>
              <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                <button className="btn brand" onClick={onEnroll}>Book now</button>
                <button className="btn" onClick={() => setIndex(i)}>Details</button>                
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="dots">
        {courses.map((_, i) => (
          <button
            key={i}
            className={`dot ${index === i ? "active" : ""}`}
            aria-label={`Slide ${i + 1}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}

