const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'opms-super-secret-key-12345';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Fallback status indicator
let useInMemoryDb = false;

// Connect to MongoDB using 3-Level Robust Connection with background spin-up
const connectDb = async () => {
    try {
        console.log('Connecting to local MongoDB on port 27017...');
        // Try Level 1: Standard local MongoDB
        await mongoose.connect('mongodb://127.0.0.1:27017/odms', {
            serverSelectionTimeoutMS: 2000
        });
        console.log('Connected to local MongoDB successfully!');
    } catch (err) {
        console.log('⚠️ Local MongoDB not found on port 27017.');
        console.log('⚡ Temporary Fallback Activated: Running OPMS with in-memory JS database.');
        useInMemoryDb = true;

        // Spin up MongoMemoryServer in the background so we do not block server startup!
        setTimeout(async () => {
            try {
                console.log('\n🔄 [Background] Starting download/spin-up of local in-memory MongoDB Server...');
                const { MongoMemoryServer } = require('mongodb-memory-server');

                const mongoServer = await MongoMemoryServer.create({
                    binary: {
                        version: '4.4.24'
                    },
                    instance: {
                        dbName: 'odms'
                    }
                });
                const mongoUri = mongoServer.getUri();
                console.log(`\n🚀 [Background] In-memory MongoDB Server ready at: ${mongoUri}`);

                await mongoose.connect(mongoUri);
                console.log('✅ [Background] Connected to in-memory MongoDB successfully!');

                // Migrate data from in-memory JS arrays to the real MongoDB in-memory database!
                console.log('📦 [Background] Migrating temporary data to real MongoDB database...');

                // Migrate Users
                for (const user of inMemoryUsers) {
                    const exists = await User.findOne({ email: user.email });
                    if (!exists) {
                        const newU = new User(user);
                        newU._id = user._id;
                        await newU.save();
                    }
                }

                // Migrate Properties
                for (const prop of inMemoryProperties) {
                    const exists = await Property.findOne({ title: prop.title });
                    if (!exists) {
                        const newP = new Property(prop);
                        newP._id = prop._id;
                        await newP.save();
                    }
                }

                // Migrate Inquiries
                for (const inq of inMemoryInquiries) {
                    const newI = new Inquiry(inq);
                    newI._id = inq._id;
                    await newI.save();
                }

                console.log('🎉 [Background] Data migration complete. Upgraded seamlessly to real MongoDB!');
                useInMemoryDb = false; // Switch to use real MongoDB now!
            } catch (memErr) {
                console.log('❌ [Background] Failed to launch MongoDB Memory Server:', memErr.message);
                console.log('⚡ Permanent Fallback Activated: Staying on in-memory JS database.');
            }
        }, 100);
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

// In-Memory Fallback Stores with Initial Hydrated Mock Data
const inMemoryUsers = [
    {
        _id: 'u1',
        fullName: 'Admin User',
        email: 'admin@opms.com',
        phone: '9876543210',
        password: bcrypt.hashSync('admin', 10),
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: 'u2',
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        password: bcrypt.hashSync('password123', 10),
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

const inMemoryProperties = [
    {
        _id: 'p1',
        title: 'Shyamala Hills Heritage Suite',
        price: '₹ 1.2 Cr',
        location: 'Bhopal, Madhya Pradesh',
        bhk: '3 BHK',
        floor: '2nd Floor',
        carpetArea: '1450 sqft',
        builtupArea: '1800 sqft',
        coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500&auto=format&fit=crop&q=60',
        status: 'Pending',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: 'p2',
        title: 'Indore Premium Sky-Residences',
        price: '₹ 85.5 L',
        location: 'Vijay Nagar, Indore',
        bhk: '2 BHK',
        floor: '8th Floor',
        carpetArea: '1050 sqft',
        builtupArea: '1300 sqft',
        coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&auto=format&fit=crop&q=60',
        status: 'Pending',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        _id: 'p3',
        title: 'Aura Premium Bungalow',
        price: '₹ 2.4 Cr',
        location: 'Arera Colony, Bhopal',
        bhk: '4 BHK',
        floor: 'Ground + 1',
        carpetArea: '2600 sqft',
        builtupArea: '3200 sqft',
        coverImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&auto=format&fit=crop&q=60',
        status: 'Approved',
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

const inMemoryInquiries = [
    {
        _id: 'i1',
        propertyId: 'p3',
        propertyName: 'Aura Premium Bungalow',
        buyerName: 'Rahul Verma',
        buyerEmail: 'rahul@example.com',
        message: 'I am interested in viewing this bungalow this weekend.',
        price: '₹ 2.3 Cr',
        status: 'Sent',
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

// Helper helper functions to abstract DB vs In-Memory
const isDbConnected = () => {
    return mongoose.connection.readyState === 1 && !useInMemoryDb;
};

const getProperties = async () => {
    if (isDbConnected()) {
        return await Property.find();
    }
    return inMemoryProperties;
};

const getPropertyById = async (id) => {
    if (isDbConnected()) {
        return await Property.findById(id);
    }
    return inMemoryProperties.find(p => p._id.toString() === id.toString());
};

const addProperty = async (data) => {
    if (isDbConnected()) {
        const newProperty = new Property(data);
        return await newProperty.save();
    }
    const newProperty = {
        _id: 'p_' + Math.random().toString(36).substr(2, 9),
        status: 'Pending',
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    inMemoryProperties.push(newProperty);
    return newProperty;
};

const updatePropertyStatus = async (id, status) => {
    if (isDbConnected()) {
        return await Property.findByIdAndUpdate(id, { status }, { new: true });
    }
    const property = inMemoryProperties.find(p => p._id.toString() === id.toString());
    if (property) {
        property.status = status;
        property.updatedAt = new Date();
    }
    return property;
};

const deleteProperty = async (id) => {
    if (isDbConnected()) {
        return await Property.findByIdAndDelete(id);
    }
    const index = inMemoryProperties.findIndex(p => p._id.toString() === id.toString());
    if (index !== -1) {
        return inMemoryProperties.splice(index, 1)[0];
    }
    return null;
};

const getUsers = async () => {
    if (isDbConnected()) {
        return await User.find();
    }
    return inMemoryUsers;
};

const getUserByEmail = async (email) => {
    if (isDbConnected()) {
        return await User.findOne({ email });
    }
    return inMemoryUsers.find(u => u.email === email);
};

const addUser = async (data) => {
    if (isDbConnected()) {
        const newUser = new User(data);
        return await newUser.save();
    }
    const newUser = {
        _id: 'u_' + Math.random().toString(36).substr(2, 9),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    inMemoryUsers.push(newUser);
    return newUser;
};

const getInquiries = async () => {
    if (isDbConnected()) {
        return await Inquiry.find().sort({ createdAt: -1 });
    }
    return [...inMemoryInquiries].sort((a, b) => b.createdAt - a.createdAt);
};

const addInquiry = async (data) => {
    if (isDbConnected()) {
        const newInquiry = new Inquiry(data);
        return await newInquiry.save();
    }
    const newInquiry = {
        _id: 'i_' + Math.random().toString(36).substr(2, 9),
        status: 'Sent',
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    inMemoryInquiries.push(newInquiry);
    return newInquiry;
};

const updateInquiryStatus = async (id, status) => {
    if (isDbConnected()) {
        return await Inquiry.findByIdAndUpdate(id, { status }, { new: true });
    }
    const inquiry = inMemoryInquiries.find(i => i._id.toString() === id.toString());
    if (inquiry) {
        inquiry.status = status;
        inquiry.updatedAt = new Date();
    }
    return inquiry;
};

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
