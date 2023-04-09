import React, {MutableRefObject, useEffect, useRef, useState} from 'react';
import logo from "../img/wheel.svg";

function useWheelAnimation(element : MutableRefObject<HTMLImageElement>) {
  if (element) {
    useWheelAnimation()
  }
}

function WheelContainer({}) {
  const [wheelElement, setWheelElement] = useState<MutableRefObject<HTMLImageElement | null>>(null);
  const wheelRef = useRef<null | HTMLImageElement>(null);

  useEffect(() => {
    setWheelElement(wheelRef)
  }, []);

  return (
    <div className={`flex justify-center items-center inner-shadow rounded-2xl bg-linear-blue`}>
      <img src={logo} ref={wheelRef} className={`py-6 rotate-90`} />
    </div>
  );
}

export default WheelContainer;