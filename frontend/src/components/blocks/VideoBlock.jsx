import { useState, useEffect } from 'react';
import axios from 'axios';

export const VideoBlock = ({ data }) => {
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      if (!data || !data.query) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/youtube?query=${data.query}`);
        setVideoId(response.data.videoId);
      } catch (error) {
        console.error('Failed to fetch video:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [data]);

  if (loading) {
    return (
      <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg my-8 bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!videoId) return null;

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg my-8 bg-gray-100 print:hidden">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBlock;
