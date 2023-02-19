const Expenses = require('../models/expenses')

exports.getExpenses = async(req, res, next) => {
    try{
        //find method prints all entries in Schema
        const expenses = await Expenses.find();
        //console.log(expenses)
        return res.status(200).json({
            status: true,
            count :  expenses.length,
            data :  expenses
        });
    }catch(err){
        return res.status(500).json({
            status: false,
            error: 'Server Error'
        });
    }
}

exports.getExpensebyID = async(req, res, next) => {
    try{
        //find method prints all entries in Schema
        const expenses = await Expenses.findById(req.params.id);
        //console.log(expenses)
        if(!expenses)
        {
            return res.status(404).json({
                status : false,
                error : 'no expense Found'
            });
        }
        return res.status(200).json(expenses);
    }catch(err){
        return res.status(500).json({
            status: false,
            error: 'Server Error'
        });
    }
}

exports.createExpense = async(req, res, next) => {
    try{
        const new_entry = await Expenses.create(req.body);
        return res.status(201).json({
            status:"success",
            messgase :"New expense created successfully"
        })

    }catch(err)
    {
        if(err.name === 'ValidationError'){
            const messages = Object.values(err.erros).map(val => val.message);
            return res.status(400).json({
                status: false,
                error: messages
            });
        }
        return res.status(500).json({
            status:"failed",
            error:"Internal Server Error"
        });
    }
}

exports.deletebyID = async(req, res, next) => {
    try{
        const expense = await Expenses.findById(req.params.id);
        if(!expense)
        {
            res.send(404).json({
                status:"failed",
                message:"id not found"
            })
        }
        await expense.remove();

        return res.send(200).json({
            status:true,
            message: "Deleted Successfully"
        })
    }catch(err)
    {
        return res.status(500).json({
            status: false,
            message: "Internal Server Error"
        })
    }
}

// exports.expenseUpdate = async(req, res, next) => {
//     try{
//         const expense = await Expenses.findByIdAndUpdate(req.params.id,)
//     }
// }

//loggerFunc
exports.loggerFunc = (req, res, next) =>{
    console.log("Logging In")
    console.log(req.url);
    next();
}

//Checking isAdmin through Middlware
exports.checkAdmin = (req, res, next) => {
    const isAdmin = true;
    if(!isAdmin)
    {
        res.status(401).json({
            status: false,
            message : "Unauthorized Access"
        })
    }
    next();
}