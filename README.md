# MERN Notes App

A full-stack notes-taking application built with the MERN stack (MongoDB, Express, React, Node.js) that includes user authentication, CRUD operations for notes, and secure token-based access.

---

---

## Features

### Core Features

-   User authentication (Signup/Login) using **JWT**
-   Secure, protected routes (only logged-in users can access dashboard)
-   Create, read, update, delete (CRUD) notes
-   Dashboard displays all user notes
-   Rich-text/plain-text note support
-   Confirmation before deleting notes

### Stretch Goals

-   [ ] Add tags/categories with filtering
-   [ ] Upload images to notes (Cloudinary or base64)
-   [ ] Search bar to filter notes by keyword

---

## Tech Stack

### Frontend

-   React.js
-   React Router
-   Axios
-   Custom CSS

### Backend

-   Node.js
-   Express.js
-   MongoDB + Mongoose
-   JWT (jsonwebtoken) for authentication
-   bcryptjs for password hashing
-   CORS + dotenv

---

## Folder Structure

mern-notes-app/
│
├── backend/
│ ├── models/
│ │ ├── User.js
│ │ └── Note.js
│ ├── routes/
│ │ ├── authRoutes.js
│ │ └── notesRoutes.js
│ ├── controllers/
│ │ ├── authController.js
│ │ └── notesController.js
│ ├── middlewares/
│ │ └── authMiddleware.js
│ ├── server.js
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Login.js
│ │ │ ├── Signup.js
│ │ │ ├── Dashboard.js
│ │ │ └── NoteEditor.js
│ │ ├── App.js
│ │ ├── index.js
│ │ └── index.css
│
└── README.md

---

## ⚙️ Installation

### Prerequisites

-   Node.js & npm installed
-   MongoDB running locally or MongoDB Atlas

---

### 🔧 Backend Setup

```bash
cd backend
npm install
```
