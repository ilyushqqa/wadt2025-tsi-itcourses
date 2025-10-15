import React, { useRef, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./lib/firebase";

import useCarousel from "./hooks/useCarousel";
import courseCatalog from "./data/courses";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import CoursesCarousel from "./components/CoursesCarousel";
import Teachers from "./components/Teachers";
import Sponsors from "./components/Sponsors";

import Schedule from "./components/Schedule";
import Signup from "./components/Signup";
import Footer from "./components/Footer";

export default function App() {
  const [carIndex, setCarIndex] = useCarousel(courseCatalog.length);
  const [monthCursor, setMonthCursor] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const scheduleRef = useRef(null);

  const scrollToSchedule = () => {
    if (scheduleRef.current) {
      scheduleRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleBookNow = (courseIndex) => {
    setCarIndex(courseIndex);
    setSelectedCourseIndex(courseIndex);
    setSelectedDate(null);
    setNotice("");
    scrollToSchedule();
  };

  const enroll = async () => {
    if (!selectedDate) {
      setNotice("Pick a date on the calendar.");
      return;
    }
    setSaving(true);
    try {
      await addDoc(collection(db, "enrollments"), {
        course: courseCatalog[selectedCourseIndex].id,
        date: selectedDate.toISOString().split("T")[0],
        ts: serverTimestamp(),
      });
      setNotice("Seat reserved! We'll email details.");
    } catch (err) {
      console.error(err);
      setNotice("Couldn't reserve, try again.");
    } finally {
      setSaving(false);
      setTimeout(() => setNotice(""), 3000);
    }
  };

  return (
    <>
      <Nav />
      <Hero />
      <CoursesCarousel
        courses={courseCatalog}
        index={carIndex}
        setIndex={setCarIndex}
        onBook={handleBookNow}
      />
      <Teachers />
      <Sponsors/>
      <Schedule
        ref={scheduleRef}
        monthCursor={monthCursor}
        setMonthCursor={setMonthCursor}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        currentCourseTitle={courseCatalog[selectedCourseIndex].title}
        onReserve={enroll}
        notice={notice}
        saving={saving}
      />
      <Signup />
      <Footer />
    </>
  );
}

