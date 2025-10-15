import React from 'react';

import {XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,Area, AreaChart} from "recharts";

const CustomLineChart = ({data}) =>{
    const CustomToolTip = ({active, payload})=>{
        if(active && payload && payload.length){
            return (
                <div className = "bg-white shadow-md rounded-lg p-2 border border-gray-300">
                    <p className="text-xs font-semibold text-purple-800 mb-1 capitalize">
                        {payload[0].payload.category}
                    </p>
                    <p className="text-sm text-gray-600">
                        Amount : {" "}
                        <span className="text-sm font-medium text-gray-900">
                            USD{payload[0].payload.amount}

                        </span>
                    </p>
                </div>
            );
        };
        return null
    };

    return(
        <div className="bg-white">
            <ResponsiveContainer width={"100%"} height={300}>
                <AreaChart data = {data}>
                  {/* defs
                  You use it when you want to define reusable graphic things (like gradients, patterns, filters, etc.). 
                  Think of <defs> like a "toolbox" where you keep styles/designs ready, and then you apply them wherever needed

                  linearGradient -> It defines a gradient color (a smooth transition between colors).
                  Each <stop> tells the gradient where to start/stop a color

                  At 5% from the top, use the purple color #875cf5 with 40% opacity.
                  At 95% from the top, still use the same purple color, but now with 0 opacity (fully transparent). 
                  means -> At the top → purple, but light (see-through).  && At the bottom → it fades out into full transparency.
                  */}
                   <defs>
                    <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
                    </linearGradient>
                   </defs>

                   <CartesianGrid stroke = "none"/>

                   <XAxis
                   datakey = "month"
                   tick = {{fontSize : 12, fill : "#555"}}
                   stroke = "none"
                   ></XAxis>

                   <YAxis
                   tick = {{fontSize : 12, fill : "#555"}}
                   stroke = "none"
                   >
                   </YAxis>

                   <Tooltip content = {CustomToolTip}/>

                   <Area
                   type = {"monotone"}
                   datakey = {"amount"}
                   stroke = "#875cf5"
                   fill="url(#expenseGradient)"
                   strokeWidth = {3}
                   activeDots = {{r : 8, fill : "#ab8df8" }}
                   />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
};


export default CustomLineChart;

