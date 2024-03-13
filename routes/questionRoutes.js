const express = require('express');
const { getAllQuestions, createQuestion, getQuestionById, updateQuestion, deleteQuestion,openaiForum } = require('../controllers/questionController');

const router = express.Router();

router.get('/', getAllQuestions); // 200 OK
router.post('/', createQuestion); // 201 OK
router.get('/:id', getQuestionById); // 200 OK
router.put('/:id', updateQuestion); // 200 OK
router.delete('/:id', deleteQuestion); // 200 OK

module.exports = router;
