import React from 'react';
import coins from "../img/coins.svg";

interface IWinnerRowSkeletonProps {
  width : number
}

function WinnerRowSkeleton({width} : IWinnerRowSkeletonProps) {
  return (
    <div
      className={`font-text-gotham animate-pulse grid winner-row mb-3 px-2 md:px-4 xl:px-6 py-2 items-center grid-cols-[1fr_2fr_1.5fr_2.5fr] gap-x-1`}>
      <div className={`w-8 md:w-12 2xl:w-14 h-8 md:h-12 2xl:h-14 rounded-full bg-blue-300`}/>
      <div className={`font-text-gotham h-6  w-24 bg-blue-300 rounded-full`}></div>
      <div className={`flex items-center`}>
        <div className={`font-text-gotham h-6 w-16 bg-blue-300 rounded-full`}></div>
        <img src={coins}
             alt={`404`}
             className={`w-8 h-8 ml-1 md:ml-2`}/>
      </div>
      {width >= 768 ? null : (
        <div className={`flex justify-end`}>
          <div className={`font-text-gotham h-4 w-24 bg-blue-300 rounded-full`}></div>
        </div>
      )}
    </div>
  );
}

export default WinnerRowSkeleton;