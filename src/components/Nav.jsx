import React from "react";
import useHideOnScroll from "../hooks/useHideOnScroll";

export default function Nav() {
  const hideNav = useHideOnScroll();
  return (
    <nav className={`nav ${hideNav ? "hide" : ""}`}>
      <div className="container inner">
        <div className="logo">CourseIt</div>
        <div>
          <a href="#courses">Courses</a>
          <a href="#schedule">Schedule</a>
          <a href="#signup">Sign up</a>
        </div>
      </div>
    </nav>
  );
}

