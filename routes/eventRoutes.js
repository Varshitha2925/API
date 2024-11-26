const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const {
    createEvent,
    editEvent,
    deleteEvent,
    getEvent

} = require("../controllers/eventController")

// Event routes
router.post('/', createEvent);
router.put('/:id', editEvent);
router.delete('/:id', deleteEvent);
router.get('/', getEvent);

module.exports = router;
