const express = require('express');
const { createThread, addComment, getThreads } = require('../controllers/forumController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/thread', authMiddleware, createThread);
router.post('/comment', authMiddleware, addComment);
router.get('/threads', getThreads);

module.exports = router;
