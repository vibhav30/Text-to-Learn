const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  contentBlocks: [
    {
      type: Schema.Types.Mixed,
      // Flexible array to hold AI-generated JSON data like text, code, or MCQs
    },
  ],
  isEnriched: {
    type: Boolean,
    default: false,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Lesson', LessonSchema);
