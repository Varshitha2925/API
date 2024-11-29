const express = require('express');
const adminRoutes = require('./routes/admin');
const connectDb = require("./config/db");
const dotenv = require("dotenv").config();

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const userRoutes = require('./routes/userRoutes');

const port = process.env.PORT;

const app = express();
app.use(express.json());

const cors = require('cors');

// Allow CORS for all origins
app.use(cors());

// Admin Routes
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);

app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
  });
// Start Server
connectDb();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


module.exports = app