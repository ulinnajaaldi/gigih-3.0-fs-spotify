import React from "react";

const SkeletonPlaylist = () => {
  return (
    <div className="h-screen bg-gradient-to-b from-neutral-800 to-neutral-900 px-6 py-5">
      <div className="animate-pulse">
        <div className="flex  items-end justify-start gap-5 drop-shadow-md">
          <div className="h-56 w-56 bg-neutral-700"></div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-10 bg-neutral-700"></div>
            <div className="h-10 w-60 bg-neutral-700"></div>
            <div className="h-4 w-80 bg-neutral-700"></div>
            <div className="mt-2 flex gap-1">
              <div className="h-4 w-20 bg-neutral-700"></div>
              <div className="h-4 w-10 bg-neutral-700"></div>
              <div className="h-4 w-10 bg-neutral-700"></div>
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <div className="h-10 w-full bg-neutral-700"></div>
          <div className="h-8 w-full bg-neutral-700"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonPlaylist;
