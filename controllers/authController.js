const Organizer = require('./models/organizer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
  try {
    const organizer = await Organizer.findOne({ email: req.body.email });
    if (!organizer) return res.status(404).send('Organizer not found');
    const isValid = await bcrypt.compare(req.body.password, organizer.password);
    if (!isValid) return res.status(401).send('Invalid credentials');
    const token = jwt.sign({ id: organizer._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
