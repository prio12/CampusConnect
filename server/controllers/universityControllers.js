const University = require('../models/uniModel');
const User = require('../models/userModel');

//get all uni
async function getAllUniversities(req, res) {
  try {
    const universities = await University.find({});
    res.status(200).json({
      success: true,
      universities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

async function updateUniversity(req, res) {
  try {
    const id = req.params.id;
    const { userId, comment, rating } = req.body;

    if (!userId || !comment || !rating) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: userId, comment, rating',
      });
    }

    // Find university by id
    const university = await University.findById(id);
    if (!university) {
      return res.status(404).json({
        success: false,
        message: 'University not found',
      });
    }

    // Optional: validate user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Add new review
    university.reviews.push({
      user: userId,
      comment,
      rating,
    });

    // Update rating and numRatings
    const totalRatings = university.reviews.reduce(
      (sum, r) => sum + r.rating,
      0
    );
    university.numRatings = university.reviews.length;
    university.rating = totalRatings / university.numRatings;

    // Save updated university
    await university.save();

    return res.status(200).json({
      success: true,
      message: 'Review added successfully',
      university,
    });
  } catch (error) {
    console.error('Update university error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
}

module.exports = {
  getAllUniversities,
  updateUniversity,
};
