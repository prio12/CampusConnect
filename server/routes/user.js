const express = require('express');
const { addUser, getUser } = require('../controllers/userController');

const router = express.Router();

//get all universities
router.post('/', addUser);

//get a user
router.get('/:id', getUser);

module.exports = router;
