const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');  // For password hashing

// Load environment variables from .env file
dotenv.config();

// MongoDB URI from environment variable or fallback to local database
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/lms';

// Connect to MongoDB
mongoose.connect(uri)
  .then(() => {
    console.log('MongoDB connected successfully');
    // Start importing users once connection is successful
    importUsers();
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });

// Define the User model with full name and password fields
const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, required: true, unique: true },  // Ensure username is unique
  role: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
}));

// Array of users to import with name and password
const users = [
  { username: 'teacher1@learnit.com', role: 'teacher', firstName: 'John', lastName: 'Doe', password: 'teacherpassword1' },
  { username: 'student1@learnit.com', role: 'student', firstName: 'Jane', lastName: 'Smith', password: 'studentpassword1' },
];

// Function to import users into the database
async function importUsers() {
  for (let user of users) {
    try {
      // Hash the password before saving it
      const salt = await bcrypt.genSalt(10);  // Generate salt for hashing
      const hashedPassword = await bcrypt.hash(user.password, salt);  // Hash the password

      // Create a new user object with hashed password
      const newUser = new User({
        ...user,
        password: hashedPassword,  // Save hashed password instead of plaintext
      });

      // Save the new user to the database
      await newUser.save();
      console.log(`User ${user.username} added successfully`);
    } catch (error) {
      console.error('Error importing user:', user.username, error);
    }
  }

  // After importing all users, fetch and print them to check everything is correct
  await printUsers();

  // Close MongoDB connection after the import is finished
  mongoose.connection.close();
}

// Function to print all users from the database
async function printUsers() {
  try {
    // Wait for the users to be fetched from the database
    const allUsers = await User.find();
    console.log('Users in database:');
    allUsers.forEach(user => {
      console.log(`ID: ${user._id}`);
      console.log(`Username: ${user.username}`);
      console.log(`Role: ${user.role}`);
      console.log(`First Name: ${user.firstName}`);
      console.log(`Last Name: ${user.lastName}`);
      console.log(`Password: ${user.password}`);  // This will show hashed password
      console.log('------------------------------------------');
    });
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}
