const Event = require('../models/event');

// Create Event
exports.createEvent = async (req, res) => {
  try {
    
    const event = new Event(req.body);
    await event.save();
    res.status(201).send(event);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// Edit Event
exports.editEvent = async (req, res) => {
  try {
    const event = await findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(event);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    await findByIdAndDelete(req.params.id);
    res.status(200).send('Event deleted');
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// Get Events
exports.getEvent = async (req, res) => {
  try {
    const events = await find({ organizerId: req.user.id });
    res.status(200).send(events);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
