const University = require('../models/uniModel');

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

module.exports = {
  getAllUniversities,
};
