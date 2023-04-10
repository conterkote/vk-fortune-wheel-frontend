import React, {useEffect} from 'react';
import UIHeading from "../ui/UIHeading";
import {isWinnerMessage, useFetchWinnersQuery} from "../store/apis/fortuneApi";
import {addWinner, selectLatestWinners} from "../store/slices/winnersSlice";
import {useAppDispatch, useAppSelector} from "../store/store";
import WinnerRow from "./WinnerRow";

interface IWinnersListProps {
  className ?: string
}

function WinnersList({className} : IWinnersListProps) {
  const {data} = useFetchWinnersQuery()
  const dispatch = useAppDispatch()
  const winners = useAppSelector(selectLatestWinners)
  const winnersRendered = winners.map((winner, index) => <WinnerRow key={index} winnersData={winner} />)

  useEffect(() => {
    if (data) {
      if (isWinnerMessage(data)) {
        console.log(new Date(data.time))
      }
      dispatch(addWinner(data))
    }

  }, [data]);

  return (
    <div className={`${className} flex flex-col inner-shadow overflow-y-hidden rounded-2xl bg-linear-blue`}>
      <UIHeading className={`text-[30px] py-4`}>Winners</UIHeading>
      <div className={`px-4 flex-grow`}>
        {winnersRendered}
      </div>
    </div>
  );
}

export default WinnersList;