import React, { useState } from "react";
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

  const enroll = async () => {
    if (!selectedDate) {
      setNotice("Pick a date on the calendar.");
      return;
    }
    setSaving(true);
    try {
      await addDoc(collection(db, "enrollments"), {
        course: courseCatalog[carIndex].id,
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
        onEnroll={enroll}
      />
      <Teachers />
      <Sponsors/>
      <Schedule
        monthCursor={monthCursor}
        setMonthCursor={setMonthCursor}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        currentCourseTitle={courseCatalog[carIndex].title}
        onReserve={enroll}
        notice={notice}
        saving={saving}
      />
      <Signup />
      <Footer />
    </>
  );
}

