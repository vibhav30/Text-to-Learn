<div align="center">
  <h1>🚀 Text-to-Learn</h1>
  <p><strong>Transform any topic into a highly structured, interactive learning course in seconds.</strong></p>
  
  <p>
    <!-- Add your deployed link here -->
    <a href="https://your-deployed-live-link.vercel.app"><img src="https://img.shields.io/badge/Live_Demo-Available-success?style=for-the-badge&logo=vercel" alt="Live Demo" /></a>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node JS" />
    <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  </p>
</div>

<br />

**Created by: Vibhav Gupta**

**Text-to-Learn** is a full-stack, AI-powered educational platform. By leveraging cutting-edge Artificial Intelligence, the application empowers users to generate modular courses, dynamic lessons, interactive MCQs, multilingual text-to-speech audio, and even relevant YouTube video integrations instantly!

---

## 📸 Sneak Peek

*(Add your screenshots here before pushing to GitHub! Examples:)*

<div align="center">
  <!-- Replace with actual screenshot paths. You can drag and drop images into your GitHub repo and paste the links here -->
  <img src="https://via.placeholder.com/600x350.png?text=Dashboard+Screenshot" width="48%" alt="Course Dashboard" />
  <img src="https://via.placeholder.com/600x350.png?text=Interactive+Lesson+Screenshot" width="48%" alt="Interactive Lesson View" />
</div>

---

## ✨ Key Features

- **🧠 AI Course Generation**: Input any topic, and the system intelligently structures a complete course with modules and individual lessons (powered by Google Gemini 2.5).
- **🗣️ Multilingual Audio Generation (TTS)**: Listen to generated lessons translated on-the-fly into 20+ regional and global languages (e.g., Hinglish, Hindi, Spanish, French, Tamil) using seamless Text-to-Speech playback.
- **� Progress Tracking**: Keep track of your learning journey with interactive course progress bars and individual lesson completion toggles.
- **�🔐 Secure Authentication**: Robust user authentication and session management powered by **Auth0**.
- **🎥 YouTube Integration**: Lessons automatically embed highly specific YouTube video tutorials to supplement the AI-generated text.
- **📄 PDF Export**: Download beautifully formatted PDF versions of any lesson directly to your device for offline reading.
- **🛡️ Production-Ready Security**: Backend secured with `helmet` for HTTP headers, strict `cors` configurations, `express-rate-limit` for DDoS/spam protection, and sanitized error handling to prevent stack trace leaks.

---

## 🚀 Future Roadmap & Enhancements

We are continuously planning to evolve the platform. Upcoming features include:
- **🔗 Shareable Courses**: Generate public links to share your custom courses with friends, students, or the public.
- **📝 Spaced Repetition Flashcards**: Automatically convert lesson summaries into flashcards to enhance long-term memory retention.
- **🤖 Interactive AI Tutor**: A chatbot integrated into each lesson to answer specific clarifying questions.

---

## ⚡ Engineering Challenges Overcome

Building this platform involved solving several complex engineering hurdles to ensure a highly scalable and seamless User Experience:
1. **Handling Complex AI JSON Data**: Instructing the Gemini API to consistently return large, heavily structured nested JSON arrays (Modules > Lessons > Content Blocks) and parsing them safely without crashing the backend or returning malformed data to the client.
2. **Audio Buffer Management**: Converting translated multilingual text into base64 audio streams using Google TTS, and safely managing the Audio instance in the React component lifecycle (allowing play, pause, and rapid language swapping without memory leaks or overlapping audio tracks).
3. **Cross-Origin Security & Rate Limiting**: Correctly configuring the Vite frontend to communicate securely with the Express backend, enforcing strict domain-whitelisting (CORS), and setting up request limits to prevent abuse of the expensive AI text-generation quotas.

---

## 🛠️ Tech Stack

**Frontend**: React (Vite) | Tailwind CSS | Auth0 | Axios | React Router  
**Backend**: Node.js | Express.js | MongoDB & Mongoose  
**External Services**: Google Generative AI (Gemini) | Google TTS API | YouTube Data API v3  
**Security**: Helmet | express-rate-limit | CORS  

---

## ⚙️ Environment Variables Setup

Templates `frontend/.env.template` and `backend/.env.template` have been provided.

**Backend (`/backend/.env`)**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
GEMINI_API_KEY=your_gemini_api_key_here
YOUTUBE_API_KEY=your_youtube_api_key_here
AUTH0_DOMAIN=your_auth0_domain_here
AUTH0_AUDIENCE=your_auth0_audience_here
CLIENT_URL=http://localhost:5173  # (Production: e.g. https://your-frontend.vercel.app)
```

**Frontend (`/frontend/.env`)**
```env
VITE_AUTH0_DOMAIN=your_auth0_domain_here
VITE_AUTH0_CLIENT_ID=your_auth0_client_id_here
VITE_API_BASE_URL=http://localhost:5000  # (Production: e.g. https://your-backend.onrender.com)
```

---

## � Getting Started (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/text-to-learn.git
cd text-to-learn
```

### 2. Setup Backend
```bash
cd backend
npm install
# Populate your .env file
npm run dev
```

### 3. Setup Frontend
Open a new terminal window:
```bash
cd frontend
npm install
# Populate your .env file
npm run dev
```

The frontend will run on `http://localhost:5173` and the backend on `http://localhost:5000`.

---

## 🗄️ Project Structure

```text
📁 text-to-learn
├── 📁 backend
│   ├── 📁 controllers    (Express route handlers)
│   ├── 📁 models         (Mongoose schemas)
│   ├── 📁 routes         (API route definitions)
│   ├── 📁 services       (External API integrations: Gemini, YouTube)
│   └── server.js         (App entry point & security configurations)
│
└── 📁 frontend
    ├── 📁 public
    ├── 📁 src
    │   ├── 📁 components (Reusable UI blocks)
    │   ├── 📁 pages      (Main route views: CoursePage, LessonView, etc.)
    │   ├── main.jsx      (React entry point & Auth0 wrapper)
    │   └── App.jsx       (Routing configuration)
    └── vite.config.js
```

---

<div align="center">
  <i>Developed with ❤️ by Vibhav Gupta</i><br><br>
  <!-- Replace the hashtags with your actual profile links -->
  <a href="#">GitHub</a> • <a href="#">LinkedIn</a> • <a href="#">Portfolio</a>
</div>
