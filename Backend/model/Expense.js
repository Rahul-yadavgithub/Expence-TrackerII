const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const ExpenseSchema = new Schema({
    userId : {
        type :  Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    icon : {
        type : String
    },
    category : {
        type : String,
        required : true
    },
    amount : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }

}, {timestamps : true});

module.exports = mongoose.model("Expense", ExpenseSchema);