import React, {useEffect} from 'react';
import {IWinner} from "../models";
// @ts-ignore
import coins from "../img/coins.svg"
import formatDistance from "date-fns/formatDistance"

interface IWinnerRowProps {
  winnersData : IWinner

}
function WinnerRow({winnersData} : IWinnerRowProps) {

  const date = formatDistance(new Date(winnersData.time), new Date(), {
    includeSeconds : true,
    addSuffix : true
  })
  useEffect(() => {

  }, [date]);
  return (
    <div className={`font-text-gotham grid winner-row mb-3 px-2 md:px-4 xl:px-6 py-2 items-center grid-cols-[1fr_2fr_1.5fr_2.5fr] gap-x-1`}>
      <img className={`w-8 md:w-12 2xl:w-14 rounded-full`} src={winnersData.photo_200} alt=""/>
      <p className={`font-text-gotham text-[14px] md:text-[18px] xl:text-[24px]`}>{winnersData.first_name}</p>
      <div className={`flex items-center`}>
        <p className={`font-text-gotham text-[14px] md:text-[18px] xl:text-[24px]`}>
          {winnersData.amount}
        </p>
        <img src={coins}
             alt={`404`}
             className={`w-8 h-8 md:h-12 md:w-12 xl:h-16 xl:w-16 ml-1 md:ml-2`}/>
      </div>
      <p className={`font-text-gotham text-right text-[10px] md:text-[14px] xl:text-[20px] font-light text-gray-200`}>{date}</p>
    </div>
  );
}

export default WinnerRow;