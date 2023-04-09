import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
// @ts-ignore
import logo from '../img/wheel.svg';
import {isRef} from "../ui/UISpinButton";
import {useAppSelector} from "../store/store";
import {selectCurrentStatus} from "../store/slices/wheelSlice";
import internal from "stream";

function useWheelAnimation(element: MutableRefObject<HTMLImageElement>) {
  if (element) {

  }
}

function WheelContainer({}) {
  const [isSpinning, setIsSpinning] = useState(false);
  const wheelRef = useRef<null | HTMLImageElement>(null)
  const [wheelElement, setWheelElement] = useState<React.MutableRefObject<HTMLImageElement | null>>(wheelRef);
  const [degrees, setDegrees] = useState<null | number>(null);
  const [delay, setDelay] = useState<number>(3);
  const wheelStatus = useAppSelector(selectCurrentStatus)
  const wheelStyle = {
    transition: `transform ${delay}s ease-in-out`,
    transform: isSpinning ? "rotate(7200deg)" : `rotate(${degrees}deg)`,
  };

  const spinWheel = () => {
    setIsSpinning(true);
    new Promise(resolve => {
      setTimeout(() => {
      }, 1000)
      return resolve(Math.random() * 10000)
    }).then(degree => {
      setIsSpinning(false);
      setDegrees(degree);
      setTimeout(() => {
        setDegrees(0)
      }, 5000)
    })
  };

  useEffect(() => {
    setWheelElement(wheelRef)
  }, []);

  useEffect(() => {
    if (wheelStatus === 'spinning') {
      spinWheel()
    }
  }, [wheelStatus]);


  return (
    <div className={`flex justify-center items-center inner-shadow rounded-2xl bg-linear-blue`}>
      <img src={logo}
           ref={wheelRef}
           className={`wheel`}
           style={wheelStyle}
           onClick={!isSpinning ? spinWheel : undefined}
      />
    </div>
  );
}

export default WheelContainer;