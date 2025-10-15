const Income = require("../model/Income.js");

const Expense = require("../model/Expense.js");

const mongoose = require("mongoose");

const isValidObjectId = mongoose.isValidObjectId;
const Types = mongoose.Types;

const getDashboardData = async(req, res) =>{

    try{
        const userId = req.user.userId; 
        const userObjectId = new Types.ObjectId(String(userId));  // hear we fetch the userObjectId from the database userId we take from the token 

        const totalIncome = await Income.aggregate([
            {$match : {userId : userObjectId}},  // match the userId with the userObjectId
            {$group : {_id : null , total : { $sum : "$amount"}}} // _id : null ---> Don’t group by any field. Put all matching documents into one single group.
        ]);

        const totalExpense = await Expense.aggregate([
            {$match : {userId : userObjectId}},
            {$group : {_id : null , total : {$sum : "$amount"}}}
        ]);

        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date : {$gte : new Date(Date.now() - 60*24*60*60*1000)} // this is the past 60 days income 
        }).sort({date : -1});  // Now sort the income in the decending order means todays income first then the 60 days income come at last 


        const incomesLast60Days = last60DaysIncomeTransactions.reduce(
            (sum , transaction) => sum + transaction.amount,
            0 
        );  // measn start with the sum = 0 and add into the sum for all the tarnsaction which is last 60 days happens

        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date : {$gte : new Date(Date.now() - 30*24*60*60*1000) },
        }) .sort({date : -1});

        const expensesLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        const lastTransactions = [
            ...(await Income.find({userId}).sort({date : -1}).limit(5)).map(
                (txn) =>({
                    ...txn.toObject(),
                    type : "income"
                })
            ),
            ...( await Expense.find({userId}).sort({date : -1}).limit(5)).map(
                (txn) =>({
                    ...txn.toObject(),
                    type : "expense"

                })
            ),
        ].sort((a, b) => b.date - a.date);

        res.json({
            totalBalance: 
            (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome : totalIncome[0]?.total || 0,
            totalExpense : totalExpense[0]?.total || 0,

            last30DaysExpenses : {
                total : expensesLast30Days,
                transaction : last30DaysExpenseTransactions
            },

            last60DaysIncome : {
                total : incomesLast60Days,
                transaction : last60DaysIncomeTransactions
            },
            recentTransactions : lastTransactions,
        });
    }
    catch(error){
        return res.status(500).json({message : `Server Error ${error}`});
    }
};

module.exports = getDashboardData;