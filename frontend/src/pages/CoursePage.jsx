import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/courses/${courseId}`);
        setCourse(response.data);
      } catch (err) {
        setError('Failed to fetch course data');
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#030303] text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#030303] text-white">
        <p className="text-red-400">{error || 'Course not found'}</p>
      </div>
    );
  }

  let totalLessons = 0;
  let completedLessons = 0;

  if (course && course.modules) {
    course.modules.forEach(module => {
      if (module.lessons) {
        totalLessons += module.lessons.length;
        module.lessons.forEach(lesson => {
          if (lesson.isCompleted) completedLessons++;
        });
      }
    });
  }

  const progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-12 text-gray-100">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-500 mb-4 pb-2 border-b border-white/10">
          {course.title}
        </h1>
        
        {totalLessons > 0 && (
          <div className="mt-6 bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col gap-3">
            <div className="flex justify-between items-center text-sm font-semibold tracking-wide">
              <span className="text-gray-400">Course Progress</span>
              <span className="text-purple-400">{progressPercentage}% ({completedLessons}/{totalLessons} Lessons)</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden border border-white/5 relative">
              <div 
                className="bg-gradient-to-r from-purple-600 to-pink-500 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-6">
        {course.modules && course.modules.map((module, index) => (
          <div key={module._id || index} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm flex flex-col group">
            <h2 className="text-xl font-bold text-gray-200 group-hover:text-purple-400 transition-colors mb-2">
              {module.title}
            </h2>
            
            {module.lessons && module.lessons.length > 0 && (
              <div className="flex flex-col gap-2 mt-4">
                {module.lessons.map((lesson, lessonIndex) => (
                  <Link
                    key={lesson._id || lessonIndex}
                    to={`/courses/${course._id}/module/${module._id}/lesson/${lesson._id}`}
                    className="flex justify-between items-center px-4 py-3 rounded-xl bg-white/5 hover:bg-purple-500/20 border border-transparent hover:border-purple-500/30 text-gray-300 hover:text-white transition-all duration-200 text-sm md:text-base cursor-pointer group/lesson"
                  >
                    <div>
                      <span className="font-semibold text-purple-400/80 mr-2 group-hover/lesson:text-purple-300">{lessonIndex + 1}.</span>
                      {lesson.title}
                    </div>
                    {lesson.isCompleted && (
                      <div className="flex shrink-0 items-center justify-center bg-green-500/20 text-green-400 p-1.5 rounded-full border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]" title="Completed">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePage;
