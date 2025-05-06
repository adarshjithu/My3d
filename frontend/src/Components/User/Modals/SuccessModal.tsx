import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SuccessModal = ({isOpen,setIsOpen,message,path}:any) => {
  
const router =  useRouter()
  const handleClose = () => {
    setIsOpen(false);
    if(path){
      router.push(path)
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-[35%] text-center">
            <div className="text-green-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Success!
            </h2>
            <p className="text-gray-600 mb-4">
             {message?message:' Your action was completed successfully.'}
            </p>
            <button
              className="bg-green-500 text-white px-8 py-2 rounded-lg hover:bg-green-600 transition"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessModal;
