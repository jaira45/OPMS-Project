const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, updateProfile, getUsers, deleteUser, toggleFavorite } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getUsers);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/update-profile').put(protect, updateProfile);
router.route('/favorite').post(protect, toggleFavorite);
router.route('/:id').delete(protect, deleteUser);

module.exports = router;
