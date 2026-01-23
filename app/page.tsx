"use client";

import { useEffect, useState } from "react";

const API_URL =
  "https://9sdstozsk2.execute-api.ap-south-1.amazonaws.com/prod/notes";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [nextToken, setNextToken] = useState(null);

  function formatTime(ts) {
    return ts ? new Date(ts).toLocaleString() : "";
  }

  async function fetchNotes(loadMore = false) {
    const url =
      loadMore && nextToken
        ? `${API_URL}?nextToken=${nextToken}`
        : API_URL;

    const res = await fetch(url);
    const data = await res.json();

    const items = data.items || data;
    setNotes((prev) => (loadMore ? [...prev, ...items] : items));
    setNextToken(data.nextToken || null);
  }

  async function addNote() {
    if (!text.trim()) return;

    const now = Date.now();
    const tempNote = {
      noteId: "temp-" + now,
      text,
      createdAt: now,
      updatedAt: now,
    };

    setNotes((prev) => [tempNote, ...prev]);
    setText("");

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    fetchNotes();
  }

  async function deleteNote(noteId) {
    setNotes((prev) => prev.filter((n) => n.noteId !== noteId));

    await fetch(API_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ noteId }),
    });
  }

  async function saveEdit(noteId) {
    await fetch(API_URL, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ noteId, text: editingText }),
    });

    setEditingId(null);
    setEditingText("");
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
          A fast, serverless notes app built with AWS & Next.js
        </p>
      </header>

      <div style={styles.card}>
        <div style={styles.inputRow}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a new note…"
            style={styles.input}
          />
          <button onClick={addNote} style={styles.primaryBtn}>
            Add
          </button>
        </div>

        <ul style={styles.list}>
          {notes.map((n) => (
            <li key={n.noteId} style={styles.noteItem}>
              {editingId === n.noteId ? (
                <>
                  <input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    style={styles.editInput}
                  />
                  <button
                    onClick={() => saveEdit(n.noteId)}
                    style={styles.primaryBtn}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <div style={styles.noteText}>{n.text}</div>
                    <div style={styles.timestamp}>
                      Created: {formatTime(n.createdAt)}
                      {n.updatedAt !== n.createdAt &&
                        ` • Updated: ${formatTime(n.updatedAt)}`}
                    </div>
                  </div>

                  <div style={styles.actions}>
                    <button
                      style={styles.linkBtn}
                      onClick={() => {
                        setEditingId(n.noteId);
                        setEditingText(n.text);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      style={styles.dangerBtn}
                      onClick={() => deleteNote(n.noteId)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>

        {nextToken && (
          <button
            onClick={() => fetchNotes(true)}
            style={styles.loadMore}
          >
            Load more
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f8",
    padding: "32px 16px",
  },
  header: {
    maxWidth: 560,
    margin: "0 auto 24px",
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: 28,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: "#555",
  },
  card: {
    maxWidth: 560,
    margin: "0 auto",
    background: "#fff",
    padding: 24,
    borderRadius: 12,
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  inputRow: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 15,
  },
  editInput: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    border: "1px solid #ccc",
    marginRight: 8,
  },
  primaryBtn: {
    padding: "10px 16px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  dangerBtn: {
    background: "none",
    border: "none",
    color: "#dc2626",
    cursor: "pointer",
    marginLeft: 8,
  },
  linkBtn: {
    background: "none",
    border: "none",
    color: "#2563eb",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  noteItem: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    background: "#f9fafb",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  noteText: {
    fontSize: 15,
  },
  timestamp: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  actions: {
    display: "flex",
    alignItems: "center",
  },
  loadMore: {
    marginTop: 16,
    width: "100%",
    padding: 10,
    borderRadius: 6,
    border: "none",
    background: "#e5e7eb",
    cursor: "pointer",
  },
};
