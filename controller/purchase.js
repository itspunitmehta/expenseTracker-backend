const Razorpay = require('razorpay');
const Order = require('../models/order');
const User = require('../models/user');

exports.purchasepremium = (req,res,next)=>{
    try{
        const rzp = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET
        })
        const amount = 2999;
        rzp.orders.create({amount,currency:"INR"},(err,order)=>{
            if(err){
                throw new Error(err);
            }
            req.user.createOrder({orderid: order.id, status:"PENDING"})
            .then(()=>{
                return res.status(201).json({order, key_id: rzp.key_id})
            })
            .catch(err=>{
                throw new Error(err)
            })
        })
    }catch(err){
        console.log(err);
        res.status(403).json({message:'Something went wrong', error:err})

    }
}

exports.updateTransactionStatus = (req,res,next)=>{
    try{
        const { payment_id, order_id} = req.body;
        Order.findOne({where:{orderid:order_id}})
        .then(order=>{
            order.update({paymentid:payment_id,status:"SUCCESSFULL"})
            .then(()=>{
                req.user.update({ispremiumuser:true})
                return res.status(202).json({success:true,message:"transaction successfull"})
            })
            .catch(err=>{
                throw new Error(err)
            })
        })
        .catch(err=>{
            throw new Error(err)
        })
    }
    catch(err){
        console.log(err);
        res.status(403).json({success:false, message:"something went wrong"})
    }
    
}

exports.getAllUSer = (req,res,next)=>{
    User.findAll()
    .then(users=>{
        return res.status(200).json({users,success:true})
    })
    .catch(err=>{
            console.log(err);
    })
}