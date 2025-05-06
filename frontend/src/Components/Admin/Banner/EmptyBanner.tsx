import React from "react";

const EmptyDataComponent: React.FC = () => {
    return (
        <div  className="w-full flex justify-center items-center h-[60vh] bg-gray-50 rounded-lg shadow-md">
            <div className="text-center">
             
                
                {/* Main Message */}
                <p className="text-xl font-semibold text-gray-600">
                    No Data Available
                </p>
                
              
            </div>
        </div>
    );
};

export default EmptyDataComponent;
