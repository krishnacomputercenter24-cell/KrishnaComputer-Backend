import Admin from '../model/admin.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.email },
    process.env.JWT_SECRET
  );
};

export const adminRegister = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    
    // Check if user exists
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    if(password !== confirmPassword) {
      return res.status(401).json({message: 'Password and Confirm password should be same'})
    }

    // Create new user
    const admin = new Admin({ email, password});
    await admin.save();

    // Generate token
    const token = generateToken(admin);

    return res.status(201).json({ token, admin: {id: admin._id, email: admin.email} });
  } catch (error) {
    console.log("error: ",error)
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(admin);

    return res.status(200).json({ token , message: "Logged in Successfully"});
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};