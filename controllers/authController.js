const Organizer = require('../models/organizer');

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Register
exports.register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const organizer = new Organizer({ ...req.body, password: hashedPassword });
    await organizer.save();
    res.status(201).send('Organizer registered successfully');
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Login
exports.login = async (req, res) => {
  
    const { email, password } = req.body;
    console.log("req.body",req.body)
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
    const user = await Organizer.findOne({ email });
    //compare password with hashed password
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
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
exports.getOrganizer = async (req, res) => {
      console.log("req.params",req.params.id)
      try {
        const organizer = await Organizer.findById(req.params.id)
        console.log("Organizer",organizer)
        res.status(200).json(organizer);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch organizer' });
      }
    };
exports.getUpdate = async (req, res) => {
      console.log("req.params",req.params.id)
      try {
        const organizer = await Organizer.findByIdAndUpdate(req.params.id,req.body)
        console.log("Organizer",organizer)
        res.status(200).json(organizer);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch organizer' });
      }
    };