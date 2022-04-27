const uuid = require('uuid');
const bycrypt = require('bcrypt');
const ForgotPassword = require('../models/password');
const User = require('../models/user');

exports.forgotPassword = (req,res,next) =>{
    const {email} = req.body;
    User.findOne({where:{email}})
    .then(user=>{
        if(user){
            const id = uuid.v4();
            user.createPassword({id,active:true})
            .then(passord=>{
                const msg={
                    email:email,
                    html: `<a href="http://localhost:8000/password/resetpassword/${id}">Reset password</a>`
                }
                return res.json({msg})
            })
            .catch(err=>{
                throw new Error(err)
            })
        }
    })
    .catch(err=>{
        throw new Error(err)
    })
}

exports.resetPassword = (req,res,next) =>{
    const id = req.params.id;
    console.log(id);
    ForgotPassword.findOne({where:{id}})
    .then(passwordrequest=>{
        if(passwordrequest){
            passwordrequest.update({active:false})
            res.status(200).send(`<html>
                <script>
                    function formsubmitted(e){
                        e.preventDefault();
                        console.log('called')
                    }
                </script>
                <form action="/password/updatepassword/${id}" method="GET">
                    <label for="newpassword">Enter New password</label>
                    <input name="newpassword" type="password" required></input>
                    <button>reset password</button>
                </form>
                </html>`)
        res.end()
        }
    })
}

exports.updatePassword = (req,res,next)=>{
    try {
        const { newpassword } = req.query;
        const { id } = req.params;
        ForgotPassword.findOne({ where : { id: id }}).then(resetpasswordrequest => {
            console.log(resetpasswordrequest.userId);
            User.findOne({where: { id : resetpasswordrequest.userId}}).then(user => {
                // console.log('userDetails', user)
                if(user) {
                    //encrypt the password
                    const saltRounds = 10;
                    bycrypt.genSalt(saltRounds, function(err, salt) {
                        if(err){
                            console.log(err);
                            throw new Error(err);
                        }
                        bycrypt.hash(newpassword, salt, function(err, hash) {
                            // Store hash in your password DB.
                            if(err){
                                console.log(err);
                                throw new Error(err);
                            }
                            user.update({ password: hash }).then(() => {
                                res.redirect('http://127.0.0.1:5500/login/login.html')//redirecting to login page
                                // res.status(201).json({message: 'Successfuly update the new password'})
                            })
                        });
                    });
            } else{
                return res.status(404).json({ error: 'No user Exists', success: false})
            }
            })
        })
    } catch(error){
        return res.status(403).json({ error, success: false } )
    }
}