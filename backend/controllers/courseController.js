const Course = require('../models/Course');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const { ai } = require('../services/geminiService');
const googleTTS = require('google-tts-api');

const generateCourseOutline = async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }
    const systemInstruction = `You are an expert course creator. The user will give you a topic. You must generate a highly structured course outline. Return ONLY raw, valid JSON. Do not use Markdown, do not use backticks like \`\`\`json, and do not add any conversational text.
The JSON must follow this exact schema:
{
"title": "Course Title",
"description": "Short description",
"tags": ["tag1", "tag2"],
"modules": [
{
"title": "Module 1 Title",
"lessons": ["Lesson 1 Title", "Lesson 2 Title"]
}
]
}`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: topic,
      config: {
        systemInstruction: systemInstruction,
      }
    });
    const responseText = response.text;
    let courseData;
    try {
      const cleanedText = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
      courseData = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("Failed to parse course JSON:", responseText);
      return res.status(500).json({ error: 'Failed to parse JSON from AI response' });
    }
    const savedModuleIds = [];
    for (const mod of courseData.modules) {
      const savedLessonIds = [];
      if (mod.lessons && Array.isArray(mod.lessons)) {
        for (const lessonTitle of mod.lessons) {
          const newLesson = new Lesson({
            title: lessonTitle,
            contentBlocks: [] 
          });
          const savedLesson = await newLesson.save();
          savedLessonIds.push(savedLesson._id);
        }
      }
      const newModule = new Module({
        title: mod.title,
        lessons: savedLessonIds,
      });
      const savedModule = await newModule.save();
      savedModuleIds.push(savedModule._id);
    }
    const newCourse = new Course({
      title: courseData.title,
      description: courseData.description,
      modules: savedModuleIds,
      userId: req.body.userId,
    });
    const savedCourse = await newCourse.save();
    return res.status(201).json({ courseId: savedCourse._id, message: 'Course generated successfully' });
  } catch (error) {
    console.error("DETAILED BACKEND ERROR:", error.stack);
    return res.status(500).json({ error: 'Internal server error while generating course outline' });
  }
};

const generateLessonContent = async (req, res) => {
  try {
    const { courseTitle, moduleTitle, lessonTitle, lessonId, language = 'English' } = req.body;
    if (!courseTitle || !moduleTitle || !lessonTitle || !lessonId) {
      return res.status(400).json({ error: 'courseTitle, moduleTitle, lessonTitle, and lessonId are required' });
    }
    const systemInstruction = `You are an expert teacher. Generate detailed lesson content for the lesson title provided. Return ONLY raw, valid JSON. Do not use Markdown, do not use backticks, and do not add conversational text.
The JSON must be an array of objects representing content blocks.
Allowed block types:

{"type": "heading", "text": "Heading text"}

{"type": "paragraph", "text": "Detailed explanation"}

{"type": "code", "language": "python", "text": "print(\\"Hello\\")"}

{"type": "video", "query": "Highly specific YouTube search query for this topic"}

{"type": "mcq", "question": "Question?", "options": ["A", "B", "C", "D"], "answer": 1, "explanation": "Why this is correct"}

Include at least one of each block type. Generate 4 MCQs at the end.`;
    const prompt = `Course: ${courseTitle}\nModule: ${moduleTitle}\nLesson: ${lessonTitle}\nLanguage: ${language}\n\nPlease generate the detailed lesson content block array based on these details. The entire explanation, text, and MCQ questions/answers MUST be written fluently in ${language} (Code blocks must remain valid programming syntax, but the comments and explanations around them should be in ${language}).`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });
    let contentBlocks;
    try {
      const cleanedText = response.text.replace(/```json/gi, '').replace(/```/g, '').trim();
      contentBlocks = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("Failed to parse lesson JSON:", response.text);
      return res.status(500).json({ error: 'Failed to parse JSON from AI response' });
    }
    const lesson = await Lesson.findByIdAndUpdate(
      lessonId,
      { 
        contentBlocks: contentBlocks,
        isEnriched: true
      },
      { returnDocument: 'after' }
    );
    if (!lesson) {
        return res.status(404).json({ error: 'Lesson not found in the database.' });
    }
    return res.status(200).json({ lessonId: lesson._id, message: 'Lesson content generated and saved successfully', lesson });
  } catch (error) {
    console.error("Lesson generation error:", error.stack);
    return res.status(500).json({ error: 'Internal server error while generating lesson content' });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate({
      path: 'modules',
      populate: {
        path: 'lessons'
      }
    });
    return res.json(course);
  } catch (error) {
    console.error("getCourseById error:", error.stack);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllCourses = async (req, res) => {
  try {
    let query = {};
    if (req.query.userId) {
      query.userId = req.query.userId;
    }
    const courses = await Course.find(query).select('title _id').sort({ createdAt: -1 });
    return res.json(courses);
  } catch (error) {
    console.error("getAllCourses error:", error.stack);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    return res.json(lesson);
  } catch (error) {
    console.error("getLessonById error:", error.stack);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const toggleLessonComplete = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    
    lesson.isCompleted = req.body.isCompleted !== undefined ? req.body.isCompleted : !lesson.isCompleted;
    await lesson.save();
    
    return res.json({ message: 'Lesson completion toggled', isCompleted: lesson.isCompleted });
  } catch (error) {
    console.error("toggleLessonComplete error:", error.stack);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const generateAudio = async (req, res) => {
  try {
    const { text, targetLanguage = 'Hinglish', voiceName } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    const systemInstruction = `You are an expert educational translator. Translate the provided English lesson text into ${targetLanguage}. The translation must be contextually aware and designed to assist students with partial English fluency. If Hinglish, use a natural mix of Hindi written in Latin script and English terms. Return ONLY the translated string.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: text,
      config: {
        systemInstruction: systemInstruction,
      }
    });
    
    const translatedText = response.text.trim();
    
    const languageCodeMap = {
      'hinglish': 'hi',
      'hindi': 'hi',
      'pure hindi': 'hi',
      'bengali': 'bn',
      'telugu': 'te',
      'marathi': 'mr',
      'tamil': 'ta',
      'urdu': 'ur',
      'gujarati': 'gu',
      'kannada': 'kn',
      'malayalam': 'ml',
      'odia': 'or',
      'punjabi': 'pa',
      'english': 'en',
      'spanish': 'es',
      'french': 'fr',
      'german': 'de',
      'chinese': 'zh',
      'japanese': 'ja',
      'russian': 'ru',
      'arabic': 'ar',
      'portuguese': 'pt'
    };
    const normalizedLang = targetLanguage.toLowerCase().trim();
    const langCode = languageCodeMap[normalizedLang] || 'en';
    
    const ttsConfig = {
      lang: langCode,
      slow: false,
      host: 'https://translate.google.com',
      splitPunct: ',.?'
    };
    
    if (voiceName) {
      ttsConfig.voice = voiceName;
    }
    
    const audioDataArray = await googleTTS.getAllAudioBase64(translatedText, ttsConfig);
    
    const buffers = audioDataArray.map(obj => Buffer.from(obj.base64, 'base64'));
    const audioBuffer = Buffer.concat(buffers);
    
    return res.status(200).json({ audioBase64: audioBuffer.toString('base64'), translatedText });
  } catch (error) {
    console.error("Audio generation error:", error.stack);
    return res.status(500).json({ error: 'Failed to generate audio' });
  }
};

module.exports = {
  generateCourseOutline,
  generateLessonContent,
  getCourseById,
  getAllCourses,
  getLessonById,
  generateAudio,
  toggleLessonComplete
};
