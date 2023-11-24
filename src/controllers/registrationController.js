const Student = require('../models/StudentModel');

// Read All
exports.getAll = async (req, res) => {
    try {
        const users = await Student.find();
        res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Create One
exports.createProfile = async (req, res) => {
    try {
        const user = await Student.create(req.body);
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Update One
exports.updateProfile = async (req, res) => {
    try {
        const user = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Delete One
exports.deleteProfile = async (req, res) => {
    try {
        const user = await Student.findByIdAndDelete(req.body._id);
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
