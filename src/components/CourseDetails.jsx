import React from "react";

export default function CourseDetails({ details }) {
  if (!details) return null;
  const { description, bullets } = details;

  return (
    <div className="details-panel">
      {description && <p className="details-lead">{description}</p>}
      {Array.isArray(bullets) && bullets.length > 0 && (
        <ul className="details-list">
          {bullets.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

