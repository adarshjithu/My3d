import React from "react";

const DeleteImageModal = ({handleSuccess}:any) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-20">
      <div className="bg-white w-full max-w-sm rounded-lg shadow-lg p-6 space-y-4">
        <h3 className="text-xl font-semibold text-gray-800 text-center">Delete Image</h3>
        <p className="text-center text-gray-600">Are you sure you want to delete this image? This action cannot be undone.</p>
        <div className="flex justify-between space-x-4">
          <button
           onClick={()=>handleSuccess(false)}
            className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
          >
            Cancel
          </button>
          <button
           onClick={()=>handleSuccess(true)}
            className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteImageModal;
