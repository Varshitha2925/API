const User = require('../models/user');
const Event = require('../models/event');
const Booking = require('../models/booking');


const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Payment = require('../models/payment');
// Register
exports.register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();
    res.status(201).send('Organizer registered successfully');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Login
exports.login = async (req, res) => {
  
    const { email, password } = req.body;
    console.log("Login creds", email)
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({ email }).where(blocked = 'false');

    //compare password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10h" }
      );
      res.status(200).json({user});
    } else {
      res.status(401);
      throw new Error("email or password is not valid");
    }
    }

// Fetch all events
exports.getAllEvents = async (req, res) => {
  const { startDate, endDate } = req.query;

  let filter = {};

  if (startDate && endDate) {
    filter.startdate = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  console.log("filter", filter)
  try {
    const events = await Event.find(filter);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

exports.getUser = async (req, res) => {
  console.log("req.params",req.params.id)
  try {
    const organizer = await User.findById(req.params.id)
    console.log("Organizer",organizer)
    res.status(200).json(organizer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch organizer' });
  }
};

exports.getUpdate = async (req, res) => {
  console.log("req.params",req.params.id)
  try {
    const organizer = await User.findByIdAndUpdate(req.params.id,req.body)
    console.log("Organizer",organizer)
    res.status(200).json(organizer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch organizer' });
  }
};

// Browse/Search Events
exports.searchEvents = async (req, res) => {
  try {
    const { keyword, category, location, date } = req.query;
    const filter = {};
    if (keyword) filter.title = { $regex: keyword, $options: 'i' };
    if (category) filter.type = category;
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (date) filter.date = date;

    const events = await Event.find(filter);
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//New Booking
exports.addbooking = async (req, res) => {
  try {
    // const user = await User.findById(req.user.id).populate('bookings');
    const booking = new Booking(req.body);
    console.log(Booking)
    await booking.save()
    res.status(200).json({
      data: booking
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Bookings
exports.getBookings = async (req, res) => {
  console.log("params", req.params.id)
  try {
    const user = await Booking.find().where({userId: req.params.id});
    res.status(200).json({
      data : user
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).send('Booking not found');
    const event = await Event.findOne({id:booking.eventId})
    event.ticketSold = event.ticketSold - booking.no_of_tickets
    await event.save()
    await booking.deleteOne();
    res.status(200).send('Booking cancelled');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Bookings
exports.updateBookings = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
   
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//Payment 
exports.payment= async (req, res) => {
  try {
    const { bookingId, cardNumber, expiryDate, cvv, amount } = req.body;
    const booking = await Booking.findByIdAndUpdate(bookingId, {
      booking_status:"confirmed"
    });
    const event = await Event.findOne({id:booking.eventId})
    event.ticketSold = event.ticketSold + booking.no_of_tickets
    await event.save()
    const paymentStatus = 'success'; 
    const payment = new Payment({
      bookingId,
      cardNumber: cardNumber.slice(-4), 
      expiryDate,
      amount,
      status: paymentStatus,
    });
    await payment.save();

    // const booking = await Booking.findByIdAndUpdate(bookingId,
    //   booking_status= "confirmed",);
    
    if (paymentStatus === 'success') {
      booking.booking_status = 'confirmed';
      await booking.save();
    }

    res.status(200).json({ message: 'Payment successful', payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Payment processing failed' });
  }
};

