
# 🚗 NA-NHALK

**NA-NHALK** is a real-time ride booking and tracking system built using **Node.js**, **Express**, **MongoDB**, and **WebSocket**.  
It connects **clients**, **drivers**, and **admins** in one platform with live location tracking and admin verification.

---

## 🧠 Features

- 🔐 JWT-based authentication for Admin, Driver, and Client.
- 🧾 Driver license upload and admin approval system.
- 📍 Real-time driver location tracking using WebSocket.
- 📅 Booking management (create, accept, reject, complete).
- 🧑‍💼 Admin dashboard for monitoring drivers & bookings.
- 📢 Live notifications for booking updates.
- 🧱 Clean Architecture (MVC + Domain Layers).

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|---------------|
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Real-Time | WebSocket (Socket.IO) |
| Auth | JWT |
| Storage | Firebase Admin SDK |
| Architecture | Clean Architecture / MVC |

---

2 Install dependencies
npm install

3-Create .env file
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=90d

4-Run the app
npm start

---------
Author

Tarek Elnaggar
GitHub Profile
Node.js | MongoDB | WebSocket | Clean Architecture


