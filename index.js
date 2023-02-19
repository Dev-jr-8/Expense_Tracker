const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const {getExpenses, getExpensebyID, createExpense, deletebyID,
loggerFunc, checkAdmin}  = require('./controller/expense')

//creating a New instance of Express
const app = express()

//to make post method to work
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//connecting to mongoDB
// mongoose.connect('mongodb://localhost:27017/Expense_Tracker',
// {
//     useNewUrlParser : true
// });

// //checking connection
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error : "));
// db.once("open", function(){
//     console.log("Mongo DB Connected Successfully");
// })
mongoose.set("strictQuery", false);
mongoose.connect('mongodb://127.0.0.1:27017/Expense_Tracker')
.then(() => console.log("Connected to Mongo Compass"))


//root directory of webpage
app.get('/', (req, res) =>{
    res.send("Hello Express")
})

app.get('/api/v1/expenses', loggerFunc, checkAdmin ,getExpenses);
app.get('/api/v1/expense/:id', getExpensebyID);
app.post('/api/v1/expense', createExpense);
app.delete('/api/v1/deleteExpense/:id', deletebyID);


//listening back to the app using listen method
app.listen(4000, () =>{
    console.log("Server is running")
})

//CRUD Operations
/*
C -> Create - post
R -> Read - get
U -> Update - put
D -> Delete - delete
*/