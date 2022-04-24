// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = (req,res,next)=>{
    const { name, email, phone , password } = req.body;
    console.log(req.body);
    User.create({ name, email, phone ,password}).then(() => {
        res.status(201).json({message: 'Successfuly create new user'})
    }).catch(err => {
        res.status(403).json(err);
    })
    // const saltRounds = 10;
    // bcrypt.genSalt(saltRounds, function(err, salt) {
    //     bcrypt.hash(password, salt, function(err, hash) {
    //         // Store hash in your password DB.
    //         if(err){
    //             console.log('Unable to create new user')
    //             res.json({message: 'Unable to create new user'})
    //         }
    //         User.create({ name, email, phone ,password}).then(() => {
    //             res.status(201).json({message: 'Successfuly create new user'})
    //         }).catch(err => {
    //             res.status(403).json(err);
    //         })

    //     });
    // });
}

