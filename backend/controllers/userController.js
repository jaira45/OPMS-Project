const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/user/profile
// @access  Private
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                gender: user.gender,
                profileImage: user.profileImage,
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.gender = req.body.gender || user.gender;
            user.about = req.body.about !== undefined ? req.body.about : user.about;
            user.experience = req.body.experience !== undefined ? req.body.experience : user.experience;
            user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
            
            if (req.body.socialLinks) {
                user.socialLinks = {
                    linkedin: req.body.socialLinks.linkedin || user.socialLinks.linkedin,
                    twitter: req.body.socialLinks.twitter || user.socialLinks.twitter,
                    instagram: req.body.socialLinks.instagram || user.socialLinks.instagram
                };
            }
            
            if (req.body.profileImage !== undefined) {
                user.profileImage = req.body.profileImage;
            }

            if (req.body.password) {
                const bcrypt = require('bcryptjs');
                user.password = await bcrypt.hash(req.body.password, 10);
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                gender: updatedUser.gender,
                profileImage: updatedUser.profileImage,
                role: updatedUser.role,
                about: updatedUser.about,
                experience: updatedUser.experience,
                phoneNumber: updatedUser.phoneNumber,
                socialLinks: updatedUser.socialLinks,
                favorites: updatedUser.favorites
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json({ users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            if (user.email === 'admin@opms.com') {
                return res.status(400).json({ message: 'Cannot delete admin account' });
            }
            await User.deleteOne({ _id: req.params.id });
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Toggle favorite property
// @route   POST /api/user/favorite
// @access  Private
const toggleFavorite = async (req, res) => {
    try {
        const { propertyId } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        const isFavorite = user.favorites.includes(propertyId);

        if (isFavorite) {
            user.favorites.pull(propertyId);
        } else {
            user.favorites.push(propertyId);
        }

        await user.save();
        res.json({ message: isFavorite ? 'Removed from favorites' : 'Added to favorites', favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc    Update user profile (specifically for name, gender, profileImage)
// @route   PUT /api/users/update-profile
// @access  Private
const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.gender = req.body.gender || user.gender;
            
            if (req.body.profileImage !== undefined) {
                user.profileImage = req.body.profileImage;
            }

            const updatedUser = await user.save();

            res.json({
                success: true,
                user: {
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    gender: updatedUser.gender,
                    profileImage: updatedUser.profileImage,
                    role: updatedUser.role
                }
            });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { getUserProfile, updateUserProfile, updateProfile, getUsers, deleteUser, toggleFavorite };
