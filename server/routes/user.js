const express = require('express');
const { addUser } = require('../controllers/userController');

const router = express.Router();

//get all universities
router.post('/', addUser);

module.exports = router;
