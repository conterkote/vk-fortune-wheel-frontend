import React from 'react';
import Wheel from "./Wheel";
import UICard from "../ui/UICard";
import UIButton from "../ui/UIButton";
import {decreaseBalance, selectCurrentBalance, selectCurrentUser} from "../store/slices/userSlice";
import {useAppDispatch, useAppSelector} from "../store/store";
import {IUserData} from "../models";
import {changeState, selectCurrentJackpot, selectIsWheelSpinning} from "../store/slices/wheelSlice";
import UIHeading from "../ui/UIHeading";

function WheelContainer({width} : {width : number}) {
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
    <div className={`grid grid-cols-[2fr_01fr] md:grid-cols-1 md:grid-rows-[0.5fr_2fr_0.5fr_0.5fr] gap-x-4 md:gap-y-6 xl:gap-y-8`}>
      <UIHeading className={`hidden md:block text-[36px]`}>Wheel of fortune</UIHeading>
      <Wheel currentUser={currentUser as IUserData}/>
      <div className={`grid grid-cols-1 grid-rows-3 md:grid-cols-2 md:grid-rows-1 gap-y-4 md:gap-x-6 xl:gap-x-8`}>
        <UICard className={`text-[20px] sm:text-[22px] md:text-[26px] xl:text-[40px]`}>
          {`Jackpot ${jackpot}`}
        </UICard>
        <UICard className={`text-[24px] md:text-[26px]`}>
          {`Balance \n${balance}`}
        </UICard>
        {width <= 768 && <UIButton
            onClick={onClick}
            buttonClassName={`text-[24px] md:text-[26px] xl:text-[40px]`}
            disabled={disabled}>
            Spin Wheel
        </UIButton>}
      </div>
      {width > 768 && <UIButton
          onClick={onClick}
          className={`w-full`}
          buttonClassName={`text-[24px] md:text-[26px] xl:text-[40px]`}
          disabled={disabled}>
          Spin Wheel
      </UIButton>}
    </div>
  );
}

export default WheelContainer;