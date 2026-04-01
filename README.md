# Dynamic Formula Evaluator

A full-stack web app where users define custom math formulas on two numeric inputs and see results update in real time. All rows are persisted in MongoDB.

**Tech Stack:** React (Vite) · Node.js/Express · MongoDB/Mongoose · Axios

---

## Setup & Run

### 1. Prerequisites
- Node.js ≥ 18
- MongoDB running locally (`mongod`)

### 2. Install dependencies

```bash
# Backend
cd server && npm install

# Frontend
cd client && npm install
```

### 3. Configure environment

Edit `.env` in the project root (already created):

```
MONGO_URI=mongodb://localhost:27017/formula-evaluator
PORT=5000
```

### 4. Start the app

```bash
# Terminal 1 — backend (from project root)
cd server && node index.js

# Terminal 2 — frontend (from project root)
cd client && npm run dev
```

Open **http://localhost:5173** in your browser.

---

## Formula Syntax

Use `A` and `B` as variable names in any valid JS expression:

| Formula | Result |
|---|---|
| `A * B` | Multiply |
| `A + B + 500` | Add with constant |
| `(A / B) * 100` | Percentage |
| `Math.pow(A, B)` | Exponentiation |
| `Math.round(A / B)` | Rounded division |
| `A > B ? A : B` | Conditional (max of A, B) |

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/rows` | Fetch all rows |
| `POST` | `/api/rows` | Create blank row |
| `POST` | `/api/evaluate` | Evaluate formula + save result |
| `DELETE` | `/api/rows/:id` | Delete a row |
