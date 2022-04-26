const Expense = require('../models/expense');

exports.addUserExpenses = (req,res,next) =>{
    const {amount, description, category} = req.body;
    Expense.createExpense({amount,description,category})
    .then(expense=>{
        res.status(201).json({expense, success:true})
    })
    .catch(err=>{
        res.status(403).json({success:false})
    })
}

exports.getUserExpenses = (req,res,next)=>{
    req.user.getExpenses()
    .then(expenses=>{
        res.status(200).json({expenses,success:true})
    })
    .catch(err=>{
        res.status(402).json({error:err, success:false})
    })
}
