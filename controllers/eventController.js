const Event = require('../models/event');
const Booking = require('../models/booking')

// Create Event
exports.createEvent = async (req, res) => {
  try {
    console.log("req.body", req.body.newEvent)
    const event = new Event({...req.body.newEvent});
    event.eventId = event._id;
    await event.save();
    res.status(201).send(event);
  } catch (err) {
    res.status(400).send(err.message);
    console.log("ERROR",err)
  }
}

// Edit Event
exports.editEvent = async (req, res) => {
  console.log("req.params", req.params)
  console.log("req.body", req.body)
  try {
    // const event = await findByIdAndUpdate(req.params.id, req.body, { new: true });
    const {id} = req.params
    const event = await Event.findOneAndUpdate({id:id} , { $set: req.body.newEvent }, // Apply updates from req.body
      { new: true } )

    res.status(200).send(event);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// Delete Event
exports.deleteEvent = async (req, res) => {

  try {
    const {id} = req.params
    const deletedEvent = await Event.findOneAndDelete({ id:id });
    console.log("delete Event",deletedEvent)

    res.status(200).send('Event deleted',deletedEvent);
  } catch (err) {
    res.status(400).send("err",err.message);
  }
}

// Get Events
exports.getEvent = async (req, res) => {
  // console.log("params: " , req.params.id)
  try {
    const events = await Event.find().where({organizerId : req.params.id});
    // console.log("events",events)
    res.status(200).send(events);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

//Get Bookings
exports.getBooking = async (req, res) => {
  // console.log("params: " , req.params.id)
  try {
    const booking = await Booking.find().where({eventId : req.params.id});
    // console.log("events",events)
    res.status(200).send(booking);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
