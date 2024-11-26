const Event = require('../models/event');

// Create Event
export async function createEvent(req, res) {
  try {
    const event = new Event({ ...req.body, organizerId: req.user.id });
    await event.save();
    res.status(201).send(event);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// Edit Event
export async function editEvent(req, res) {
  try {
    const event = await findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send(event);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// Delete Event
export async function deleteEvent(req, res) {
  try {
    await findByIdAndDelete(req.params.id);
    res.status(200).send('Event deleted');
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// Get Events
export async function getEvents(req, res) {
  try {
    const events = await find({ organizerId: req.user.id });
    res.status(200).send(events);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
