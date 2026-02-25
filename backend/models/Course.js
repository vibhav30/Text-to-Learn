const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  modules: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Module',
    },
  ],
  userId: { 
    type: String, 
    required: false 
  },
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);
