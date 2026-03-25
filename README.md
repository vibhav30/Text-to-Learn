# 🚀 Text-to-Learn (AI Course Generator)

**Text-to-Learn** is an innovative, full-stack AI platform that transforms simple text prompts into highly structured, personalized courses and detailed lessons. Built with a modern React frontend and a robust Node.js backend, it leverages Google's Gemini AI to generate educational content on demand.

---

## 📸 Screenshots

*(Add your screenshots into the `ss` folder!)*

![Course Generation Dashboard](./ss/dashboard.png)
*Figure 1: The main dashboard where users enter topics to generate courses.*

![Interactive Lesson View](./ss/lesson-view.png)
*Figure 2: Rich lesson rendering with Text-to-Speech and PDF Export capabilities.*

![Auth0 Secure Login](./ss/auth-modal.png)
*Figure 3: Custom secure authentication flow powered by Auth0.*

---

## ✨ Key Features & Technical Achievements

- **Full-Stack AI Pipeline**: Developed a full-stack AI course creation platform that generates structured learning modules and lessons from user-provided prompts using **Google Gemini LLM**.
- **Multi-Stage Prompt Engineering**: Orchestrated a robust AI prompt engineering pipeline to sequentially generate structured course outlines, followed by detailed lesson content, ensuring logical progression and comprehensive subject coverage.
- **Rich Lesson Rendering**: Implemented a dynamic UI rendering system to parse AI-generated JSON and markdown content, accurately displaying headings, paragraphs, and syntax-highlighted code blocks for an engaging learning experience.
- **Multilingual Text-to-Speech (TTS)**: Integrated dynamic TTS support, enabling Hinglish, Pure Hindi, and Tamil lesson narration via Google TTS APIs to drastically improve accessibility.
- **High-Fidelity PDF Export**: Designed and implemented PDF lesson export functionality using `react-to-print`, allowing users to download and access visually accurate, heavily formatted lessons offline.
- **Enterprise-Grade Security**: Secured the application with **Auth0**, providing authenticated access to personalized courses. Implemented custom Express middleware including `express-jwt` and JWKS for robust API route protection, rate-limiting, and centralized error handling.
- **Scalable RESTful Backend**: Designed a scalable REST API using Node.js and Express to manage CRUD operations for courses, modules, and lessons. 
- **Complex Data Modeling**: Modeled hierarchical data relationships (Course ➔ Module ➔ Lesson) within MongoDB using **Mongoose** schemas, enabling highly efficient storage and data retrieval tied to individual user accounts.
- **Modern UI Architecture**: Utilized React (Vite) and **Tailwind CSS** to build a clean, responsive, glassmorphic UI with micro-animations, ensuring a highly polished user experience.
- **Clean Codebase**: Maintained a highly modular and extensible codebase featuring centralized Axios interceptors, reusable UI components, and separated backend service layers.

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: React 18, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Authentication**: Auth0 React SDK (`@auth0/auth0-react`)
- **HTTP Client**: Axios
- **Utilities**: React-to-Print

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **AI Integration**: Google Gen AI SDK (`@google/genai`)
- **Audio Generation**: Google TTS API (`google-tts-api`)
- **Security**: `express-jwt`, `jwks-rsa`, `express-rate-limit`, `cors`

---

## 📋 Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v18.0 or higher)
- **MongoDB** (Local instance or MongoDB Atlas cluster)
- **Auth0 Account** (To configure Domain, Client ID, and Audience API)
- **Google Gemini API Key** (Generated via Google AI Studio)

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

1. **Sign Up / Log In**: Click the Login button in the sidebar. You will be authenticated securely via Auth0. Unauthenticated users will be met with a custom modal restricting course generation.
2. **Generate a Course**: On the main dashboard, type any topic you wish to learn about and submit. The multi-stage AI pipeline will initiate.
3. **Explore Lessons**: The AI will generate a structured module list. Click on any module/lesson to generate and render the detailed Markdown lesson content.
4. **Listen to the Lesson**: In the Lesson View, select your preferred language (Hinglish/Hindi/Tamil) from the dropdown and hit **Play** to hear the TTS reader.
5. **Download as PDF**: Click the **Export** button in the top right of the lesson header to save your lesson visually for offline usage.

---

## 📂 Project Structure

```text
Text-to-Learn/
├── backend/
│   ├── controllers/      # Route logic (courseController, etc.)
│   ├── middleware/       # Auth validation (JWT), Rate limiting, Error Handling
│   ├── models/           # Mongoose schemas (Course, Lesson, User)
│   ├── routes/           # Express API routes
│   ├── services/         # Gemini AI & TTS logic (geminiService.js)
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

## 🗺️ Future Enhancements

- [ ] **Quiz Generation**: Automatically generate end-of-lesson multiple-choice quizzes to test knowledge retention.
- [ ] **Dark Mode**: System-aware dark/light theme toggling for enhanced accessibility and UI polish.
- [ ] **Progress Tracking**: Visual indicators (completion bars) indicating the percentage of course completion.
- [ ] **Social Sharing**: Share generated courses and content trees via public, read-only links.

---

👨‍💻 **Developed by [Vibhav Gupta](https://www.linkedin.com/in/vibhavgupta30/)**
