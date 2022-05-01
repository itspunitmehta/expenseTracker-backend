const userExpenses = (req,res,next)=>{
    return req.user.getExpenses();
}

module.exports ={
    userExpenses
}