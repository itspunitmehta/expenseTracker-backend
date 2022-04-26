const User = require('../models/user');
const jwt = require('jsonwebtoken');


exports.userAuthenticate = (req,res,next)=>{
    const token = req.header('authorization');
    try{
        console.log(token, "is user token");
        const userId = Number(jwt.verify(token, process.env.TOKEN_SECRET));
        User.findByPk(userId)
        .then(user=>{
            req.user = user;
            next();
        })
        .catch(err=>{
            res.status(401).json({success:false});
        })
    }
    catch(err){
        return res.status(401).json({success:false})
    }
}