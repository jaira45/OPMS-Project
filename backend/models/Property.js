const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    area: { type: String, required: true },
    category: { type: String, enum: ['buy', 'rent'], default: 'buy' },
    description: { type: String },
    images: [String],
    propertyType: { type: String, default: 'Apartment' }, // e.g., Apartment, Villa, Office
    furnishedStatus: { type: String, default: 'Unfurnished' }, // e.g., Unfurnished, Semi-furnished, Fully-furnished
    latitude: { type: Number, default: 22.7196 }, // Default to Indore/Central India
    longitude: { type: Number, default: 75.8577 },
    status: { type: String, enum: ['Pending', 'Approved'], default: 'Pending' },
    views: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Property', PropertySchema);
