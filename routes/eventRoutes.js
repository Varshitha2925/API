const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const authenticate = require('../middleware/authenticate'); // JWT authentication middleware

// Event routes
router.post('/', authenticate, eventController.createEvent);
router.put('/:id', authenticate, eventController.editEvent);
router.delete('/:id', authenticate, eventController.deleteEvent);
router.get('/', authenticate, eventController.getEvents);

module.exports = router;
