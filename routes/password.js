const express = require('express')

const router = express.Router();

const passwordController = require('../controller/password');

router.get('/updatepassword/:id', passwordController.updatePassword);

router.get('/resetpassword/:id', passwordController.resetPassword);

router.post('/forgotpassword', passwordController.forgotPassword);

module.exports = router;