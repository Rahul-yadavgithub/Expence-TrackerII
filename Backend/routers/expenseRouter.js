const express = require("express");

const {addExpense , getAllExpenses , deleteExpense , downloadExpenseExcel} = require("../controllers/expenseController.js");

const isAuth = require("../middleware/isAuth.js");

const expenseRouter = express.Router();


expenseRouter.post('/add', isAuth, addExpense);

expenseRouter.get('/get', isAuth, getAllExpenses);

expenseRouter.get('/download', isAuth, downloadExpenseExcel);

expenseRouter.delete('/:id', isAuth, deleteExpense);

module.exports = expenseRouter;