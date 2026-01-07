// models/Enrollment.js
import mongoose from 'mongoose';

const EnrollmentSchema = new mongoose.Schema({
    studentFirstName: { type: String, required: true },
    studentMiddleName: String,
    studentLastName: { type: String, required: true },
    dob: { type: Date, required: true },
    age: Number,
    course: { type: String, required: true },
    studentMobile: { type: String, required: true },
    studentEmail: { type: String, required: true },
    fatherFirstName: { type: String, required: true },
    fatherMiddleName: String,
    fatherLastName: { type: String, required: true },
    fatherMobile: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Enrollment = mongoose.model('Enrollment', EnrollmentSchema)
export default Enrollment