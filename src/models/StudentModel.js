const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const StudentSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    admissionDate: {
        type: Date,
        required: true
    },
    courses: {
        type: String,
        required: true
    }
},
    {
        versionKey: false,
        timestamps: true
    }
);

const StudentModel = mongoose.model('students', StudentSchema);
module.exports = StudentModel;