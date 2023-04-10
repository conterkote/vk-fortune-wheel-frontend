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
import {ISpinResponse, IStupidAxiosResponse, IUserData} from "../models";
// @ts-ignore
import axios from "axios";
import {updateBalance} from "../store/slices/userSlice";
import WinnerModal from "./WinnerModal";


interface IWheelProps {
  currentUser : IUserData
}

function isSpinResult(spinResult: ISpinResponse | null): spinResult is ISpinResponse {
  if (typeof spinResult === 'object') {
    return !!spinResult
  } else return false
}

function randomInteger(min: number, max: number): number {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function Wheel({currentUser}: IWheelProps) {
  const wheelRef = useRef<null | HTMLImageElement>(null)
  const [degrees, setDegrees] = useState<number>(0);
  const [delay, setDelay] = useState<number>(3);
  const isSpinning = useAppSelector(selectIsWheelSpinning)
  const [isSpinLocal, setIsSpinLocal] = useState(false);
  const dispatch = useAppDispatch()


  const wheelStyle = {
    transition: `transform ${delay}s ease-in-out`,
    transform: isSpinLocal ? "rotate(-5400deg)" : `rotate(${degrees < 22.5 ? "" : "-"}${String(degrees + 22.5)}deg)`,
  };

  const spinWheel = async () => {
    setIsSpinLocal(true)
    setDelay(3)
    await axios.post<IUserData, IStupidAxiosResponse>('http://localhost:3001/v1/wheel/spin', currentUser)
      .then(res => {
        console.log(res)
        const {prizeDegrees} = res.data
        const {sectionStartsAt, sectionEndsAt} = prizeDegrees
        const stopDegree = 1080 + (randomInteger(sectionStartsAt, sectionEndsAt))
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
             ref={wheelRef}
             className={`wheel md:w-[300px] xl:w-[400px]`}
             style={wheelStyle}
        />
        <div className={`marker absolute w-[24px] h-[32px] md:w-[32px] md:h-[49px] xl:w-[48px] xl:h-[64px] top-3 left-1/2 -translate-x-1/2 rotate-180`}>

        </div>
      </div>
    </div>
  );
}

export default Wheel;