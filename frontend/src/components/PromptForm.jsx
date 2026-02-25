import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const PromptForm = () => {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  const firstName = user?.given_name || user?.name?.split(' ')[0] || 'Explorer';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    if (!topic) return alert('Please enter a topic');
    setIsGenerating(true);
    console.log('Sending request for topic:', topic);
    
    try {
      // Replace with your actual backend URL/port if it's not 5000
      const payload = { 
        topic, 
        userId: isAuthenticated ? user.sub : null 
      };
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/generate-course`, payload);
      console.log('Success! Response:', response.data);
      if (response.data && response.data.courseId) {
        navigate(`/course/${response.data.courseId}`);
      }
    } catch (error) {
      console.error('API Call Failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto transform transition-all hover:scale-[1.01] duration-500">
      <div className="backdrop-blur-xl bg-white/5 p-1 rounded-3xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="bg-[#0a0a0a] rounded-[1.4rem] p-8 relative z-10 w-full h-full border border-white/5">
          {isAuthenticated && (
            <div className="mb-6 w-full text-left">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight animate-fade-in-up">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">{firstName}</span>! 👋
              </h2>
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="relative">
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="What do you want to master today? Try 'Microeconomics' or 'World War II'..."
                className="w-full bg-transparent border border-white/10 hover:border-white/20 rounded-2xl p-6 text-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300 min-h-[140px] resize-none"
              />
              <div className="absolute bottom-4 right-4 text-xs font-medium text-gray-500 bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-md">
                {topic.length} / 500
              </div>
            </div>
            <div className="flex items-center justify-end mt-2">
              <button 
                type="submit"
                disabled={!topic.trim() || isGenerating}
                className="relative inline-flex h-14 overflow-hidden rounded-2xl p-[2px] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
              >
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-[14px] bg-gray-950 px-8 py-2 text-sm font-bold text-white backdrop-blur-3xl group-hover/btn:bg-gray-900 transition-colors">
                  {isGenerating ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Crafting Syllabus...</span>
                    </div>
                  ) : (
                    <>
                      Generate Subject
                      <svg className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 max-w-md w-full text-center shadow-2xl">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold text-white mb-2">Authentication Required</h3>
            <p className="text-gray-300 mb-6">
              You must be logged in to generate AI courses and save your progress.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowLoginModal(false)}
                type="button"
                className="flex-1 py-3 px-4 rounded-xl font-medium text-white bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => loginWithRedirect()}
                type="button"
                className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 transition-all shadow-lg hover:shadow-purple-500/30"
              >
                Log In / Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptForm;
