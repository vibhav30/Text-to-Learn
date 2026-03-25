# 🚀 Text-to-Learn | *AI Course Generator*

> **Text-to-Learn** is a bleeding-edge, full-stack AI platform that completely redefines digital learning. By transforming simple text prompts into highly structured educational content, the application empowers users to generate modular courses, dynamic lessons, interactive MCQs, multilingual text-to-speech audio, and even relevant YouTube video integrations—instantly! Built with a modern React frontend and a robust Node.js backend, it leverages **Google's Gemini AI** to act as your personal, on-demand tutor.

---

## 📸 Sneak Peek

*(Add your beautiful screenshots into the `ss` folder!)*

<p align="center">
  <img src="./ss/dashboard.png" alt="Generation Dashboard" width="32%" />
  &nbsp;
  <img src="./ss/lesson-view.png" alt="Rich Lesson Rendering" width="32%" />
  &nbsp;
  <img src="./ss/auth-modal.png" alt="Secure Auth0 Login" width="32%" />
</p>

---

## ✨ Key Features & Technical Marvels

- **🧠 Full-Stack AI Pipeline**: Instantly generates well-structured learning modules and detailed markdown lessons from user-provided prompts using **Google Gemini LLM**.
- **🎥 Dynamic YouTube Integrations**: Automatically fetches and embeds hyper-relevant YouTube videos directly into the generated coursework to supplement text-based learning visually.
- **🗣️ Multilingual Text-to-Speech (TTS)**: Integrated dynamic TTS support, enabling automatic Hinglish, Pure Hindi, and Tamil lesson narration via Google TTS APIs for unmatched accessibility.
- **📄 High-Fidelity PDF Export**: Designed PDF lesson export functionality using `react-to-print`, allowing users to download visually accurate, heavily formatted modular lessons entirely offline.
- **📊 Integrated Quiz Generation**: Rapidly generates end-of-lesson multiple-choice questions (MCQs) to rigorously test knowledge retention and user engagement.
- **📈 Progress Tracking**: Built-in visual indicators and completion tracking to monitor individual course progression effortlessly.
- **🌙 Native Dark Mode**: A stunning, accessible, and sleek default Dark Mode user interface built with **Tailwind CSS**, featuring glassmorphic elements, engaging hover states, and seamless micro-animations.
- **🔐 Enterprise-Grade Security**: Secured from end-to-end with **Auth0**. Implemented custom Express middleware including `express-jwt` and `jwks-rsa` for robust API route protection and centralized error handling.
- **⚡ Scalable RESTful Backend**: A high-performance REST API utilizing Node.js, Express, and MongoDB (Mongoose), managing complex hierarchical data relationships (Course ➔ Module ➔ Lesson) tied securely to individual users.

---

## 🛠️ Technology Stack

### **Frontend  💻**
- **Framework**: React 18, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Authentication**: Auth0 React SDK (`@auth0/auth0-react`)
- **HTTP Client**: Axios
- **Utilities**: React-to-Print

### **Backend  ⚙️**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **AI Integration**: Google Gen AI SDK (`@google/genai`)
- **Media & Audio**: Google TTS API (`google-tts-api`), YouTube Data API
- **Security**: `express-jwt`, `jwks-rsa`, `express-rate-limit`, `cors`

---

## 📋 Prerequisites

Ensure you have the following installed on your machine:
- 🟢 **Node.js** (v18.0 or higher)
- 🍃 **MongoDB** (Local instance or MongoDB Atlas cluster)
- 🛡️ **Auth0 Account** (To configure Domain, Client ID, and Audience API)
- 🔑 **Google Gemini API Key** (Generated via Google AI Studio)
- 🔴 **YouTube Data API Key** (Generated via Google Cloud Console)

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/text-to-learn.git
cd text-to-learn
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `/backend` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
YOUTUBE_API_KEY=your_youtube_api_key

# Auth0 Backend Verification
AUTH0_ISSUER_BASE_URL=https://your-auth0-domain.us.auth0.com/
AUTH0_AUDIENCE=your_auth0_api_audience
```

Start the backend development server:
```bash
npx nodemon server.js
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Create a `.env` file in the `/frontend` directory:
```env
VITE_API_BASE_URL=http://localhost:5000

# Auth0 Frontend Config
VITE_AUTH0_DOMAIN=your-auth0-domain.us.auth0.com
VITE_AUTH0_CLIENT_ID=your_auth0_client_id
VITE_AUTH0_AUDIENCE=your_auth0_api_audience
```

Start the Vite development server:
```bash
npm run dev
```

---

## 💻 Usage Guide

1. 👤 **Sign Up / Log In**: Click the Login button in the sidebar. You will be authenticated securely via Auth0. Unauthenticated users will be met with a custom modal restricting course generation.
2. ✍️ **Generate a Course**: On the main dashboard, type any topic you wish to learn about and submit. The multi-stage AI pipeline will orchestrate your learning material.
3. 📚 **Explore Lessons**: The AI will generate a structured module list. Click on any module/lesson to render the detailed Markdown content alongside curated YouTube videos and MCQs.
4. 🎧 **Listen to the Lesson**: In the Lesson View, select your preferred language (Hinglish/Hindi/Tamil) from the dropdown and hit **Play** to hear the TTS reader.
5. 📥 **Download as PDF**: Click the **Export** button in the top right of the lesson header to beautifully convert and save your lesson visually for offline usage.

---

## 📂 Project Structure

```text
Text-to-Learn/
├── backend/
│   ├── controllers/      # Route logic (courseController, etc.)
│   ├── middleware/       # Auth validation (JWT), Rate limiting, Error Handling
│   ├── models/           # Mongoose schemas (Course, Lesson, User)
│   ├── routes/           # Express API routes
│   ├── services/         # Gemini AI, YouTube, & TTS logic
│   ├── server.js         # Backend entry point
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/   # Reusable UI (Sidebar, auth modals, loaders)
    │   ├── pages/        # Main views (PromptForm, LessonView)
    │   ├── utils/        # Axios interceptors, helper functions
    │   ├── App.jsx       # Auth0 wrapping & Router
    │   ├── main.jsx      # React entry point
    │   └── index.css     # Tailwind directives & base styles
    ├── vite.config.js
    └── package.json
```

---

## 🗺️ Roadmap / Future Enhancements

- [ ] 🌐 **Social Sharing**: Share generated courses and content trees via public, read-only links with peers.

---

<p align="center">
👨‍💻 <b>Developed by <a href="https://www.linkedin.com/in/vibhavgupta30/">Vibhav Gupta</a></b>
</p>
