import React from 'react';

import {useState, useEffect} from 'react';

import toast from 'react-hot-toast';

import {useUserAuth} from '../../Hooks/useUserAuth.jsx';

import AddExpenseForm from '../../Components/Expense/AddExpenseForm.jsx';

import {API_PATHS} from '../../Utils/apiPaths.js';
import axiosInstance from "../../Utils/axiosInstance.js";

import DashboardLayout from "../../Components/LayOuts/DashboardLayout.jsx";

import ExpenseOverview from "../../Components/Expense/ExpenseOverview.jsx";

import ExpenseList from "../../Components/Expense/ExpenseList.jsx";

import Modal from "../../Components/Comman/Modal.jsx";

import DeleteAlert from '../../Components/Comman/DeleteAlert.jsx';

const Expense = () =>{

    useUserAuth();

    const [expenseData, setExpenseData] = useState([]);

    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

    const [loading, setLoading] = useState(false);

    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show : false,
        data : null
    });


    const fetchExpenseDetails = async() => {
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
            toast.error("Amount is Required and should be greater than 0.");
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

            fetchExpenseDetails();
        }
        catch(error){

            console.log("Error in Adding Expense",error.message?.data?.message || error.message);
            toast.error("Error Adding The Expense .please try again later");
        }
    };

    const deleteExpense = async(id) =>{
        try{

            await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
            setOpenDeleteAlert({show : false, data : null});
            toast.success("Expense Deleted Successfully");
            fetchExpenseDetails();
        }
        catch(error){

            console.error("Error in Deleting Expense: ",
                error.response?.data?.message || error.message
            );
            toast.error("Error in Deleting Expense. Please Try again Later");
        }
    };

    const handleDownloadExpenseDetails = async()=>{

        try{
            const response = await axiosInstance.get(
            API_PATHS.EXPENSE.DOWNLOAD_EXPENSE , 
            {
                responseType : 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement("a");//  creating anchor tag temporary in the memory for the link so it is basically used for the link

            link.href = url; // means i am assinging the url temporary to the tag <a/><a>

            link.setAttribute("download", "Expense_details.xlsx"); // this is like  --->> element.setAttribute(attributeName, value);

            document.body.appendChild(link);

            link.click();

            link.parentNode.removeChild(link);

            window.URL.revokeObjectURL(url);

            toast.success("Expense Details is Downloaded Successfully");
        }
        catch(error){

            console.error(
                "Error in Downloading the Expense Details",
                error.response?.data?.message || error.message
            );

            toast.error("Failed to Download the Expense. Please try again later");
        }
    };

    useEffect(() =>{
        fetchExpenseDetails();
        return () =>{};
    },[]);


    return(
        <DashboardLayout>
            <div className="my-5 mx-auto" >
                <div className="grid grid-cols-1 gap-6">
                    <div className = "">
                        <ExpenseOverview
                        transactions = {expenseData}
                        onAddExpense = {() => setOpenAddExpenseModal(true)}
                        />  
                    </div>

                    <ExpenseList
                    transactions = {expenseData}
                    onDelete = {(id) =>setOpenDeleteAlert({show : true, data : id})}
                    onDownload = {handleDownloadExpenseDetails}
                    />
                </div>

                <Modal
                isOpen = {openAddExpenseModal}
                onClose = {() => setOpenAddExpenseModal(false)}
                title = "Add Expense" >
                    <AddExpenseForm  onAddExpense = {handleAddExpense}/>
                </Modal>

                <Modal
                isOpen = {openDeleteAlert.show}
                onClose = {() => setOpenDeleteAlert({show : false, data : null})}
                title = "Delete Expense"
                >

                    <DeleteAlert
                    content = "Are You Sure you want to Delete this Expense"
                    onDelete = {() => deleteExpense(openDeleteAlert.data)}
                    />
                </Modal>
            </div>

        </DashboardLayout>
    )
}

export default Expense;