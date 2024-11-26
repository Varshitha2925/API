const express = require('express');
const adminRoutes = require('./routes/admin');
const connectToDatabase = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');



const app = express();
app.use(express.json());

const cors = require('cors');



// Allow CORS for all origins
app.use(cors());

app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
  });
// Start Server

db = connectToDatabase(); // Connect to MongoDB and get the database instance

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// app.get('/users', async (req, res) => {
//   try {
//     const collection = db.collection('users');
//     const data = await collection.find().toArray();
//     res.json(data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// Admin Routes
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

module.exports = app