const User = require('../models/userModel');

// Add a new user
async function addUser(req, res) {
  try {
    const { uid, name, email } = req.body;

    if (!uid || !name || !email) {
      return res
        .status(400)
        .json({ success: false, message: 'Missing required fields' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ uid });
    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: 'User already exists',
        user: existingUser,
      });
    }

    // Create new user
    const newUser = await User.create({
      uid,
      name,
      email,
      admissions: [],
      reviews: [],
      myCollege: [],
    });

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    console.error('Error adding user:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

module.exports = {
  addUser,
};
