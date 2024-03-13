const Question = require('../models/Question');
const Answer = require('../models/Answer');

const { GoogleGenerativeAI } = require("@google/generative-ai");


const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY);

exports.getAllQuestions = async (req, res) => {
  const questions = await Question.find().populate('user');
  res.json(questions);
};

exports.createQuestion = async (req, res) => {
  const newQuestion = new Question(req.body);
  try{
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  }catch{
    res.status(500).json("User not found or another probleme");
  }
  
};

exports.getQuestionById = async (req, res) => {
  const question = await Question.findById(req.params.id).populate('user');
  if (!question) return res.status(404).send('Question not found');
  res.json(question);
};

exports.updateQuestion = async (req, res) => {
  const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedQuestion);
};

exports.deleteQuestion = async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  await Answer.deleteMany({ question: req.params.id });
  res.status(204).send('Question deleted');
};



