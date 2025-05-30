const express = require('express');
const { register, login } = require('../controllers/authController'); // Ensure this is correct path to controller
const router = express.Router();

// Register Route
router.post('/register', register);

// Login Route
router.post('/login', login);

module.exports = router;
