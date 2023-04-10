import React from 'react';
import UIButton from "../ui/UIButton";
// @ts-ignore
import coins from "../img/coins.svg"
import UIHeading from "../ui/UIHeading";
import {useAppDispatch, useAppSelector} from "../store/store";
import {changePopupState, selectCurrentPopupState, selectLastWinning} from "../store/slices/wheelSlice";
interface IWinnerModal {

}

function WinnerModal({}) {
  const dispatch = useAppDispatch();
  const isPopupOpen = useAppSelector(selectCurrentPopupState)
  const winning = useAppSelector(selectLastWinning)

  if (!isPopupOpen) return null;

  return (
    <div className={`z-10 flex flex-col items-center justify-center h-screen w-screen absolute top-0 left-0 bg-black/80`}>
        <UIHeading className={`text-[60px] md:text-[80px]`}>You win!</UIHeading>
        <div className={`flex text-[50px] md:text-[60px] items-center mb-12`}>{winning}
          <img src={coins}
               className={`w-16 h-16 md:h-20 md:w-20 xl:h-24 xl:w-24 ml-4`}/></div>
        <UIButton
          onClick={() => {
            setTimeout(() => {
              dispatch(changePopupState())
            }, 700)
          }}
          className={`w-36 h-12 md:w-48 md:h-16 xl:w-64 xl:h-20`}
          buttonClassName={`text-[24px] md:text-[36px]`}>
          Great!
        </UIButton>
    </div>
  );
}

export default WinnerModal;