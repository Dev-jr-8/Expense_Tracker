const mongoose = require('mongoose')

const ExpensesSchema = new mongoose.Schema({
    name : {
        type: String,
        trim: true,
        required: [true, 'please add some text']
    },
    amount:{
        type: Number,
        required: [true, 'Please add a postive number']
    },
    desc:{
        type: String
    }
});

module.exports = mongoose.model('expenses', ExpensesSchema)