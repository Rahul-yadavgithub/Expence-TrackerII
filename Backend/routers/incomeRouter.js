const express = require("express");


const isAuth = require("../middleware/isAuth.js");

const {addIncome, getAllIncome, deleteIncome, downloadIncomeExcel} = require("../controllers/incomeController.js");


const incomeRouter = express.Router();

incomeRouter.post("/add", isAuth, addIncome);

incomeRouter.get("/get", isAuth, getAllIncome);

incomeRouter.get("/downlaod", isAuth, downloadIncomeExcel);

incomeRouter.delete("/:id", isAuth, deleteIncome);

module.exports = incomeRouter;

