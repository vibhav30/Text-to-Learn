const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModuleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  lessons: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Lesson',
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Module', ModuleSchema);
