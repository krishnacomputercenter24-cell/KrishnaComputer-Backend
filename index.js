import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contact.js";
import enrollmentRoutes from './routes/enrollment.route.js';
import admin from './routes/admin.route.js';
import blog from './routes/blog.route.js';
import db from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
// Middleware
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("Not allowed by CORS"), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
// Routes
app.use("/api/contact", contactRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/admin', admin);
app.use('/api/blog', blog);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});
