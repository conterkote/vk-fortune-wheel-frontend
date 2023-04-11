import React, {useEffect} from 'react';
import {IWinner} from "../models";
// @ts-ignore
import coins from "../img/coins.svg"
import formatDistance from "date-fns/formatDistance"

interface IWinnerRowProps {
  winnersData : IWinner
  width : number

}
function WinnerRow({winnersData, width} : IWinnerRowProps) {

  const date = formatDistance(new Date(winnersData.time), new Date(), {
    includeSeconds : true,
    addSuffix : true
  })
  useEffect(() => {

  }, [date]);
  return (
    <div className={`font-text-gotham grid winner-row mb-3 px-2 md:px-4 xl:px-6 py-2 items-center grid-cols-[1fr_2fr_1.5fr_2.5fr] md:grid-cols-[0.75fr_2fr_2fr] gap-x-1 md:gap-x-2`}>
      <img className={`w-8 md:w-10 rounded-full`} src={winnersData.photo_200} alt=""/>
      <p className={`font-text-gotham text-[14px] md:text-[18px] xl:text-[24px]`}>{winnersData.first_name}</p>
      <div className={`flex items-center`}>
        <p className={`font-text-gotham text-[14px] md:text-[18px] xl:text-[24px]`}>
          {winnersData.amount}
        </p>
        <img src={coins}
             alt={`404`}
             className={`w-6 h-6 md:h-10 md:w-10 xl:h-16 xl:w-16 ml-1 md:ml-2`}/>
      </div>

      {width >= 768 ? null : (
        <p className={`font-text-gotham text-right text-[10px] md:text-[14px] xl:text-[20px] font-light text-gray-200`}>{date}</p>
      )}
    </div>
  );
}

export default WinnerRow;