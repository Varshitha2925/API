const { MongoClient } = require('mongodb');
const { connect } = require('mongoose');

// Connection URI (replace this with your Compass connection string)
const uri = "mongodb://localhost:27017/evenbooking"; // Example for a local database

// Create a new MongoClient
const client = new MongoClient(uri);

async function main() {
    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log("Connected to MongoDB");

        // Specify the database to use
        const db = client.db("testDB"); // Replace "testDB" with your database name

        // Example: Fetch collections
        const collections = await db.listCollections().toArray();
        console.log("Collections:", collections);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        // Close the connection
        await client.close();
    }
}

module.exports = main()
