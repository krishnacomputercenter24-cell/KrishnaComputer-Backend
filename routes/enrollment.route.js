// routes/enrollmentRoutes.js
import express from 'express';
import { submitEnrollment } from '../controller/enrollment.controller.js';
const router = express.Router();

// POST - Submit enrollment form
router.post('/submit-form', submitEnrollment);
export default router;