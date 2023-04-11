import React, {useEffect, useRef, useState} from 'react';
import logo from '../img/wheel.svg';
import {useAppDispatch, useAppSelector} from "../store/store";
import {
  changePopupState,
  changeState,
  selectIsWheelSpinning,
  updateJackpot,
  updateLastWinning
} from "../store/slices/wheelSlice";
import {IUserData} from "../models";
import axios from "axios";
import {updateBalance} from "../store/slices/userSlice";
import WinnerModal from "./WinnerModal";


interface IWheelProps {
  currentUser : IUserData
}

function randomInteger(min: number, max: number): number {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function Wheel({currentUser}: IWheelProps) {
  const wheelRef = useRef<null | HTMLImageElement>(null)
  const [degrees, setDegrees] = useState<number>(0);
  const [delay, setDelay] = useState<number>(3);
  const isSpinning = useAppSelector(selectIsWheelSpinning)
  const [isSpinLocal, setIsSpinLocal] = useState(false);
  const [transition, setTransition] = useState('ease-in-out');
  const dispatch = useAppDispatch()


  const wheelStyle = {
    transition: `transform ${delay}s ${transition}`,
    transform: isSpinLocal ? "rotate(-5400deg)" : `rotate(${degrees < 22.5 ? "" : "-"}${String(degrees + 22.5)}deg)`,
  };

  const spinWheel = async () => {
    setIsSpinLocal(true)
    setDelay(3)
    await axios.post('https://vk-backend.onrender.com/v1/wheel/spin', currentUser)
      .then(res => {
        setTransition('cubic-bezier(0.16, 1, 0.3, 1)')
        const {prizeDegrees} = res.data
        const {sectionStartsAt, sectionEndsAt} = prizeDegrees
        const stopDegree = (360 * 20) + (randomInteger(sectionStartsAt, sectionEndsAt))
        setDegrees(stopDegree - 45)
        setIsSpinLocal(false)
        dispatch(updateLastWinning(res.data.amount))
        setTimeout(() => {
          setDelay(1);
          setDegrees(0);
          dispatch(changeState(false))
          dispatch(updateBalance(res.data))
          dispatch(updateJackpot(res.data.jackpot))
          dispatch(changePopupState())
          setTransition('ease-in-out')
        }, 3300)
      })
  }

  useEffect(() => {
    if (isSpinning) {
      spinWheel()
    }
  }, [isSpinning]);

  return (
    <div className={`flex justify-center items-center inner-shadow rounded-2xl bg-linear-blue`}>
      <WinnerModal />
      <div className={`relative`}>
        <img src={logo}
             alt={"404"}
             ref={wheelRef}
             className={`wheel w-[200px] md:w-[215px] xl:md:w-[230px] 2xl:w-[250px]`}
             style={wheelStyle}
        />
        <div className={`marker absolute w-[24px] h-[32px] md:w-[32px] md:h-[49px] xl:w-[48px] xl:h-[64px] top-3 left-1/2 -translate-x-1/2 rotate-180`}>

        </div>
      </div>
    </div>
  );
}

export default Wheel;