const Property = require('../models/Property');
const User = require('../models/User');
const Inquiry = require('../models/Inquiry');

const getProperties = async (req, res) => {
    try {
        const { sort } = req.query;
        let query = Property.find();

        if (sort === 'latest' || sort === 'recent') {
            query = query.sort({ createdAt: -1 });
        } else if (sort === 'popular') {
            query = query.sort({ views: -1 });
        } else if (sort === 'luxury') {
            query = query.sort({ price: -1 });
        }

        const properties = await query;
        res.json({ properties });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPublicStats = async (req, res) => {
    try {
        const [totalProperties, totalUsers, totalInquiries, activeListings] = await Promise.all([
            Property.countDocuments(),
            User.countDocuments(),
            Inquiry.countDocuments(),
            Property.countDocuments({ status: 'Approved' })
        ]);

        res.json({
            stats: {
                totalProperties,
                totalUsers,
                totalInquiries,
                activeListings
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProperty = async (req, res) => {
    try {
        const property = await Property.create(req.body);
        res.status(201).json({ message: 'Property added', property });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedProperty = await Property.findByIdAndUpdate(id, { status }, { new: true });
        if (!updatedProperty) return res.status(404).json({ message: 'Property not found' });
        res.json({ message: `Property status updated to ${status}`, property: updatedProperty });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProperty = await Property.findByIdAndDelete(id);
        if (!deletedProperty) return res.status(404).json({ message: 'Property not found' });
        res.json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProperties, getPublicStats, createProperty, updateProperty, deleteProperty };
