const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = (req,res,next)=>{
    const { name, email, phone , password } = req.body;
    console.log(req.body);
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            // Store hash in your password DB.
            if(err){
                console.log('Unable to create new user')
                res.json({message: 'Unable to create new user'})
            }
            User.create({ name, email, phone ,password:hash}).then(() => {
                res.status(201).json({message: 'User Created Successfully!! Please Sign In'})
            }).catch(err => {
                res.status(403).json(err);
                console.log(err);
            })

        });
    });
}

exports.signin= (req,res,next)=>{
    const { email, password} = req.body;
    console.log(req.body);
    User.findAll({where:{email}})
    .then(user=>{
        if(user.length > 0){
            bcrypt.compare(password, user[0].password, function(err, response) {
                if (err){
                console.log(err)
                return res.json({message:"somthing went wrong with password", success:false})
                }
                if(response){
                    console.log(response, 'is true')
                    const jwtToken = generateToken(user[0].id)
                    console.log(jwtToken)
                    return res.json({token:jwtToken,message:"Signed-In Successfully", success:true})
                }else{
                    return res.status(401).json({message:"something went wrong", success:false})
                }
            })
        }
        else {
            return res.status(404).json({success: false, message: 'passwords do not match'})
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(404).json({success: false, message: 'passwords do not match please enter write password'})
    })
}

function generateToken(id){
    return jwt.sign(id, process.env.TOKEN_SECRET)
}