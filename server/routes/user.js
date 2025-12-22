const express = require('express');
const {
  addUser,
  getUser,
  updateUser,
} = require('../controllers/userController');

const router = express.Router();

//get all universities
router.post('/', addUser);

//get a user
router.get('/:id', getUser);

//update a user
router.patch('/:id', updateUser);

module.exports = router;
