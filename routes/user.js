const express = require('express');

const userController = require('../controller/user');
const expenseController = require('../controller/expense');
const userAuth= require('../middleware/auth');

const router = express.Router();

router.post('/signup', userController.signup);

router.post('/signin', userController.signin);

router.post('/addexpenses', userAuth.userAuthenticate, expenseController.addUserExpenses);

router.get('/download', userAuth.userAuthenticate, expenseController.downloadExpenses);

router.get('/getexpenses', userAuth.userAuthenticate, expenseController.getUserExpenses);

router.delete('/deleteexpense/:expenseid', userAuth.userAuthenticate, expenseController.deleteExpenses);


module.exports = router;
