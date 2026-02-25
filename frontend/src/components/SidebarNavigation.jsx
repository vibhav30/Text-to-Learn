import { Link, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const SidebarNavigation = ({ closeSidebar }) => {
  const [courses, setCourses] = useState([]);
  const location = useLocation();
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    const fetchCourses = async () => {
      if (isAuthenticated && user?.sub) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/courses?userId=${user.sub}`);
          setCourses(response.data);
        } catch (err) {
          console.error('Failed to fetch courses:', err);
        }
      } else {
        setCourses([]);
      }
    };
    fetchCourses();
  }, [location.pathname, isAuthenticated, user?.sub]);

  return (
    <aside className="w-80 shrink-0 bg-[#0a0a0a] border-r border-white/10 text-white flex flex-col h-screen p-6 shadow-2xl relative z-10">
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-2xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer">
          Text-to-Learn
        </h2>
        <button onClick={closeSidebar} className="md:hidden text-gray-400 hover:text-white p-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      <nav className="flex-1 flex flex-col gap-3 min-h-0">
        <Link 
          to="/" 
          onClick={closeSidebar}
          className="group flex items-center gap-4 px-4 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 transition-all duration-300 backdrop-blur-md"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/30 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          </div>
          <span className="font-semibold tracking-wide text-gray-300 group-hover:text-white transition-colors">Home Dashboard</span>
        </Link>
        <div className="mt-8 mb-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest px-4">Recent Courses</p>
        </div>
        <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {isAuthenticated ? (
            courses.map((course) => (
              <Link 
                key={course._id}
                to={`/course/${course._id}`}
                onClick={closeSidebar}
                className="group flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-300 overflow-hidden"
              >
                <div className="flex shrink-0 items-center justify-center w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block font-medium text-gray-400 group-hover:text-gray-200 transition-colors truncate">{course.title}</span>
                  <span className="block text-xs text-gray-600 mt-1">View Course</span>
                </div>
              </Link>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-40 text-center px-4">
              <svg className="w-8 h-8 text-gray-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              <p className="text-gray-400 text-sm">Please log in to view and generate courses.</p>
            </div>
          )}
        </div>
      </nav>
      <div className="mt-auto pt-6 border-t border-white/10">
        {isLoading ? (
          <div className="flex items-center justify-center p-2">
            <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : isAuthenticated ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 px-2">
              <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full border border-white/20 shadow-lg" />
              <div className="overflow-hidden">
                <p className="font-semibold text-sm text-gray-200 truncate">{user.name}</p>
                <p className="text-xs text-gray-500">Free Tier</p>
              </div>
            </div>
            <button 
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-sm font-medium transition-colors border border-white/5 hover:border-white/10"
            >
              Log Out
            </button>
          </div>
        ) : (
          <button 
            onClick={() => loginWithRedirect()}
            className="w-full py-3 rounded-xl font-bold text-white relative overflow-hidden group shadow-[0_0_20px_rgba(168,85,247,0.4)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:from-purple-500 group-hover:to-pink-500 transition-colors"></div>
            <span className="relative z-10">Log In / Sign Up</span>
          </button>
        )}
      </div>
    </aside>
  );
};

export default SidebarNavigation;
