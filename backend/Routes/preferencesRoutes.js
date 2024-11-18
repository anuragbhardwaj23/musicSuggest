const express = require('express');
const { getPreferences, updatePreferences } = require('../Controllers/preferencesController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', verifyToken, getPreferences);
router.post('/', verifyToken, updatePreferences);

module.exports = router;
