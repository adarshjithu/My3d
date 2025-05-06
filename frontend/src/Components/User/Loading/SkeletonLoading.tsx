import React from 'react';

const SkeletonLoadingModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        {/* Modal Header Skeleton */}
        <div className="h-6 bg-gray-300 rounded w-1/2 mb-4 animate-pulse"></div>

        {/* Content Skeleton */}
        <div className="space-y-3">
          <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
        </div>

        {/* Button Skeleton */}
        <div className="flex space-x-4 mt-6">
          <div className="h-10 bg-gray-300 rounded w-1/3 animate-pulse"></div>
          <div className="h-10 bg-gray-300 rounded w-1/3 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoadingModal;
