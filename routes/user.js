const express = require('express');

const userController = require('../controllers/user');
const expenseController = require('../controllers/expense');
const userAuth= require('../middleware/auth');

const router = express.Router();
const User = require('../models/user');


router.post('/signup', userController.signup);

router.post('/signin', userController.signin);

router.post('/addexpenses', userAuth.userAuthenticate, expenseController.addUserExpenses);

router.get('/getexpenses', userAuth.userAuthenticate, expenseController.getUserExpenses);


module.exports = router;
