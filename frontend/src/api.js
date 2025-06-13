const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function getToken() {
    return localStorage.getItem('token');
}

function authHeaders() {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function login(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw await res.json();
    return res.json();
}

export async function signup(username, email, password) {
    const res = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });
    if (!res.ok) throw await res.json();
    return res.json();
}

export async function fetchNotes() {
    const res = await fetch(`${API_URL}/notes`, {
        headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw await res.json();
    return res.json();
}

export async function createNote(title, content) {
    const res = await fetch(`${API_URL}/notes`, {
        method: 'POST',
        headers: { ...authHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
    });
    if (!res.ok) throw await res.json();
    return res.json();
}

export async function updateNote(id, title, content) {
    const res = await fetch(`${API_URL}/notes/${id}`, {
        method: 'PUT',
        headers: { ...authHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
    });
    if (!res.ok) throw await res.json();
    return res.json();
}

export async function deleteNote(id) {
    const res = await fetch(`${API_URL}/notes/${id}`, {
        method: 'DELETE',
        headers: { ...authHeaders(), 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw await res.json();
    return res.json();
}
