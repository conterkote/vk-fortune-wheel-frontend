import React, {useEffect} from 'react';
import UIHeading from "../ui/UIHeading";
import {useFetchWinnersQuery} from "../store/apis/fortuneApi";
import {addWinner, selectLatestWinners} from "../store/slices/winnersSlice";
import {useAppDispatch, useAppSelector} from "../store/store";
import WinnerRow from "./WinnerRow";
import WinnerRowSkeleton from "./WinnerRowSkeleton";
import {selectCurrentUser} from "../store/slices/userSlice";
import {IUserData} from "../models";

interface IWinnersListProps {
  className?: string
  width: number
}

function WinnersList({className, width}: IWinnersListProps) {
  const {data} = useFetchWinnersQuery()
  const dispatch = useAppDispatch()
  const winners = useAppSelector(selectLatestWinners)
  const userData = useAppSelector(selectCurrentUser)
  const winnersRendered = winners.map((winner, index) => <WinnerRow key={index} winnersData={winner} width={width}/>)
  const winnersSkeletons = new Array(5).fill(0).map((slot, index) => <WinnerRowSkeleton key={index} width={width}/>)

  useEffect(() => {
    if (data) {
      if (!(data instanceof Array)) {
        if (data.first_name === (userData as IUserData).first_name) {
          setTimeout(() => {
            dispatch(addWinner(data))
          }, 3000)
        } else {
          dispatch(addWinner(data))
        }
      } else {
        dispatch(addWinner(data))
      }
    }

  }, [data]);

  return (
    <div className={`flex flex-col h-fit inner-shadow overflow-hidden rounded-2xl bg-linear-blue`}>
      <UIHeading className={`text-[30px] py-4`}>Winners</UIHeading>
      <div className={`px-4 grid grow-0`}>
        {winners.length > 0 ? winnersRendered : winnersSkeletons}
      </div>
    </div>
  );
}

export default WinnersList;