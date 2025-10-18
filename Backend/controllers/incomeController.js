const xlsx = require("xlsx");

const Income = require("../model/Income.js");

const addIncome = async(req, res) =>{

    const userId = req.userId;  // ✅ this is safe and correct

    try{
        const { icon, source, amount, date } = req.body;

        if(!source || !amount || !date) {
            return res.status(400).json({message : "All Feild are req"});
        }

        const newIncome = new Income ({
            userId,
            icon, 
            source,
            amount,
            date : new Date(date)
        });

        await newIncome.save();
        return res.status(200).json(newIncome);
    }
    catch(error){
        return res.status(500).json({message : `Server side error : ${error}`});
    }
};


const getAllIncome = async(req, res) =>{
    const userId = req.userId;  // ✅ this is safe and correct

    try{
        const income = await Income.find({userId}).sort({date : -1});

        return res.status(200).json(income);
    }
    catch(error){
        return res.status(500).json({message : `Server Side Error : ${error}`});
    }
};



const deleteIncome = async(req, res) =>{
    try{
        const income = await Income.findByIdAndDelete(req.params.id);
        return res.status(200).json({message : "Income is Deleted"});
    }
    catch(error){
        return res.status(500).json({message : `Server side Error : ${error}`});
    }
};


const downloadIncomeExcel = async(req, res) =>{
    const userId = req.userId;  // ✅ this is safe and correct

    try{
        const income = await Income.find({userId}).sort({date : -1});
        
        const data = income.map((item) =>({
            Sourse : item.source,
            Amount : item.amount,
            Date : item.date
        }));


        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, "income_details.xlsx");
        return res.download("income_details.xlsx");
    }
    catch(error){
        return res.status(500).json({message : `This is Server side error ${error}`});
    }
}

module.exports = {addIncome, getAllIncome, deleteIncome, downloadIncomeExcel};