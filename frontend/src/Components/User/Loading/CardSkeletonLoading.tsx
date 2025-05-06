// CardSkeletonLoading.tsx
import React from 'react';

const CardSkeletonLoading = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="w-full h-[300px] bg-gray-200 animate-pulse rounded-lg shadow-lg"
        >
          <div className="h-2 bg-gray-300 rounded-t-md w-3/4 mx-auto mt-4"></div>
          <div className="h-3 bg-gray-300 rounded-md mt-4 mx-4"></div>
          <div className="h-3 bg-gray-300 rounded-md mt-2 mx-4 w-2/3"></div>
          <div className="h-3 bg-gray-300 rounded-md mt-2 mx-4 w-1/2"></div>
        </div>
      ))}
    </div>
  );
};

export default CardSkeletonLoading;
