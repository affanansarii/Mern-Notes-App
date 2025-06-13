import React, { useState } from 'react';
import { createNote, updateNote } from '../api';
import './styles.css';

export default function NoteEditor({ note, onClose }) {
    const [form, setForm] = useState({ title: note.title || '', content: note.content || '' });
    const [error, setError] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        try {
            if (note._id) {
                await updateNote(note._id, form.title, form.content);
            } else {
                await createNote(form.title, form.content);
            }
            onClose();
        } catch (err) {
            setError(err.message || 'Save failed');
        }
    }

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h2>{note._id ? 'Edit Note' : 'New Note'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={form.title}
                        onChange={e => setForm({ ...form, title: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Content..."
                        value={form.content}
                        onChange={e => setForm({ ...form, content: e.target.value })}
                        rows="10"
                        required
                    />
                    <div className="modal-actions">
                        <button type="submit">{note._id ? 'Update' : 'Create'}</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </div>
    );
}
