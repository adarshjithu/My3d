import React from 'react';

function SelectionBar({ activeTab, setActiveTab }: any) {
  return (
    <div className="w-full mt-4 mb-4">
      <div className="flex items-center">
        <span
          className={`cursor-pointer text-sm font-medium ${
            activeTab === 'profile' ? 'text-blue-500' : 'text-gray-700'
          }`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </span>
        <span
          className={`ml-4 cursor-pointer text-sm font-medium ${
            activeTab === 'orders' ? 'text-blue-500' : 'text-gray-700'
          }`}
          onClick={() => setActiveTab('orders')}
        >
          My Orders
        </span>
        <span
          className={`ml-4 cursor-pointer text-sm font-medium ${
            activeTab === 'resetPassword' ? 'text-blue-500' : 'text-gray-700'
          }`}
          onClick={() => setActiveTab('resetPassword')}
        >
          Reset Password
        </span>
      </div>
      <hr
        className={`mt-2 border-1 ${
          activeTab === 'profile'
            ? 'border-blue-500'
            : activeTab === 'orders'
            ? 'border-blue-500 ml-[calc(50%-60px)] w-[calc(33.3%-20px)]'
            : activeTab === 'resetPassword'
            ? 'border-blue-500 ml-[calc(100%-160px)] w-[calc(33.3%-20px)]'
            : 'border-gray-300'
        } transition-all duration-300 ease-in-out`}
      />
    </div>
  );
}

export default SelectionBar;
