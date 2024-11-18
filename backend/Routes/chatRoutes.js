const express = require('express');
const { getRecommendations } = require('../Controllers/chatController');
const { verifyToken } = require('../Middleware/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, getRecommendations);

module.exports = router;
