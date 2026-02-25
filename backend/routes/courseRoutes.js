const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.post('/generate-course', courseController.generateCourseOutline);
router.post('/generate-lesson', courseController.generateLessonContent);
router.get('/courses/:id', courseController.getCourseById);
router.get('/courses', courseController.getAllCourses);
router.get('/lessons/:id', courseController.getLessonById);
router.post('/generate-audio', courseController.generateAudio);
router.put('/lessons/:id/complete', courseController.toggleLessonComplete);

module.exports = router;
