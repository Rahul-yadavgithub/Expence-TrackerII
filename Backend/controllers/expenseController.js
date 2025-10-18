const xlsx = require("xlsx");

const Expense = require("../model/Expense.js");

const addExpense = async(req, res) =>{

    const userId = req.userId;  // ✅ this is safe and correct

    try{
        const {icon , category, amount, date} = req.body;

        if(!category || !amount || !date){
            return res.status(400).json({message : "All Feild are required"});
        }

        const newExpens = new Expense({
            userId,
            icon,
            category,
            amount,
            date : new Date(date)
        });

        await newExpens.save();

        return res.status(200).json({message : "New Expense is successfully Added"});
    }
    catch(error){

        return res.status(500).json({message : `Server side Error : ${error}`});
    }
};

const getAllExpenses = async(req, res) =>{

   const userId = req.userId;  // ✅ this is safe and correct
    try{
        const expense = await Expense.find({userId}).sort({date : -1});
        return res.json(expense);
    }
    catch(error){
        return res.status(500).json({message : `Server side Error: ${error}`});
    }
};

const deleteExpense = async(req, res) =>{
    try{
        await Expense.findByIdAndDelete(req.params.id);
        return res.status(200).json({message : "Expense is Succefully Deleted"});
    }
    catch(error){
        return res.status(500).json({message : `Server side Error ${error}`});
    }
};

const downloadExpenseExcel = async(req, res) =>{

    const userId = req.userId;  // ✅ this is safe and correct

    try{
        const expense = await Expense.find({userId}).sort({date : -1});

        const data  = expense.map((item) =>({
            Category : item.category,
            Amount : item.amount,
            Date : item.date
        }));

        const wb = xlsx.utils.book_new();   // Creates a new workbook. Think of it as a new Excel file.
        const ws = xlsx.utils.json_to_sheet(data); // Converts your data array into a worksheet (a single sheet inside the Excel workbook).
        xlsx.utils.book_append_sheet(wb, ws, "Expense"); // Adds the worksheet ws to your workbook wb. and The sheet is named "Expense" in Excel.
         xlsx.writeFile(wb, "expense_details.xlsx");  // Writes the workbook to a file named expense_details.xlsx on your server.

         return res.download("expense_details.xlsx"); // download 
    }
    catch(error){

        return res.status(500).json({message : `Server Side Error ${error}`});
    }
};


module.exports = {addExpense , getAllExpenses , deleteExpense , downloadExpenseExcel}