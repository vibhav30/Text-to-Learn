import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LessonRenderer from '../components/LessonRenderer';

const LessonPage = () => {
  const { courseId, moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/lessons/${lessonId}`);
        setLesson(response.data);
      } catch (err) {
        console.error('Error fetching lesson:', err);
      } finally {
        setLoading(false);
      }
    };

    if (lessonId) {
      fetchLesson();
    }
  }, [lessonId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-xl font-medium text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-xl text-red-500 font-medium">Lesson not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden p-8 md:p-12">
        
        <nav className="flex mb-8 text-sm font-medium text-gray-500" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to={`/course/${courseId}`} className="hover:text-purple-600 transition-colors">
                Back to Course
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-400 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                <span className="ml-1 text-gray-400 md:ml-2 line-clamp-1">{lesson.title}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="mb-8 border-b border-gray-100 pb-6">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{lesson.title}</h1>
        </div>
        
        <LessonRenderer content={lesson.content} />
        
        {/*
        <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-100">
            Previous
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gray-100 text-gray-400 cursor-not-allowed">
            Next Lesson
          </button>
        </div>
        */}

      </div>
    </div>
  );
};

export default LessonPage;
