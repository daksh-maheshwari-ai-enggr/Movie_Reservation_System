# CineVault Movie Reservation System

Full-stack React, Express, MongoDB and Socket.IO cinema reservation app.

## Setup

1. Copy `.env.example` to `.env` and provide a MongoDB Atlas URI and JWT secret.
2. Install dependencies: `npm install`, `npm install --prefix backend`, `npm install --prefix frontend`.
3. Seed demo data: `npm run seed`.
4. Start both apps: `npm run dev`.

The client runs at `http://localhost:5173` and the API at `http://localhost:5000`. Demo credentials are printed by the seed command. Payments are simulated; no card or CVV values are stored.
