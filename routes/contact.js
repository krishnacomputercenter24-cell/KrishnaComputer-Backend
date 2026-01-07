import express from "express";
import { sendEmail } from "../config/mailer.js";

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { email, name, phone } = req.body;

        if (!email || !name || !phone) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        const message = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6;">
    <h2 style="color: #333;">New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <hr>
    <p style="color: #555;">You received this email because someone submitted the contact form on your website.</p>
  </div>
`;

        const subject = "Contact Form Submission";

        await sendEmail("", message, subject);

        res.status(200).json({ success: "Email sent successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send email!" });
    }
});

export default router;
