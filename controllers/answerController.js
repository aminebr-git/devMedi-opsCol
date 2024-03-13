const Answer = require('../models/Answer');
const Question = require('../models/Question');

exports.addAnswerToQuestion = async (req, res) => {
  const { questionId } = req.params;
  const { content, user } = req.body;

  const newAnswer = new Answer({
    content,
    user,
    question: questionId,
  });

  const savedAnswer = await newAnswer.save();

  // Add this answer to the question's answers array
  await Question.findByIdAndUpdate(questionId, { $push: { answers: savedAnswer._id } });

  res.status(201).json(savedAnswer);
};

exports.getAnswersByQuestion = async (req, res) => {
  const { questionId } = req.params;
  const answers = await Answer.find({ question: questionId }).populate('user');
  res.json(answers);
};

exports.updateAnswer = async (req, res) => {
  const { answerId } = req.params;
  const updatedAnswer = await Answer.findByIdAndUpdate(answerId, req.body, { new: true });
  res.json(updatedAnswer);
};

exports.deleteAnswer = async (req, res) => {
  const { answerId } = req.params;
  
  try {
    // First, find the answer to get the questionId it's associated with
    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(404).send('Answer not found');
    }
    
    const questionId = answer.question;

    // Delete the answer
    await Answer.findByIdAndDelete(answerId);

    // Remove the answer's ID from the question's answers array
    await Question.findByIdAndUpdate(questionId, { $pull: { answers: answerId } });

    res.status(204).send('Answer deleted');
  } catch (error) {
    console.error("Error deleting answer:", error);
    res.status(500).send('Error deleting answer');
  }
};
