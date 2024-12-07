const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');
const {
    getAllUsers,
    getAllBookings,
    getAllEvents,
    blockUser,
    unblockUser,
    editEvent,
    deleteEvent,
    getPayments,
    getOrganizers

} = require("../controllers/AdminController")


// Routes for Admin Management
router.get('/users', getAllUsers);
router.patch('/users/:id', blockUser);
router.patch('/users/:id/unblock', unblockUser);
router.get('/events', getAllEvents);
router.patch('/events/:id', editEvent);
router.delete('/events/:id', deleteEvent);
router.get('/bookings', getAllBookings);
router.get('/payment',getPayments);
router.get('/organizer',getOrganizers);

module.exports = router;
