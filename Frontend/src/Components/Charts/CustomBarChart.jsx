import React from 'react';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell,Tooltip, ResponsiveContainer,Legend,} from "recharts";

import CustomBarChartTooltip from "./CustomBarChartTooltip.jsx";


const CustomBarChart = ({data})=>{
    const getBarColor = (index)=>{
        return index %2 === 0 ? "#875cf5" : "#cfbefb";
    };

    return(
        <div className="bg-white mt-6">
            <ResponsiveContainer width={"100%"} height={300}>
                <BarChart data = {data}>
                    <CartesianGrid stroke = "none"/>
                    <XAxis 
                    datakey = "month"
                    tick = {{fontSize : 12, fill : "#555"}}
                    stroke = "none"
                    />

                    <YAxis
                    tick = {{fontSize : 12, fill : "#555"}}
                    stroke = "none"
                    />

                    <Tooltip content = {CustomBarChartTooltip}/>

                    <Bar
                    datakey = {"amount"}
                    fill="#FF8042"
                    radius={[10, 10, 0, 0]}
                    // activeDots = {{r : 8, fill : "yellow"}}
                    activeStyle = {{fill : "green"}}
                    >
                        {data.map((entry, index) =>(
                            <Cell key = {index} fill = {getBarColor(index)}/>
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomBarChart;