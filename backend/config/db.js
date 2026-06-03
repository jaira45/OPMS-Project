const mongoose = require('mongoose');
const dns = require('dns');

// Set DNS servers to Google's public DNS to resolve Atlas SRV lookup issues
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Error: ${error.message}`);
        // In development, we keep the server alive so it can report the 503 status
        // instead of crashing and causing a "Connection Refused" error.
    }
};

module.exports = connectDB;