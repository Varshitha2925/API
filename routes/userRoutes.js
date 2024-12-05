const express = require('express');
const router = express.Router();
const {
    searchEvents,
    getBookings,
    cancelBooking,
    updateProfile,
    register,
    login,
    getAllEvents,
    addbooking,
    payment,
    updateBookings
} = require("../controllers/usercontroller")

// Search Events
// router.get('/events', searchEvents);

router.get('/events', getAllEvents);

// View/Cancel Bookings
router.get('/bookings/:id', getBookings);

router.delete('/bookings/:id', cancelBooking);

router.put('/bookings/:id', updateBookings);

// Update Profile
router.put('/profile', updateProfile);

// Registration
router.post('/register', register);

// Login
router.post('/login', login);

//Booking
router.post('/booking',addbooking)

//payment
router.post('/payment',payment)

module.exports = router;
