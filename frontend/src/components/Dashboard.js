import React, { useEffect, useState } from 'react';
import { fetchNotes, deleteNote } from '../api';
import NoteEditor from './NoteEditor';
import './styles.css';

export default function Dashboard({ onLogout }) {
    const [notes, setNotes] = useState([]);
    const [editing, setEditing] = useState(null);
    const [loading, setLoading] = useState(true);

    const load = async () => {
        try {
            const data = await fetchNotes();
            setNotes(data);
        } catch (err) {
            if (err.message.includes('token')) onLogout();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const handleDelete = async id => {
        if (window.confirm("Delete this note?")) {
            await deleteNote(id);
            load();
        }
    };

    return (
        <div className="dashboard">
            <header>
                <h1>Your Notes</h1>
                <div>
                    <button onClick={() => setEditing({})}>New Note</button>
                    <button onClick={() => { localStorage.clear(); onLogout(); }}>Logout</button>
                </div>
            </header>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="notes-grid">
                    {notes.map(n => (
                        <div key={n._id} className="note-card">
                            <h3>{n.title}</h3>
                            <p>{n.content.substring(0, 100)}...</p>
                            <div className="note-actions">
                                <button onClick={() => setEditing(n)}>Edit</button>
                                <button onClick={() => handleDelete(n._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {editing && (
                <NoteEditor
                    note={editing}
                    onClose={() => { setEditing(null); load(); }}
                />
            )}
        </div>
    );
}
