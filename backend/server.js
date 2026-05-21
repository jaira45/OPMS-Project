const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const JWT_SECRET = process.env.JWT_SECRET || 'opms-super-secret-key-12345';
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('❌ ERROR: MONGO_URI is not defined in .env file!');
    process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB Atlas
const connectDb = async () => {
    try {
        console.log('Connecting to MongoDB Atlas...');
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB Atlas successfully!');
    } catch (err) {
        if (err.message.includes('querySrv ECONNREFUSED')) {
            console.log('⚠️ SRV DNS Block detected. Attempting direct node connection...');
            const directUri = 'mongodb://jyotigupta85188_db_user:I5uRMY9SUE4ti7Wd@cluster0-shard-00-00.3edaqfz.mongodb.net:27017,cluster0-shard-00-01.3edaqfz.mongodb.net:27017,cluster0-shard-00-02.3edaqfz.mongodb.net:27017/odms?ssl=true&replicaSet=atlas-vt8v3o-shard-0&authSource=admin&appName=Cluster0';
            try {
                await mongoose.connect(directUri);
                console.log('✅ Connected to MongoDB Atlas successfully (via direct nodes)!');
                return;
            } catch (directErr) {
                console.error('❌ Direct Connection Error:', directErr.message);
            }
        }
        console.error('❌ MongoDB Connection Error:', err.message);
        process.exit(1);
    }
};

connectDb();

// Schemas
const UserSchema = new mongoose.Schema({
    _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true }
}, { timestamps: true });

const PropertySchema = new mongoose.Schema({
    _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
    title: { type: String, required: true },
    price: { type: String, required: true },
    location: { type: String }, // Restored/added location for frontend matching
    bhk: { type: String },
    floor: { type: String },
    carpetArea: { type: String },
    builtupArea: { type: String },
    coverImage: { type: String },
    status: { type: String, default: 'Pending' }
}, { timestamps: true });

const InquirySchema = new mongoose.Schema({
    _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
    propertyId: { type: String, ref: 'Property', required: true }, // Restore ref
    propertyName: { type: String, required: true },
    buyerName: { type: String, required: true },
    buyerEmail: { type: String, required: true },
    message: { type: String },
    price: { type: String },
    status: { type: String, default: 'Sent' } // Sent, Viewed, Responded, Resolved
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
const Property = mongoose.model('Property', PropertySchema);
const Inquiry = mongoose.model('Inquiry', InquirySchema);

// Helper to sanitize user object for JSON response
const userToJSON = (user) => {
    const userObj = typeof user.toObject === 'function' ? user.toObject() : { ...user };
    delete userObj.password;
    return userObj;
};

// Database Helper Functions
const getProperties = async () => await Property.find();
const getPropertyById = async (id) => await Property.findById(id);
const addProperty = async (data) => {
    const newProperty = new Property(data);
    return await newProperty.save();
};
const updatePropertyStatus = async (id, status) => await Property.findByIdAndUpdate(id, { status }, { new: true });
const deleteProperty = async (id) => await Property.findByIdAndDelete(id);
const getUsers = async () => await User.find();
const getUserByEmail = async (email) => await User.findOne({ email });
const addUser = async (data) => {
    const newUser = new User(data);
    return await newUser.save();
};
const getInquiries = async () => await Inquiry.find().sort({ createdAt: -1 });
const addInquiry = async (data) => {
    const newInquiry = new Inquiry(data);
    return await newInquiry.save();
};
const updateInquiryStatus = async (id, status) => await Inquiry.findByIdAndUpdate(id, { status }, { new: true });


// Serve static files from the parent directory (React build logic could go here later)
app.use(express.static(path.join(__dirname, '../')));

// --- API Endpoints ---

// Default Route
app.get("/", (req, res) => {
    res.send("OPMS Backend Running");
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);

        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
                return res.status(200).json({ message: 'Login successful', token, user: userToJSON(user) });
            }
        }
        return res.status(401).json({ message: 'Invalid credentials' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Signup Endpoint
app.post('/api/signup', async (req, res) => {
    try {
        const { fullName, email, phone, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const existingUser = await getUserByEmail(email);
        if (existingUser) return res.status(400).json({ message: 'Email already in use' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await addUser({ fullName, email, phone, password: hashedPassword });

        const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '24h' });
        return res.status(201).json({ message: 'Account created successfully', token, user: userToJSON(newUser) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ─── JWT Middleware ────────────────────────────────────────────────────────────
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // { id, email, iat, exp }
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token. Please log in again.' });
    }
};

// GET /api/me — fetch current user profile via token
app.get('/api/me', verifyToken, async (req, res) => {
    try {
        const user = await getUserByEmail(req.user.email);
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json({ user: userToJSON(user) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Users Endpoint (Admin only — protected)
app.get('/api/users', verifyToken, async (req, res) => {
    try {
        const users = await getUsers();
        // Remove password field for security
        const sanitizedUsers = users.map(u => userToJSON(u));
        return res.status(200).json({ users: sanitizedUsers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add Property Endpoint (protected)
app.post('/api/properties', verifyToken, async (req, res) => {
    try {
        const propertyData = req.body;
        if (!propertyData.title || !propertyData.price) {
            return res.status(400).json({ message: 'Title and Price are required' });
        }

        const newProperty = await addProperty(propertyData);

        return res.status(201).json({ message: 'Property added successfully', property: newProperty });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Properties Endpoint
app.get('/api/properties', async (req, res) => {
    try {
        const properties = await getProperties();
        return res.status(200).json({ properties });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Property (Approve/Reject) Endpoint (protected)
app.put('/api/properties/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedProperty = await updatePropertyStatus(id, status);
        if (!updatedProperty) return res.status(404).json({ message: 'Property not found' });
        return res.status(200).json({ message: `Property status updated to ${status}`, property: updatedProperty });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete Property Endpoint (protected)
app.delete('/api/properties/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProperty = await deleteProperty(id);
        if (!deletedProperty) return res.status(404).json({ message: 'Property not found' });
        return res.status(200).json({ message: 'Property deleted successfully', property: deletedProperty });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add Inquiry Endpoint
app.post('/api/inquiries', async (req, res) => {
    try {
        const { propertyId, propertyName, buyerName, buyerEmail, message, price } = req.body;
        if (!propertyId || !propertyName || !buyerName || !buyerEmail) {
            return res.status(400).json({ message: 'Missing required inquiry fields' });
        }
        const newInquiry = await addInquiry({ propertyId, propertyName, buyerName, buyerEmail, message, price });
        return res.status(201).json({ message: 'Inquiry submitted successfully', inquiry: newInquiry });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Inquiries Endpoint
app.get('/api/inquiries', async (req, res) => {
    try {
        const inquiries = await getInquiries();
        return res.status(200).json({ inquiries });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Inquiry Status Endpoint (protected)
app.put('/api/inquiries/:id', verifyToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedInquiry = await updateInquiryStatus(id, status);
        if (!updatedInquiry) return res.status(404).json({ message: 'Inquiry not found' });
        return res.status(200).json({ message: `Inquiry status updated to ${status}`, inquiry: updatedInquiry });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Catch-all route to serve static assets or original pages if direct files are asked for
// Catch-all route for SPA — serve index.html if not an API route
app.use((req, res, next) => {
    // If it's an API route that wasn't matched, send 404
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ message: 'API endpoint not found' });
    }

    // Check if frontend/dist/index.html exists (production)
    const distPath = path.join(__dirname, '../frontend/dist/index.html');
    if (require('fs').existsSync(distPath)) {
        return res.sendFile(distPath);
    }

    // Default to serving static files from the root or parent for legacy/dev
    res.sendFile(path.join(__dirname, '../', req.path), (err) => {
        if (err) {
            // If file doesn't exist, it might be a React route, but we don't have a built index yet
            // Just return a generic 404 or index if possible.
            res.status(404).send("Page not found. If this is a React route, please build the frontend.");
        }
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
