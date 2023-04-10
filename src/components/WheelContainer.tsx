import React from 'react';
import Wheel from "./Wheel";
import UICard from "../ui/UICard";
import UIButton from "../ui/UIButton";
import {decreaseBalance, selectCurrentBalance, selectCurrentUser} from "../store/slices/userSlice";
import {useAppDispatch, useAppSelector} from "../store/store";
import {IUserData} from "../models";
import {changeState, selectCurrentJackpot, selectIsWheelSpinning} from "../store/slices/wheelSlice";

function WheelContainer() {
  const balance = useAppSelector(selectCurrentBalance);
  const jackpot = useAppSelector(selectCurrentJackpot);
  const currentUser = useAppSelector(selectCurrentUser)
  const dispatch = useAppDispatch()
  const currentWheelStatus = useAppSelector(selectIsWheelSpinning)

  const onClick = () => {
    dispatch(changeState(true))
    dispatch(decreaseBalance(100))
  }

  const disabled = currentWheelStatus

  return (
    <div className={`grid grid-cols-[2fr_1fr] gap-x-4 md:gap-x-6 xl:gap-x-8`}>
      <Wheel currentUser={currentUser as IUserData}/>
      <div className={`grid grid-rows-3 gap-y-4 md:gap-y-6 xl:gap-y-8`}>
        <UICard className={`text-[24px] md:text-[36px] xl:text-[48px]`}>
          {`Jackpot ${jackpot}`}
        </UICard>
        <UICard className={`text-[24px] md:text-[36px] xl:text-[48px]`}>
          {`Balance \n${balance}`}
        </UICard>
        <UIButton
          onClick={onClick}
          buttonClassName={`text-[24px] md:text-[36px] xl:text-[48px]`}
          disabled={disabled}>
          Spin Wheel
        </UIButton>
      </div>
    </div>
  );
}

export default WheelContainer;