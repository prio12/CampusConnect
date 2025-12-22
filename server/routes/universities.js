const express = require('express');
const {
  getAllUniversities,
  postUni,
  updateUniversity,
} = require('../controllers/universityControllers');

const router = express.Router();

//get all universities
router.get('/universities', getAllUniversities);

//update the uni
router.patch('/universities/:id', updateUniversity);

module.exports = router;
