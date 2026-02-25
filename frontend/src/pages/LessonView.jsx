import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import LessonRenderer from '../components/LessonRenderer';

const LessonView = () => {
  const { courseId, moduleId, moduleIndex, lessonId, lessonIndex } = useParams();
  const [course, setCourse] = useState(null);
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [language, setLanguage] = useState('English');
  const [audioLanguage, setAudioLanguage] = useState('Hinglish');
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [audioInstance, setAudioInstance] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const availableLanguages = [
    'English', 'Hinglish', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 
    'Urdu', 'Gujarati', 'Kannada', 'Malayalam', 'Odia', 'Punjabi', 
    'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Russian', 'Arabic', 'Portuguese'
  ];
  
  const hasAttempted = useRef(false);
  const contentRef = useRef(null);

  const handlePrint = useReactToPrint({ 
    contentRef, 
    documentTitle: lesson?.title || 'Lesson_Export',
    onPrintError: (errorLocation, error) => console.error("Print Error:", errorLocation, error)
  });

  const handleGenerateContent = async (selectedLanguage = null) => {
    setApiError(null);
    setIsGenerating(true);
    try {
      const payload = {
        courseTitle: courseId || 'Course',
        moduleTitle: moduleIndex || 'Module',
        lessonTitle: lesson.title,
        lessonId: lesson._id,
        language: selectedLanguage || language
      };
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/generate-lesson`, payload);
      setLesson(response.data.lesson || response.data);
    } catch (err) {
      console.error(err);
      setApiError('The AI is currently taking a breather due to high traffic. Please wait a minute and try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleToggleComplete = async () => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/lessons/${lessonId}/complete`, {
        isCompleted: !lesson.isCompleted
      });
      setLesson({ ...lesson, isCompleted: response.data.isCompleted });
    } catch (err) {
      console.error("Failed to toggle completion status:", err);
    }
  };

  const playAudio = async () => {
    if (isPlaying) {
      if (audioInstance) audioInstance.pause();
      setIsPlaying(false);
      return;
    }

    if (audioInstance && !isPlaying) {
      audioInstance.play();
      setIsPlaying(true);
      return;
    }

    const textToRead = lesson.contentBlocks
      .filter(b => b.type === 'heading' || b.type === 'paragraph')
      .map(b => b.text)
      .join('. ');

    if (!textToRead) return;

    setIsAudioLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/generate-audio`, { 
        text: textToRead,
        targetLanguage: audioLanguage
      });
      if (response.data && response.data.audioBase64) {
        const newAudio = new Audio('data:audio/wav;base64,' + response.data.audioBase64);
        newAudio.onended = () => setIsPlaying(false);
        newAudio.play();
        setAudioInstance(newAudio);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error playing audio", error);
    } finally {
      setIsAudioLoading(false);
    }
  };

  useEffect(() => {
    hasAttempted.current = false;
  }, [lessonIndex]);

  useEffect(() => {
    return () => {
      if (audioInstance) audioInstance.pause();
    };
  }, [audioInstance]);

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        setLoading(true);
        const courseRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/courses/${courseId}`);
        setCourse(courseRes.data);
        const lessonRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/lessons/${lessonId}`);
        setLesson(lessonRes.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load lesson content.');
      } finally {
        setLoading(false);
      }
    };

    if (courseId && moduleId && lessonId) {
      fetchLessonData();
    }
  }, [courseId, moduleId, lessonId]);

  useEffect(() => {
    if (lesson && (!lesson.contentBlocks || lesson.contentBlocks.length === 0) && !isGenerating && !hasAttempted.current) {
      hasAttempted.current = true;
      handleGenerateContent();
    }
  }, [lesson, isGenerating, courseId, moduleIndex]);

  if (loading) {
    return (
      <div className="w-full h-full p-8 md:p-12 lg:p-16 max-w-[1000px] mx-auto pb-32 flex items-center justify-center">
         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="w-full h-full p-8 md:p-12 lg:p-16 max-w-[1000px] mx-auto pb-32 flex flex-col items-center justify-center">
        <h2 className="text-3xl text-red-500 font-bold mb-4">Oops!</h2>
        <p className="text-gray-400">{error || "Lesson could not be loaded."}</p>
        <Link to={`/course/${courseId}`} className="mt-8 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors">
          Return to Course
        </Link>
      </div>
    );
  }

  let modIdxDisplay = '?';
  let lessIdxDisplay = '?';
  if (course && course.modules) {
    const mInd = course.modules.findIndex(m => m._id === moduleId);
    if (mInd !== -1) {
      modIdxDisplay = mInd + 1;
      const lInd = course.modules[mInd].lessons.findIndex(l => l._id === lessonId);
      if (lInd !== -1) {
        lessIdxDisplay = lInd + 1;
      }
    }
  }

  return (
    <div className="w-full h-full p-4 sm:p-8 md:p-12 lg:p-16 max-w-[1000px] mx-auto pb-24 md:pb-32">
      <header className="mb-14">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-6">
          <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            <Link to={`/course/${courseId}`} className="flex items-center gap-1 sm:gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-inner hover:bg-blue-500/20 transition-colors cursor-pointer">
               <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
               Course Outline
            </Link>
            <span className="text-gray-600">/</span>
            <span className="bg-purple-500/10 border border-purple-500/20 text-purple-400 px-3 py-1.5 md:px-4 md:py-2 rounded-full">Module {modIdxDisplay}</span>
            <span className="text-gray-600">/</span>
            <span className="bg-pink-500/10 border border-pink-500/20 text-pink-400 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.2)]">Lesson {lessIdxDisplay}</span>
          </div>

          {lesson.contentBlocks && lesson.contentBlocks.length > 0 && (
            <div className="flex flex-col gap-3 self-start md:self-auto items-end">
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <select
                    value={language}
                    onChange={(e) => {
                      setLanguage(e.target.value);
                      handleGenerateContent(e.target.value);
                    }}
                    disabled={isGenerating}
                    className="appearance-none bg-white/5 border border-white/10 hover:border-white/20 text-white px-3 py-1.5 md:px-4 md:py-2 pr-7 md:pr-8 rounded-full text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {availableLanguages.map(lang => (
                      <option key={`text-${lang}`} value={lang} className="bg-[#0a0a0a]">{lang}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
                <button
                  onClick={() => handlePrint()}
                  className="flex items-center justify-center shrink-0 gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] transition-all duration-300 border border-indigo-400/30"
                >
                  <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                  PDF
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <select
                    value={audioLanguage}
                    onChange={(e) => {
                      setAudioLanguage(e.target.value);
                      if (audioInstance) {
                        audioInstance.pause();
                        setAudioInstance(null);
                        setIsPlaying(false);
                      }
                    }}
                    disabled={isAudioLoading || isPlaying}
                    className="appearance-none bg-white/5 border border-white/10 hover:border-white/20 text-white px-3 py-1.5 md:px-4 md:py-2 pr-7 md:pr-8 rounded-full text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {availableLanguages.map(lang => (
                      <option key={`audio-${lang}`} value={lang} className="bg-[#0a0a0a]">{lang}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
                <button
                  onClick={playAudio}
                  disabled={isAudioLoading}
                  className={`flex items-center justify-center shrink-0 gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold text-white transition-all duration-300 border ${
                    isAudioLoading ? 'bg-orange-500/50 cursor-not-allowed border-orange-400/30 shadow-[0_0_15px_rgba(249,115,22,0.5)]' :
                    isPlaying ? 'bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-400 hover:to-orange-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] border-red-400/30' :
                    'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 shadow-[0_0_15px_rgba(34,197,94,0.3)] border-green-400/30'
                  }`}
                >
                  {isAudioLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Translating...
                    </>
                  ) : isPlaying ? (
                    <>
                      <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                      Pause
                    </>
                  ) : (
                    <>
                      <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      Listen
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="mb-4 md:mb-6">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
            {lesson.title}
          </h1>
        </div>
      </header>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
        <article ref={contentRef} className="relative bg-[#0d0d0d] border border-white/10 p-6 sm:p-10 md:p-14 print:p-10 rounded-3xl md:rounded-[2rem] shadow-2xl">
           {(!lesson.contentBlocks || lesson.contentBlocks.length === 0) ? (
             <div className="flex flex-col items-center justify-center py-12">
               {isGenerating ? (
                 <>
                   <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-6 shadow-[0_0_30px_rgba(168,85,247,0.5)]"></div>
                   <p className="text-purple-400 text-2xl font-bold animate-pulse">Crafting your personalized lesson...</p>
                 </>
               ) : apiError ? (
                 <div className="bg-[#111] border border-red-500/50 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
                   <svg className="w-16 h-16 text-red-500/80 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                   <p className="text-gray-300 text-lg mb-8 leading-relaxed">{apiError}</p>
                   <button
                     onClick={handleGenerateContent}
                     className="px-8 py-3 rounded-xl font-bold text-white bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 transition-all duration-300 shadow-lg"
                   >
                     Retry Generation
                   </button>
                 </div>
               ) : (
                 <div className="flex flex-col items-center gap-6">
                   <button
                     onClick={() => handleGenerateContent()}
                     className="px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all duration-300"
                   >
                     Generate Content with AI
                   </button>
                 </div>
               )}
             </div>
           ) : (
             <div className="flex flex-col gap-10">
               <LessonRenderer content={lesson.contentBlocks} />
               <div className="flex justify-center mt-8 pt-8 border-t border-white/10">
                 <button
                   onClick={handleToggleComplete}
                   className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white transition-all duration-300 border ${
                     lesson.isCompleted
                       ? 'bg-green-500/20 border-green-500/50 hover:bg-green-500/30 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.2)]'
                       : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                   }`}
                 >
                   <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${lesson.isCompleted ? 'border-green-400 bg-green-400/20' : 'border-gray-500'}`}>
                     {lesson.isCompleted && <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                   </div>
                   {lesson.isCompleted ? 'Completed' : 'Mark as Complete'}
                 </button>
               </div>
             </div>
           )}
        </article>
      </div>
    </div>
  );
};

export default LessonView;
