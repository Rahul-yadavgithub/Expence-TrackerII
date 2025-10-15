import React from 'react';

import {useState, useContext, useEffect} from 'react';

import CustomBarChart from "../Charts/CustomBarChart.jsx";

import {prepareExpenseBarChartData} from "../../Utils/helper.js";

const Last30DaysExpenses = ({data})=>{
    const [chartData, setChartData] = useState([]);

    useEffect(()=>{
        const result = prepareExpenseBarChartData(data);
        setChartData(result);

        return () =>{};
    },[data]);   // React checks if data is different from the previous render:  If yes → runs the function inside useEffect.  If no → skips running it

    return (
        <div className="card col-span-1">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 30 Days Expenses</h5>
            </div>

            <CustomBarChart data={chartData}/>
        </div>
    );
};

export default Last30DaysExpenses;
