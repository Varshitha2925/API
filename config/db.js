const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/'; // Connection URI for local MongoDB
const dbName = 'evenbooking'; // Database name

let db; // Variable to store the database connection

// Function to connect to MongoDB
async function connectToDatabase() {
  if (db) return db; // Return existing connection if already established

  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(dbName); // Store the database instance
    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

module.exports = connectToDatabase;
