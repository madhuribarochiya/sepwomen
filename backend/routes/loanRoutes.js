const express = require('express');
const { applyLoan, getLoanStatus } = require('../controllers/loanController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/apply', authMiddleware, applyLoan);
router.get('/status', authMiddleware, getLoanStatus);

module.exports = router;
