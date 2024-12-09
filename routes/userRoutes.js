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
    updateBookings,
    getUser,
    getUpdate
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

//get User
router.get('/user/:id', getUser);

//update User
router.post('/user/:id', getUpdate);

module.exports = router;