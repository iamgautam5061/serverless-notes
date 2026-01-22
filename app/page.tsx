"use client";

import { useEffect, useState } from "react";

const API_URL =
  "https://9sdstozsk2.execute-api.ap-south-1.amazonaws.com/prod/notes";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchNotes() {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      console.error("Failed to fetch notes");
    }
    setLoading(false);
  }

  async function addNote() {
    if (!text.trim()) return;

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    setText("");
    fetchNotes();
  }

  async function deleteNote(noteId) {
    await fetch(API_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ noteId }),
    });

    fetchNotes();
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.title}>Serverless Notes</h1>
        <p style={styles.subtitle}>
          A fast, serverless web app built with AWS & Next.js
        </p>
      </header>

      <div style={styles.card}>
        <div style={styles.inputRow}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a note and press Add"
            style={styles.input}
          />
          <button onClick={addNote} style={styles.addButton}>
            Add
          </button>
        </div>

        {loading ? (
          <p style={styles.info}>Loading notes…</p>
        ) : notes.length === 0 ? (
          <p style={styles.info}>No notes yet. Add your first one 👆</p>
        ) : (
          <ul style={styles.list}>
            {notes.map((n) => (
              <li key={n.noteId} style={styles.noteItem}>
                <span>{n.text}</span>
                <button
                  onClick={() => deleteNote(n.noteId)}
                  style={styles.deleteButton}
                  title="Delete note"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f8",
    padding: "30px 16px",
  },
  header: {
    maxWidth: 520,
    margin: "0 auto 20px",
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: 28,
  },
  subtitle: {
    marginTop: 6,
    color: "#555",
    fontSize: 14,
  },
  card: {
    background: "#fff",
    maxWidth: 520,
    margin: "0 auto",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  inputRow: {
    display: "flex",
    gap: 10,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 15,
  },
  addButton: {
    padding: "10px 16px",
    borderRadius: 6,
    border: "none",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontSize: 15,
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  noteItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#f9fafb",
    padding: "10px 12px",
    borderRadius: 6,
    marginBottom: 8,
  },
  deleteButton: {
    background: "none",
    border: "none",
    color: "#dc2626",
    cursor: "pointer",
    fontSize: 14,
  },
  info: {
    textAlign: "center",
    color: "#666",
    fontSize: 14,
  },
};
