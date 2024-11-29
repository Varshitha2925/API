const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const {
    searchEvents,
    getBookings,
    cancelBooking,
    updateProfile,
    register,
    login,
    getAllEvents,
    addbooking
} = require("../controllers/usercontroller")

// Search Events
// router.get('/events', searchEvents);

router.get('/events', getAllEvents);

// View/Cancel Bookings
router.get('/bookings', getBookings);

router.delete('/bookings/:id', cancelBooking);

// Update Profile
router.put('/profile', updateProfile);

// Registration
router.post('/register', register);

// Login
router.post('/login', login);

//Booking
router.post('/booking',addbooking)

module.exports = router;
