const Expense = require('../models/expense');
const UserServices = require('../services/userservices');
const S3Services  = require('../services/s3services');

exports.addUserExpenses = (req,response,next) =>{
    const {amount, description, category} = req.body;
    req.user.createExpense({amount,description,category})
    .then(expense=>{
        return response.status(201).json({expense, success:true})
    })
    .catch(err=>{
        return response.status(403).json({success:false, error:err})
    })
}

exports.getUserExpenses = (req,res,next)=>{
    const premium = (req.user.ispremiumuser)
    req.user.getExpenses()
    .then(expenses=>{
        return res.status(200).json({expenses,success:true,premium})
    })
    .catch(err=>{
        return res.status(402).json({error:err, success:false})
    })
}

exports.deleteExpenses = (req, res, next) => {
    const expenseid = req.params.expenseid;
    Expense.destroy({where: { id: expenseid }}).then(() => {
        return res.status(204).json({ success: true, message: "Deleted Successfuly"})
    }).catch(err => {
        console.log(err);
        return res.status(403).json({ success: true, message: "Failed"})
    })
}

exports.downloadExpenses = async (req,res,next)=>{
    try {
        const expenses = await UserServices.userExpenses(req);
        // console.log(expenses);
        const stringExpenses = JSON.stringify(expenses);
        const userId = req.user.id;
        const filename = `expense${userId}/${new Date}.txt`;//filename should be unique evry time we upload file
        const fileUrl  = await S3Services.uploadFiletoS3(stringExpenses, filename);
        console.log(fileUrl)
        res.status(200).json({fileUrl, success:true})
    } catch (error) {
        res.status(500).json({fileUrl:'', success:false, error:error})
        
    }
}

