import React, {useEffect, useRef, useState} from 'react';
import {useAppDispatch} from "../store/store";
import {changeState} from "../store/slices/wheelSlice";


interface IUISpinButton {
  children: JSX.Element | string
}

export function isRef<T>(ref: React.MutableRefObject<T | null>): ref is React.MutableRefObject<T> {
  if (typeof ref === 'object') {
    return !!ref.current
  } else return false
}

function UISpinButton({children}: IUISpinButton) {
  const buttonRef = useRef<null | HTMLButtonElement>(null)
  const dispatch = useAppDispatch()
  const [animationState, setAnimationState] = useState(false);
  const [buttonElement, setButtonElement] =
    useState<React.MutableRefObject<HTMLButtonElement | null>>(buttonRef);
  useEffect(() => {
    setButtonElement(buttonRef)
  }, []);

  function useAnimation(ref: React.MutableRefObject<HTMLButtonElement>) {
    if (animationState === false) {
      setAnimationState(true)
      ref.current.disabled = true
    } else {
      setAnimationState(false)
      ref.current.disabled = false
    }
  }


  return (
    <div className={`bg-[#8A0000] rounded-2xl relative`}>
      <button
        ref={buttonRef}
        onClick={() => {
          dispatch(changeState())
          if (isRef(buttonRef)) useAnimation(buttonRef)
        }}
        onAnimationEnd={() => {
          if (isRef(buttonRef)) useAnimation(buttonRef)
        }}
        className={`spinButton ${animationState ? "spinAnimate" : ""}`}>
        {children}
      </button>
    </div>
  );
}

export default UISpinButton;