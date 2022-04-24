const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();
console.log('hello');
const User = require('../models/user');


router.post('/signup', (req,res,next)=>{
    const { name, email, phone , password } = req.body;
    console.log(req.body);
    User.create({ name, email, phone ,password}).then(() => {
        res.status(201).json({message: 'Successfuly create new user'})
    }).catch(err => {
        res.status(403).json(err);
    })
});


module.exports = router;