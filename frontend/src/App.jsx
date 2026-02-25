import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import SidebarNavigation from './components/SidebarNavigation';
import Home from './pages/Home';
import LessonView from './pages/LessonView';
import CoursePage from './pages/CoursePage';

const MainLayout = () => {
  return (
    <div className="flex h-screen w-full bg-[#030303] overflow-hidden font-sans text-gray-100 selection:bg-purple-500/30">
      <SidebarNavigation />
      <main className="flex-1 overflow-y-auto relative scroll-smooth scrollbar-hide">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900/50 via-[#030303] to-[#030303] pointer-events-none -z-10"></div>
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
