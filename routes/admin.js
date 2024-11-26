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
    deleteEvent


} = require("../controllers/AdminController")


// Routes for Admin Management
router.get('/users', getAllUsers);
router.patch('/users/:id/block', blockUser);
router.patch('/users/:id/unblock', unblockUser);
router.get('/events', getAllEvents);
router.patch('/events/:id', editEvent);
router.delete('/events/:id', deleteEvent);
router.get('/bookings', getAllBookings);

module.exports = router;
