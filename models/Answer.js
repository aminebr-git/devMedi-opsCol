const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  content: String,
  user: {
    type:mongoose.Schema.Types.ObjectId,
    required:'user is required',
    ref:"User",
},
  createdAt: { type: Date, default: Date.now },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  parentAnswer: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer', default: null }, // New field to indicate a reply to another answer
});

module.exports = mongoose.model('Answer', answerSchema);



  