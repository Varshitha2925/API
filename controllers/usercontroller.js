const User = require('../models/user');
const Event = require('../models/event');
const Booking = require('../models/booking');


const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const booking = require('../models/booking');
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
    const user = await User.findOne({ email });

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
      // logger.customerLogger.log("info", "Successfully logged in");
    } else {
      res.status(401);
      // logger.customerLogger.log("error", "Error in logging user");
      throw new Error("email or password is not valid");
    }
    //   res.json({ message: "Login user" });
    }

// Fetch all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
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

// Manage Bookings
exports.getBookings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('bookings');
    res.status(200).json(user.bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).send('Booking not found');
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

