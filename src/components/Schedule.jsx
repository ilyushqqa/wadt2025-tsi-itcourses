import React from "react";
import { buildMonth, months, weekdays } from "../utils/calendar";

export default function Schedule({
  monthCursor,
  setMonthCursor,
  selectedDate,
  setSelectedDate,
  currentCourseTitle,
  onReserve,
  notice,
}) {
  const monthCells = buildMonth(monthCursor);

  return (
    <section id="schedule" className="container">
      <div className="panel">
        <div className="cal-head">
          <h2 style={{ margin: 0 }}>Pick a Workshop Date</h2>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              className="btn"
              onClick={() => setMonthCursor((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
            >
              ◀ Prev
            </button>
            <div className="chip">
              {months[monthCursor.getMonth()]} {monthCursor.getFullYear()}
            </div>
            <button
              className="btn"
              onClick={() => setMonthCursor((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
            >
              Next ▶
            </button>
          </div>
        </div>

        <div className="grid" style={{ marginTop: 10 }}>
          {weekdays.map((w) => (
            <div
              key={w}
              className="cell muted"
              style={{ aspectRatio: "auto", fontWeight: 700, background: "transparent", border: "none" }}
            >
              {w}
            </div>
          ))}
          {monthCells.map(({ date, inMonth }, idx) => {
            const isPast = date < new Date(new Date().toDateString());
            const selectable = inMonth && !isPast;
            const isSel = selectedDate && date.toDateString() === selectedDate.toDateString();
            return (
              <div
                key={idx}
                className={`cell ${inMonth ? "" : "muted"} ${selectable ? "pickable" : ""} ${isSel ? "selected" : ""}`}
                onClick={() => selectable && setSelectedDate(date)}
              >
                {date.getDate()}
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
          <div className="legend">
            <span className="chip">Course:</span>
            <strong>{currentCourseTitle}</strong>
            {selectedDate && (
              <span className="chip">Date: {selectedDate.toISOString().split("T")[0]}</span>
            )}
          </div>
          <button className="btn brand" onClick={onReserve}>Reserve this date</button>
        </div>

        {notice && (
          <div style={{ marginTop: 12 }}>
            <div className="chip" style={{ borderColor: "transparent", background: "rgba(34,211,238,.15)", color: "#dff9ff" }}>
              {notice}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

