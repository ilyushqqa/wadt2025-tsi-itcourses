import React from "react";

export default function Footer() {
  return (
    <footer className="container">
      <p>
        © {new Date().getFullYear()} ITCourses. All rights reserved.
      </p>
    </footer>
  );
}

