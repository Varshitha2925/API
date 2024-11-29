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
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10h" }
      );
      res.status(200).json({ accessToken });
      // logger.customerLogger.log("info", "Successfully logged in");
    } else {
      res.status(401);
      // logger.customerLogger.log("error", "Error in logging user");
      throw new Error("email or password is not valid");
    }
    //   res.json({ message: "Login user" });
    }
