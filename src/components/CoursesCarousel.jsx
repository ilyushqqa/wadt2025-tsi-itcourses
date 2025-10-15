import React, { useEffect, useRef, useState } from "react";
import CourseDetails from "./CourseDetails";
import courseDetails from "../data/courseDetails";

export default function CoursesCarousel({ courses, index, setIndex, onBook }) {
  const trackRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[index];
    if (!child) return;
    const left = child.offsetLeft - (track.clientWidth - child.clientWidth) / 2;
    track.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [index]);

  const handleToggleDetails = (cardIndex) => {
    setIndex(cardIndex);
    setExpandedIndex((prev) => (prev === cardIndex ? null : cardIndex));
  };

  return (
    <section id="courses" className="container carousel">
      <h2 style={{ margin: "0 0 12px" }}>Popular Front-End Courses</h2>
      <div ref={trackRef} className="track">
        {courses.map((course, courseIndex) => {
          const isExpanded = expandedIndex === courseIndex;
          const details = courseDetails[course.id];
          return (
            <article
              key={course.id}
              className={`card ${isExpanded ? "card-expanded" : ""}`}
              onMouseEnter={() => setIndex(courseIndex)}
            >
              <div className="cover" style={{ backgroundImage: `url(${course.cover})` }} />
              <div className="body">
                <h3>{course.title}</h3>
                <div className="meta">
                  <span className="chip">{course.level}</span>
                  <span className="chip">Duration: 4 weeks</span>
                </div>
                <p style={{ opacity: 0.85 }}>{course.blurb}</p>
                <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                  <button className="btn brand" onClick={() => onBook && onBook(courseIndex)}>
                    Book now
                  </button>
                  <button className="btn" onClick={() => handleToggleDetails(courseIndex)}>
                    {isExpanded ? "Hide details" : "Details"}
                  </button>
                </div>
                {isExpanded && <CourseDetails details={details} />}
              </div>
            </article>
          );
        })}
      </div>
      <div className="dots">
        {courses.map((_, dotIndex) => (
          <button
            key={dotIndex}
            className={`dot ${index === dotIndex ? "active" : ""}`}
            aria-label={`Slide ${dotIndex + 1}`}
            onClick={() => setIndex(dotIndex)}
          />
        ))}
      </div>
    </section>
  );
}

