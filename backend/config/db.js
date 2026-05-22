const mongoose = require('mongoose');
const dns = require('dns');

// Automatically bypass local DNS blocks by using Google DNS for SRV lookups
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB Atlas...');
        await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
        console.log('✅ Connected to MongoDB Atlas successfully!');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
        // Do not exit process here, let the express middleware return 503 to the frontend
    }
};

module.exports = connectDB;
