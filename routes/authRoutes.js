const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/organizer/:id', authController.getOrganizer);
router.post('/organizer/:id', authController.getUpdate);

module.exports = router;
