import React from 'react';

import {useState, useEffect} from 'react';

import {useNavigate} from 'react-router-dom';

import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";

import { useUserAuth } from '../../Hooks/useUserAuth.jsx';

import axiosInstance from  '../../Utils/axiosInstance.js';
import { API_PATHS } from '../../Utils/apiPaths.js';

import {addThousandSeparator} from '../../Utils/helper.js';

import DashboardLayout from '../../Components/LayOuts/DashboardLayout.jsx';
import InfoCard from '../../Components/Cards/InfoCard.jsx';
import RecentTransactions from '../../Components/Dashboard/RecentTransactions.jsx';
import FinanceOverview from '../../Components/Dashboard/FinanceOverview.jsx';
import ExpenseTransactions from '../../Components/Dashboard/ExpenseTransaction.jsx';
import Last30DaysExpenses from '../../Components/Dashboard/Last30DaysExpenses.jsx';
import RecentIncome from '../../Components/Dashboard/RecentIncome.jsx';
import RecentIncomeWithChart from '../../Components/Dashboard/RecentIncomeWithChart.jsx';




const Home = ()=>{

    useUserAuth(); // this line verify first of all that user is correct or not 

    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState(null);
    
    const [loading, setLoading] = useState(false);

    const fetchDashboardData = async() =>{

        if(loading) return; // means if the loading is already set to some value then do not need to load again

        setLoading(true); // If not loaded so load them and then proceed 

        try{

            const result = await axiosInstance.get(`${API_PATHS.DASHBOARD.GET_DATA}`);

            if(result.data){
                setDashboardData(result.data);
            }
        }
        catch(error){
            console.log("Something Went Wrong please Try again later", error);
        }
        finally{
            setLoading(false);   // This tells React "loading is done" It doesn’t matter if the request succeeded or failed — either way, you’re no longer waiting for data.
        }
    };

    useEffect(()=>{
        fetchDashboardData();
        return ()=>{};  // You start a timer inside your component → When the component disappears, you should stop that timer
    }, []);


    return (
        <DashboardLayout activeMenu = "Dashboard">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InfoCard
                    icon = {<IoMdCard/>}
                    label = "Total Balance"
                    value = {addThousandSeparator(dashboardData?.totalBalance || 0)}
                    color="bg-primary"
                    />

                    <InfoCard
                    icon = {<LuWalletMinimal/>}
                    label = "Total Income"
                    value = {addThousandSeparator(dashboardData ?.totalIncome || 0)}
                    color="bg-orange-500"
                    />

                    <InfoCard
                    icon = {<LuHandCoins/>}
                    label = "Total Expense"
                    value = {addThousandSeparator(dashboardData ?.totalExpense || 0)}
                    color = "bg-red-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <RecentTransactions
                    transactions = {dashboardData ?.recentTransactions}
                    onSeeIncome = {() => navigate("/income")}
                    onSeeExpense = {() => navigate("/expense")}
                    />

                    <FinanceOverview
                    totalBalance = {dashboardData ?.totalBalance || 0}
                    totalIncome = {dashboardData ?.totalIncome || 0}
                    totalExpense = {dashboardData ?.totalExpense || 0}
                    />

                    <ExpenseTransactions
                    transactions = {dashboardData ?.last30DaysExpenses ?.transactions || []}
                    onSeeMore = {() =>navigate("/expense")}
                    />

                    <Last30DaysExpenses
                    data = {dashboardData ?.last30DaysExpenses ?.transactions || []}
                    />

                    <RecentIncome
                    transactions = {dashboardData ?.last60DaysIncome ?.transactions || []}
                    onSeeMore = {() => navigate("/income")}
                    />

                    <RecentIncomeWithChart
                    data = {dashboardData ?.last60DaysIncome ?.transactions ?.slice(0,4) || []}
                    totalIncome = {dashboardData ?.totalIncome || 0}
                    />
                </div>

            </div>

        </DashboardLayout>

    );
};

export default Home;

