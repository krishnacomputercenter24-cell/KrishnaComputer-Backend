// controllers/enrollmentController.js
import { generateMentorEmailMessage } from '../config/mailer.js';
import Enrollment from '../model/enrollment.js';

export const submitEnrollment = async (req, res) => {
  try {
    const requiredFields = [
      'studentFirstName', 'studentLastName', 'dob',
      'studentMobile', 'studentEmail', 'fatherFirstName',
      'fatherLastName', 'fatherMobile', 'fatherOccupation'
    ];

    let input = req.body;

    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} is required field`
        });
      }
    }

    const student = await Enrollment.findOne({
      $or: [
        {studentEmail: input.studentEmail},
        {studentMobile: input.studentMobile}
      ]
    })
    console.log("student: ", student)

    if (student) {
      res.status(401).json({ message: "Student already registered with this email or phone" })
    }

    const enrollment = new Enrollment({
      ...input,
      course: req.body.course || 'Unknown Course'
    });

    await enrollment.save();

    generateMentorEmailMessage(input)

    res.status(201).json({
      success: true,
      data: enrollment,
      message: 'Enrollment submitted successfully'
    });

  } catch (error) {
    console.error('Error submitting enrollment:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};