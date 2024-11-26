const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Event routes
router.post('/', eventController.createEvent);
router.put('/:id', eventController.editEvent);
router.delete('/:id', eventController.deleteEvent);
router.get('/', eventController.getEvents);

module.exports = router;
