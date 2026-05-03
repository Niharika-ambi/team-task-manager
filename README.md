# TaskFlow - Team Task Manager

A full-stack web application for managing team projects and tasks with role-based access control.

Live URL: https://meticulous-truth-production-8f6d.up.railway.app
GitHub: https://github.com/Niharika-ambi/team-task-manager

---

## Tech Stack

- Frontend: React (Vite), React Router DOM, Axios
- Backend: Node.js, Express.js
- Database: PostgreSQL
- Auth: JWT + bcryptjs
- Deployment: Railway

---

## Features

- User authentication with JWT
- Admin signup protected with secret key
- Project creation and team management
- Task creation, assignment and status tracking
- Role-based access control (Admin/Member)
- Dashboard with task statistics

---

## Admin Secret Key

taskflow@admin2026

---

## Local Setup

cd backend && npm install && node index.js
cd frontend && npm install && npm run dev

Backend .env variables required:
PORT, DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, JWT_SECRET, ADMIN_SECRET
