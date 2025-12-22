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

async function getUser(req, res) {
  try {
    const { id: uid } = req.params;

    if (!uid) {
      return res
        .status(400)
        .json({ success: false, message: 'UID is required' });
    }

    const user = await User.findOne({ uid }).lean();

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    // Safe population for admissions
    if (user.admissions && user.admissions.length > 0) {
      for (let i = 0; i < user.admissions.length; i++) {
        const collegeId = user.admissions[i].college;
        if (collegeId) {
          try {
            const college = await University.findById(collegeId).lean();
            user.admissions[i].college = college || null;
          } catch {
            user.admissions[i].college = null;
          }
        }
      }
    }

    // Safe population for reviews
    if (user.reviews && user.reviews.length > 0) {
      for (let i = 0; i < user.reviews.length; i++) {
        const collegeId = user.reviews[i].college;
        if (collegeId) {
          try {
            const college = await University.findById(collegeId).lean();
            user.reviews[i].college = college || null;
          } catch {
            user.reviews[i].college = null;
          }
        }
      }
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Error getting user:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

// Update user info or submit admission
async function updateUser(req, res) {
  try {
    const uid = req.params.id;
    const updateData = req.body;

    // Find user by uid
    const user = await User.findOne({ uid });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    if (updateData.admission) {
      user.admissions.push({
        college: updateData.admission.college,
        candidateName: updateData.admission.candidateName,
        image: updateData.admission.image,
        subject: updateData.admission.subject,
        candidatePhone: updateData.admission.candidatePhone,
        address: updateData.admission.address,
        dob: updateData.admission.dob,
      });

      await user.save();

      return res.status(200).json({
        success: true,
        message: 'Admission submitted successfully',
        admissions: user.admissions,
      });
    }

    Object.keys(updateData).forEach((key) => {
      user[key] = updateData[key];
    });

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user,
    });
  } catch (error) {
    console.error('Update user error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
}

module.exports = {
  addUser,
  getUser,
  updateUser,
};
