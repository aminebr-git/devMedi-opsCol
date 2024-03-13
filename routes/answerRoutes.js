const express = require('express');
const { addAnswerToQuestion, getAnswersByQuestion, updateAnswer, deleteAnswer } = require('../controllers/answerController');

const router = express.Router();

// Assuming you want to add an answer to a specific question
router.post('/:questionId', addAnswerToQuestion);// 201 OK
router.get('/:questionId', getAnswersByQuestion); // 200 OK
router.put('/:answerId', updateAnswer);//201 ok
router.delete('/:answerId', deleteAnswer);//201 ok

module.exports = router;
