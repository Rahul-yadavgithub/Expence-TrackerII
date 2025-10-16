import React from 'react';

import {useState, useEffect} from 'react';

import toast from 'react-router-dom';

import {useUserAuth} from '../../Hooks/useUserAuth.jsx';

import AddExpenseForm from '../../Components/Expense/AddExpenseForm.jsx';

import {API_PATHS} from '../../Utils/apiPaths.js';
import axiosInstance from "../../Utils/axiosInstance.js";



const Expense = () =>{

    useUserAuth();

    const [expenseData, setExpenseData] = useState([]);

    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

    const [loading, setLoading] = useState(false);


    const fetchExpenseDetailes = async() => {
        if(loading){
            return;
        }

        setLoading(true);

        try{
            const response = await axiosInstance.get(
                `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
            );

            if(response.data){
                setExpenseData(response.data);
            }
        }
        catch(error){
            console.log("Error fetching expense Details ", error);
        }
        finally{
            setLoading(false);
        }
    };


    const handleAddExpense = async(expense)=>{

        const {category, amount, date, icon} = expense;

        if(!category.trim()){
            toast.error("Category is Required");
            return;
        }

        if(!amount || isNaN(amount) || Number(amount) <= 0){
            toast.error("Amount is Required and Should be greater than 0.");
            return;
        }

        if(!date){
            toast.error("Date is required");
            return;
        }

        try{

            await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
                category,
                amount, 
                date,
                icon
            });

            setOpenAddExpenseModal(false);

            toast.success("Expense Added Successfully. ");

            fetchExpenseDetailes();
        }
        catch(error){

            console.log("Error in Adding Expense",error.message?.data?.message || error.message);
            toast.error("Error Adding The Expense .please try again later");
        }
    };


    return(
        <div>

        </div>
    )
}

export default Expense;