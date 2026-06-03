const express = require('express');
const router = express.Router();
const { getProperties, getPublicStats, createProperty, updateProperty, deleteProperty } = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware');

router.get('/stats', getPublicStats);


router.route('/')
    .get(getProperties)
    .post(protect, createProperty);

router.route('/:id')
    .put(protect, updateProperty)
    .delete(protect, deleteProperty);

router.post('/:id/view', async (req, res) => {
    try {
        const Property = require('../models/Property');
        await Property.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
