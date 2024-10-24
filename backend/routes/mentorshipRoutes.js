const express = require('express');
const { getMentors, signupMentorship, matchMentor } = require('../controllers/mentorshipController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/mentors', authMiddleware, getMentors); // Get available mentors
router.post('/signup', authMiddleware, signupMentorship); // Signup as mentor or mentee
router.post('/match', authMiddleware, matchMentor); // Match mentor with mentee

module.exports = router;
