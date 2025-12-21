const express = require('express');
const {
  getAllUniversities,
  postUni,
} = require('../controllers/universityControllers');

const router = express.Router();

//get all universities
router.get('/universities', getAllUniversities);

module.exports = router;
