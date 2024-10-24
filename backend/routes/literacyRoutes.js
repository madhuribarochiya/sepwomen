const express = require('express');
const { getLiteracyTools, createTool, updateToolProgress } = require('../controllers/literacyController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getLiteracyTools);
router.post('/', authMiddleware, createTool);
router.put('/', authMiddleware, updateToolProgress);

module.exports = router;
