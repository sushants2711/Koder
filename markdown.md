# 💻 Full Stack Project: Code Editor & Project Manager

A web-based **Code Editor & Project Manager** that allows users to **signup, login, logout**, create multiple projects, save code, run code online, and get **AI-based code suggestions**. Built with **React.js**, **Node.js**, **Express.js**, and **MongoDB**, featuring a responsive UI styled with **Tailwind CSS**.

---

🔗 **Live Demo:**  
[Project Demo](https://koder-js.vercel.app/)

---

## Login (Demo Credentials)

> **Guest User**  
> Email: `sushant@gmail.com`  
> Password: `oppo1234`

---

## 🛠 Features

- 🔐 User Authentication (Signup, Login, Logout)
- ➕ Create, Edit, and Delete Projects
- 💻 Run code online using supported languages (JavaScript, Python, Java, C++, Go, Bash, etc.)
- 🤖 AI-powered code suggestions and review
- 🧾 View project code and history
- 👤 User-specific projects
- 🎨 Styled with Tailwind CSS
- 🍪 Uses **localStorage** and **cookies** for session and user data

---

## 🛠️ Tech Stack

### Frontend

- ⚛️ React.js + Vite
- 💅 Tailwind CSS
- 🗂️ React Router DOM
- 🖥️ Monaco Editor for code editing

### Backend

- 🧩 Node.js + Express.js
- 🔐 JWT Authentication
- 💾 MongoDB (Mongoose)

---

## 🚀 Getting Started

### 📁 Clone the repository

```bash
git clone https://github.com/sushants2711/Koder
cd Koder

cd backend
npm install

Before starting the backend server, create a .env file inside the backend/ directory to store your environment variables.
PORT=1200
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development

cd frontend
npm install
npm run dev

cd backend
npm install
npm run dev


Expense-Tracker/
├── backend/                   # Node.js + Express Backend
│   ├── config/                # DB config (e.g., MongoDB connection)
│   ├── controllers/           # Route handlers
│   ├── models/                # Mongoose schemas
│   ├── routes/                # API route definitions
│   ├── index.js               # Entry point (uses .env variables)
│   └── .env                   # Environment config
│
├── frontend/                  # React + Tailwind Frontend
│   └── src/
│       ├── api/               # API calls
│       ├── components/        # Reusable UI components
│       ├── context/       # React Context for global state
│       ├── message/     # Toast utilities
│       ├── pages/             # Application pages
│       └── routes/            # Route definitions
│
└── README.md

```

---

### Backend API Endpoints

POST /api/v1/auth/signup - Register a new user

POST /api/v1/auth/login - Login user and receive JWT token in cookies

GET /api/v1/auth/logout - Logout user and clear cookies

POST /api/v1/project/project/create-project - Create a new project

GET /api/projects/:id - Fetch project details by ID

POST /api/projects/run - Run code online

POST /api/projects/ai-review - Get AI code review

---

## Contact

For bugs or feature request, please reach out to sushants2711@gmail.com

[Linkedin](https://www.linkedin.com/in/sushant-kumar-singh-414782230)

Mobile - 7903759760
