const Expense = require('../models/expense');

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