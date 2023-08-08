import React from "react";

const SkeletonHome = () => {
  return (
    <div className="mt-5 animate-pulse">
      <div className="h-10 w-52 bg-neutral-700"></div>
      <div className="mt-5 grid grid-cols-3 gap-4">
        <div className="flex h-20 items-center justify-start gap-5 rounded-[4px] bg-neutral-700">
          <div className="h-full w-20 rounded-bl-[4px] rounded-tl-[4px] bg-neutral-600 object-cover drop-shadow-xl" />
        </div>
        <div className="flex h-20 items-center justify-start gap-5 rounded-[4px] bg-neutral-700">
          <div className="h-full w-20 rounded-bl-[4px] rounded-tl-[4px] bg-neutral-600 object-cover drop-shadow-xl" />
        </div>
        <div className="flex h-20 items-center justify-start gap-5 rounded-[4px] bg-neutral-700">
          <div className="h-full w-20 rounded-bl-[4px] rounded-tl-[4px] bg-neutral-600 object-cover drop-shadow-xl" />
        </div>
        <div className="flex h-20 items-center justify-start gap-5 rounded-[4px] bg-neutral-700">
          <div className="h-full w-20 rounded-bl-[4px] rounded-tl-[4px] bg-neutral-600 object-cover drop-shadow-xl" />
        </div>
        <div className="flex h-20 items-center justify-start gap-5 rounded-[4px] bg-neutral-700">
          <div className="h-full w-20 rounded-bl-[4px] rounded-tl-[4px] bg-neutral-600 object-cover drop-shadow-xl" />
        </div>
        <div className="flex h-20 items-center justify-start gap-5 rounded-[4px] bg-neutral-700">
          <div className="h-full w-20 rounded-bl-[4px] rounded-tl-[4px] bg-neutral-600 object-cover drop-shadow-xl" />
        </div>
      </div>
      <div className="mt-10">
        <div className="h-10 w-52 bg-neutral-700"></div>
        <div className="mt-4 flex flex-wrap gap-5">
          <div className="flex h-56 w-[210px] flex-col gap-2 rounded-[6px] bg-neutral-700"></div>
          <div className="flex h-56 w-[210px] flex-col gap-2 rounded-[6px] bg-neutral-700"></div>
          <div className="flex h-56 w-[210px] flex-col gap-2 rounded-[6px] bg-neutral-700"></div>
          <div className="flex h-56 w-[210px] flex-col gap-2 rounded-[6px] bg-neutral-700"></div>
          <div className="flex h-56 w-[210px] flex-col gap-2 rounded-[6px] bg-neutral-700"></div>
        </div>
      </div>
      <div className="mt-10">
        <div className="h-10 w-52 bg-neutral-700"></div>
        <div className="mt-4 flex flex-wrap gap-5">
          <div className="flex h-56 w-[210px] flex-col gap-2 rounded-[6px] bg-neutral-700"></div>
          <div className="flex h-56 w-[210px] flex-col gap-2 rounded-[6px] bg-neutral-700"></div>
          <div className="flex h-56 w-[210px] flex-col gap-2 rounded-[6px] bg-neutral-700"></div>
          <div className="flex h-56 w-[210px] flex-col gap-2 rounded-[6px] bg-neutral-700"></div>
          <div className="flex h-56 w-[210px] flex-col gap-2 rounded-[6px] bg-neutral-700"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonHome;
