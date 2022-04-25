const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();
const User = require('../models/user');


router.post('/signup', userController.signup);

router.post('/signin', userController.signin);

module.exports = router;
