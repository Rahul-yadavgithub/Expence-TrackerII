import React from 'react';

// A legend in charts is that little box showing labels + colors for each data series.
// So payload tells your legend what text to show (value) and what color to display (color).

const CustomLegend = ({payload})=>{
    return(
        <div className="flex flex-wrap justify-center gap-2 mt-4 space-x-6">

         { payload.map((entry, index) =>(
            <div className = "flex items-center space-x-2">
                <div 
                className="w-2.5 h-2.5 rounded-full" 
                style = {{backgroundColor : entry.color}}>
                </div>
                
                <span className="text-xs text-gray-700 font-medium capitalize">
                    {entry.value}
                </span>
            </div>
         ))}


        </div>
    );
};


export default CustomLegend;
