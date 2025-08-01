import React from "react";

const CardSkeleton = () => {
  return (
    <div className="p-4  w-full mx-auto">
      <div className="animate-pulse flex flex-col space-y-4">
        {/* Image Skeleton */}
        <div className="bg-gray-300 h-40 w-full rounded-lg"></div>

        {/* Title Skeleton */}
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>

        {/* Text Skeleton */}
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>

        {/* Button Skeleton */}
        <div className="h-8 bg-gray-300 rounded w-1/2 mt-2"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
