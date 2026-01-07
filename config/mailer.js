import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

export const sendEmail = async (email, message, subject) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Admin email
            subject: subject,
            html: message,
            replyTo: process.env.EMAIL_USER,
        };

        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.error("❌ Error sending email:", error);
        throw error;
    }
};


export const generateMentorEmailMessage = async (data) => {
    const subject = `New Enrollment: ${data.studentFirstName} ${data.studentLastName}`
    const message = `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px;">
    <h2 style="color: #2c3e50;">📋 New Student Enrollment Submitted</h2>
    
    <p style="font-size: 16px;">Hello Mentor,</p>
    <p style="font-size: 15px;">A new student has successfully submitted their enrollment. Please find the details below:</p>

    <h3 style="color: #34495e;">👤 Student Information</h3>
    <ul style="list-style: none; padding: 0;">
      <li><strong>Name:</strong> ${data.studentFirstName} ${data.studentMiddleName || ''} ${data.studentLastName}</li>
      <li><strong>Date of Birth:</strong> ${new Date(data.dob).toLocaleDateString()}</li>
      <li><strong>Age:</strong> ${data.age}</li>
      <li><strong>Course Enrolled:</strong> ${data.course}</li>
      <li><strong>Mobile:</strong> ${data.studentMobile}</li>
      <li><strong>Email:</strong> ${data.studentEmail}</li>
    </ul>

    <h3 style="color: #34495e;">👨‍👧 Father's Information</h3>
    <ul style="list-style: none; padding: 0;">
      <li><strong>Name:</strong> ${data.fatherFirstName} ${data.fatherMiddleName || ''} ${data.fatherLastName}</li>
      <li><strong>Mobile:</strong> ${data.fatherMobile}</li>
      <li><strong>Occupation:</strong> ${data.fatherOccupation}</li>
    </ul>

    <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;" />

    <p style="font-size: 15px;">Please reach out to the student or guardian for any further steps or orientation guidance.</p>

    <p style="font-size: 14px; color: #888;">Sent automatically by Krishna Computer Center Enrollment System</p>
  </div>
`

    await sendEmail("", message, subject)
};