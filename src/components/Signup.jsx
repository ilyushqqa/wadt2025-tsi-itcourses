import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { addDoc, collection, onSnapshot, serverTimestamp } from "firebase/firestore";

export default function Signup() {
  const [leads, setLeads] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "leads"), (snap) => {
      const rows = snap
        .docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .sort((a, b) => (b.ts?.seconds || 0) - (a.ts?.seconds || 0));
      setLeads(rows);
    });
    return () => unsub();
  }, []);

  const submitLead = async (e) => {
    e?.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "leads"), {
        name: name || null,
        email,
        from: "landing",
        ts: serverTimestamp(),
      });
      setNotice("Thanks! You're on the list.");
      setName("");
      setEmail("");
    } catch (err) {
      console.error(err);
      setNotice("Something went wrong. Try again.");
    } finally {
      setLoading(false);
      setTimeout(() => setNotice(""), 3000);
    }
  };

  return (
    <section id="signup" className="container" style={{ marginTop: 40 }}>
      <div className="panel" style={{ display: "grid", gap: 20 }}>
        <div>
          <h2 style={{ margin: "0 0 6px" }}>Join the waitlist</h2>
          <p className="sub" style={{ margin: 0 }}>
            Get syllabus, scholarship news and early access invites straight to your inbox.
          </p>
        </div>
        <form className="form" onSubmit={submitLead}>
          <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr" }}>
            <input className="input" placeholder="Your name (optional)" value={name} onChange={(e) => setName(e.target.value)} />
            <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr min-content" }}>
              <input className="input" type="email" required placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button className="btn brand" disabled={loading} type="submit">{loading ? "Sending…" : "Notify me"}</button>
            </div>
          </div>
          {notice && (
            <div className="chip" style={{ borderColor: "transparent", background: "rgba(34,211,238,.15)", color: "#dff9ff" }}>
              {notice}
            </div>
          )}
        </form>

        <div>
          <h3 style={{ margin: "8px 0 10px" }}>Latest sign‑ups (live from Firebase)</h3>
          <ul className="list">
            {leads.length === 0 && (
              <li><span>No sign‑ups yet. Be the first!</span></li>
            )}
            {leads.slice(0, 6).map((row) => (
              <li key={row.id}>
                <span>{row.email}</span>
                <span style={{ color: "var(--muted)" }}>
                  {row.ts?.seconds ? new Date(row.ts.seconds * 1000).toLocaleString() : "just now"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

