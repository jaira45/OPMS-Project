const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            console.log(`[AUTH_MIDDLEWARE] Verifying token...`);
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'opms-super-secret-key-12345');
            console.log(`[AUTH_MIDDLEWARE] Token decoded, user ID: ${decoded.id}`);
            
            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                console.warn(`[AUTH_MIDDLEWARE] User not found in DB: ${decoded.id}`);
                return res.status(401).json({ message: 'User not found' });
            }
            console.log(`[AUTH_MIDDLEWARE] Access granted to: ${req.user.email}`);
            next();
        } catch (error) {
            console.error(`[AUTH_MIDDLEWARE] Token invalid: ${error.message}`);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        console.warn(`[AUTH_MIDDLEWARE] No token provided in headers`);
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
