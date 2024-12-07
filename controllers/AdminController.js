const User = require('../models/user');
const Event = require('../models/event');
const Booking = require('../models/booking');
const Payment = require('../models/payment');
const Organizer = require('../models/organizer')



// Fetch all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      success: true,
      message: "Users data list",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while fetching users",
      error,
    });
  }
};

// Block a user
exports.blockUser = async (req, res) => {
  const userId = req.params.id;
  console.log("true")
  try {
    await User.findByIdAndUpdate(userId, { blocked: true });
    res.status(200).json({ message: 'User blocked successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to block user' });
  }
};

// Unblock a user
exports.unblockUser = async (req, res) => {
  const userId = req.params.id;
  try {
    await User.findByIdAndUpdate(userId, { blocked: false });
    res.status(200).json({ message: 'User unblocked successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to unblock user' });
  }
};

// Fetch all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('organizerId', 'name email');
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// Edit an event
exports.editEvent = async (req, res) => {
  const eventId = req.params.id;
  const eventDetails = req.body;
  try {
    await Event.findByIdAndUpdate(eventId, eventDetails);
    res.status(200).json({ message: 'Event updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const {id} = req.params
    const deletedEvent = await Event.findOneAndDelete({ id:id });
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
//Fetch all organizers
exports.getOrganizers = async (req, res) => {
  try {
    const organizer = await Organizer.find()
    res.status(200).json(organizer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch organizer' });
  }
};

// Fetch all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email')
      .populate('eventId', 'title location date');
    res.status(200).json(bookings);
  } 
  catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

// Get all Payments
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};