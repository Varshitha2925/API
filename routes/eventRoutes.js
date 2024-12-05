const express = require('express');
const router = express.Router();
const {
    createEvent,
    editEvent,
    deleteEvent,
    getEvent,
    getBooking

} = require("../controllers/eventController")

// Event routes
router.post('/', createEvent);
router.put('/:id', editEvent);
router.delete('/:id', deleteEvent);
router.get('/getevents/:id', getEvent);
router.get('/booking/:id', getBooking);

module.exports = router;
