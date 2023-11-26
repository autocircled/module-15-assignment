const Student = require('../models/StudentModel');
const moment = require('moment');

// Read All
exports.getAllStudents = async (req, res) => {
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

exports.getStudentByID = async (req, res) => {
    try {
        const users = await Student.findById(req.params.id);
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
        let { firstName, lastName, gender, dateOfBirth, nationality, address, email, phone, admissionDate, courses } = req.body;

        if (!firstName || !lastName || !gender || !dateOfBirth || !nationality || !address || !email || !phone || !admissionDate || !courses) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        dateOfBirth = moment(dateOfBirth, 'DD-MM-YYYY').format('YYYY-MM-DD');
        admissionDate = moment(admissionDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
        const user = await Student.create({
            firstName,
            lastName,
            gender,
            dateOfBirth,
            nationality,
            address,
            email,
            phone,
            admissionDate,
            courses
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

// Update One
exports.updateProfile = async (req, res) => {
    try {
        let { firstName, lastName, gender, dateOfBirth, nationality, address, email, phone, admissionDate, courses } = req.body;

        if (!firstName || !lastName || !gender || !dateOfBirth || !nationality || !address || !email || !phone || !admissionDate || !courses) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const isInvalidDob = moment(dateOfBirth, 'DD-MM-YYYY', true).isValid();
        const isInvalidAdm = moment(admissionDate, 'DD-MM-YYYY', true).isValid();
        if (isInvalidDob) {
            dateOfBirth = moment(dateOfBirth, 'DD-MM-YYYY').format('YYYY-MM-DD');
        }

        if (isInvalidAdm) {
            admissionDate = moment(admissionDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
        }
        const user = await Student.findByIdAndUpdate(req.params.id, {
            firstName,
            lastName,
            gender,
            dateOfBirth,
            nationality,
            address,
            email,
            phone,
            admissionDate,
            courses
        }, {
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
