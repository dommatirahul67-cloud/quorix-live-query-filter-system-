# QUORIX – Live Query Filter System

### Smart Resource Discovery Platform

QUORIX is a modern resource discovery platform that helps users explore and find learning resources through real-time search, multi-category filtering, and pagination.

Built with React.js, Node.js, and Express.js, QUORIX provides a responsive and user-friendly experience for discovering resources efficiently.

## 🚀 Live Demo

- **Live Application:** https://quorix-live-query-filter-system.vercel.app/
- **Backend API:** https://quorix-live-query-filter-system.onrender.com/
- **GitHub Repository:** https://github.com/dommatirahul67-cloud/quorix-live-query-filter-system-

## ✨ Features

- **Live Search:** Search resources by title with a 400ms debounce.
- **Multi-Category Filtering:** Filter resources using multiple category checkboxes.
- **Server-Side Pagination:** Navigate through resources efficiently.
- **Responsive UI:** Works across desktop and mobile devices.
- **Loading States:** Skeleton loading animations while fetching results.
- **Active Filter Chips:** Easily remove individual filters.
- **Reset Filters:** Clear all active filters instantly.
- **REST API:** Backend API for searching, filtering, and pagination.

## 🛠️ Technology Stack

### Frontend
- React.js
- JavaScript
- CSS3
- Vite

### Backend
- Node.js
- Express.js
- REST API

### Deployment & Tools
- GitHub
- Render
- Vercel
- npm

## 📂 Project Structure

```text
live-query-filter-system/
│
├── backend/
│   ├── catalog.json
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── package-lock.json
│   └── frontend/
│       ├── public/
│       ├── src/
│       │   ├── assets/
│       │   ├── App.jsx
│       │   ├── App.css
│       │   ├── index.css
│       │   └── main.jsx
│       ├── index.html
│       ├── package.json
│       └── vite.config.js
│
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/dommatirahul67-cloud/quorix-live-query-filter-system-.git
```

```bash
cd quorix-live-query-filter-system-
```

### 2. Start the backend

```bash
cd backend
npm install
npm run dev
```

Backend runs at:

`http://localhost:5000`

### 3. Configure the frontend

Open another terminal:

```bash
cd frontend/frontend
npm install
```

Create a `.env` file in the `frontend/frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Start the frontend

```bash
npm run dev
```

Frontend runs at:

`http://localhost:5173`

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Backend health check |
| GET | `/api/resources` | Fetch resources |
| GET | `/api/resources?search=Resource%201` | Search resources |
| GET | `/api/resources?category=Analytics` | Filter by category |
| GET | `/api/resources?category=Analytics,Security` | Multi-category filtering |
| GET | `/api/resources?page=2&limit=12` | Pagination |

### Query Parameters

| Parameter | Description |
|---|---|
| `search` | Search resources by title |
| `category` | Filter by one or more categories |
| `page` | Page number |
| `limit` | Number of records per page |

## 📊 Dataset

QUORIX uses a catalog containing 250 learning resource records.

Each record includes:

- ID
- Title
- Category
- Difficulty Level
- Duration in Minutes
- Rating

Supported categories include Analytics, Development, Security, and Design.

## ☁️ Deployment

- **Frontend:** Deployed using Vercel.
- **Backend:** Deployed using Render.

The frontend communicates with the deployed backend through the `VITE_API_URL` environment variable.

## 🎯 Project Objective

The objective of QUORIX is to demonstrate an efficient full-stack search and filtering system using modern web technologies, with a focus on responsive design, optimized API requests, and smooth user interaction.

---

**QUORIX – Discover Better. Learn Smarter. Grow Further.**