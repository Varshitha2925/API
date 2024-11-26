const express = require('express');
const adminRoutes = require('./routes/admin');
const main = require("./config/db");



const app = express();
app.use(express.json());

const cors = require('cors');

const port = process.env.PORT || 3001;


// Allow CORS for all origins
app.use(cors());

app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
  });
  

// Admin Routes
app.use('/api/admin', adminRoutes);

// Start Server
main()

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app