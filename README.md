# 🚀 **Skill Swap** – *The Smart Skill Bartering Platform* 🔁

Welcome to **Skill Swap**, the next-generation web platform that lets people **trade skills** instead of money. 🎯  
Whether you're a **developer**, **musician**, **chef**, or **language tutor** — this platform helps you connect with others and **exchange value** through knowledge.

> 💬 “You teach me Python, I’ll teach you Yoga.” – That’s Skill Swap in action.

---

## 💡 **What’s Inside?**

### 🔐 **Authentication & User Management**
- Secure **JWT-based** login and registration
- **Google OAuth** login for quick access using Firebase
- Passwords stored securely using **bcrypt**
- Cookie-token auth for protected routes

### 👤 **User Profiles**
- Add name, email, and skill list (like: `["React", "Violin", "Public Speaking"]`)
- Control profile visibility with `private` mode
- Set availability slots for sessions

### 🧠 **Skill Posts**
- Create posts to **offer** or **request** a skill
- Add tags, categories, descriptions
- Browse and filter through others’ posts

### 🔁 **Barter Requests**
- Send barter requests to skill posts
- Request lifecycle: `Pending → Accepted/Rejected → Completed`
- Easily track all your barters in one dashboard

### 💬 **Chat System**
- Real-time chat after barter acceptance
- Chat history saved per barter
- Designed for post-match communication

### 🗓️ **Session Scheduling**
- Book sessions based on user's availability
- Sessions can be **recurring** or **one-time**
- Mark sessions as completed once done

---

## 🧱 **Tech Stack Overview**

### 📦 Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- Firebase (Google Authentication)
- bcrypt.js for password hashing
- CORS, dotenv, cookie-parser

### 💻 Frontend
- React.js (Vite-based setup)
- React Router DOM
- Axios for API calls
- Clean component structure

---

## 🗂️ **Project Structure**

```bash
Skill-Swap-Odoo-main/
├── Skill-Swap Backend/
│   ├── controllers/       # Handles route logic
│   ├── models/            # Mongoose schemas
│   ├── routes/            # Express API routes
│   ├── middlewares/       # Token/auth checks
│   ├── config/            # Mongo DB connection
│   └── server.js          # Main server entry
│
└── Skill-Swap Frontend/
    └── Frontend/
        ├── Pages/         # Pages like Home, Login, Dashboard
        ├── Components/    # Reusable UI components
        ├── firebase.js    # Firebase setup
        └── main.jsx       # App entry point
```

---

## 🧪 **Key API Routes**

### 🔐 **Auth Routes**
- `POST /api/auth/register` – Register new user
- `POST /api/auth/login` – Login using email/password
- `POST /api/auth/google` – Login via Google OAuth
- `GET /api/auth/me` – Fetch current user

### 👥 **User Routes**
- `GET /api/user/all` – List all public users
- `PUT /api/user/update` – Update profile or skills

### 🔁 **Barter Routes**
- `POST /api/barter/create` – Initiate a barter
- `PUT /api/barter/accept/:id` – Accept a request
- `PUT /api/barter/reject/:id` – Reject a request
- `PUT /api/barter/complete/:id` – Complete session

### 💬 **Chat Routes**
- `POST /api/chat/send` – Send a message
- `GET /api/chat/history/:id` – View chat history

---

## 🛠️ **How to Run Locally**

### 📥 Backend Setup

```bash
cd "Skill-Swap Backend"
npm install

# Create a .env file with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# ACCESS_TOKEN_EXPIRY=1d

node server.js
```

### 💻 Frontend Setup

```bash
cd "Skill-Swap Frontend/Frontend"
npm install
npm run dev
```

---

## 📚 **Example Workflow**

1. 📝 Alice registers and lists **Yoga** as a skill.
2. 🔎 She finds Bob offering **Python**.
3. 🔁 She sends a barter request: Yoga ↔ Python.
4. 💬 Bob accepts → they chat & book a session.
5. ✅ After completing the session, both mark it done.

---

## 🔮 **Future Roadmap**

- 📞 Video/voice calling with WebRTC
- 📱 Chat with Socket.io
- 📲 Launch Android/iOS apps
- 🌎 Language & location-based matchmaking
- ⭐ User rating and review system
- 📊 Public dashboards and leaderboard

---

## 🤝 **Contributors & Support**

Built with 💙 by the Skill Swap Team.

### ✉ Contact
- Email: shivamshukla8112005@gmail.com
- GitHub: [https://github.com/shivam8112005/Skill-Swap-Odoo]
- Website: (Coming Soon)

> If you liked this project, give it a ⭐ on GitHub!
