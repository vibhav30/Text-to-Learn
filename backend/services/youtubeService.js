const axios = require('axios');

const searchVideo = async (query) => {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      throw new Error('YOUTUBE_API_KEY is not set');
    }

    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        maxResults: 1,
        q: query,
        type: 'video',
        key: apiKey,
      },
    });

    if (response.data.items && response.data.items.length > 0) {
      return response.data.items[0].id.videoId;
    }

    return null;
  } catch (error) {
    throw error;
  }
};

module.exports = { searchVideo };
