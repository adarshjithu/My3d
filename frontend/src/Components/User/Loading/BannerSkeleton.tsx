// BannerSkeleton.tsx
import React from 'react';

const BannerSkeleton = () => {
  return (
    <div className="w-full h-[300px] bg-gray-200 animate-pulse rounded-lg relative">
      {/* Skeleton for the banner image */}
      <div className="w-full h-full bg-gray-300 rounded-lg"></div>

      {/* Optional text skeleton */}
      <div className="absolute bottom-4 left-4 w-1/2 h-8 bg-gray-300 rounded-lg"></div>
    </div>
  );
};

export default BannerSkeleton;
