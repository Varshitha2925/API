const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');

// Routes for Admin Management
router.get('/users', AdminController.getAllUsers);
router.patch('/users/:id/block', AdminController.blockUser);
router.patch('/users/:id/unblock', AdminController.unblockUser);
router.get('/events', AdminController.getAllEvents);
router.patch('/events/:id', AdminController.editEvent);
router.delete('/events/:id', AdminController.deleteEvent);
router.get('/bookings', AdminController.getAllBookings);

module.exports = router;
