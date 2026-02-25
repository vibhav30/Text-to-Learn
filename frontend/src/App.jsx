import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import SidebarNavigation from './components/SidebarNavigation';
import Home from './pages/Home';
import LessonView from './pages/LessonView';
import CoursePage from './pages/CoursePage';
import { useState } from 'react';

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex print:block h-[100dvh] print:h-auto w-full bg-[#030303] overflow-hidden print:overflow-visible font-sans text-gray-100 selection:bg-purple-500/30">
      
      {/* Mobile top header */}
      <div className="print:hidden md:hidden fixed top-0 left-0 right-0 h-16 bg-[#0a0a0a] border-b border-white/10 z-30 flex items-center justify-between px-4">
        <h2 className="text-xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Text-to-Learn
        </h2>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="text-gray-300 hover:text-white p-2"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>

      {/* Mobile overlay backdrop */}
      {isSidebarOpen && (
        <div 
          className="print:hidden md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar container */}
      <div className={`print:hidden fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarNavigation closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      <main className="flex-1 print:block print:static overflow-y-auto print:overflow-visible relative scroll-smooth scrollbar-hide pt-16 md:pt-0 print:pt-0">
        <div className="print:hidden absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900/50 via-[#030303] to-[#030303] pointer-events-none -z-10"></div>
        <Outlet />
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="course/:courseId" element={<CoursePage />} />
          <Route path="courses/:courseId/module/:moduleId/lesson/:lessonId" element={<LessonView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
