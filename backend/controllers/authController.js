const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register function
const register = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, role } = req.body;

    // Log the incoming request body to check fields
    console.log("Request Body:", req.body);

    // Validate required fields
    if (!firstName || !lastName || !username || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Ensure username (which is email) is unique, if using email as username
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      username,   // This will now be the email
      email,      // Ensure email is saved separately
      password: hashedPassword,
      role,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Respond with success
    res.status(201).json({
      message: 'User registered successfully',
      user: savedUser,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};


const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username (or email)
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and send JWT token with firstName, lastName, and username
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        firstName: user.firstName,   // Add firstName
        lastName: user.lastName,     // Add lastName
        username: user.username,     // Add username (email or username)
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = { register, login };
