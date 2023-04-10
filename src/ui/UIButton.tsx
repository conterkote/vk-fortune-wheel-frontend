import React, {useState} from 'react';

interface IUISpinButton {
  className ?: string
  buttonClassName ?: string
  onClick ?: () => any
  children : JSX.Element | string
  disabled ?: any
}
function UIButton({children, className, disabled, onClick, buttonClassName}: IUISpinButton) {
  const [animationState, setAnimationState] = useState(false);

  return (
    <div className={`${className} bg-[#8A0000] rounded-2xl relative`}>
      <button
        onClick={() => {
          if (onClick) {
            onClick()
          }
          setAnimationState(true)
        }}
        disabled={disabled ? disabled : null}
        onAnimationEnd={() => {
          setAnimationState(false)
        }}
        className={`${buttonClassName} spinButton text-golden-shadow text-golden ${animationState ? "spinAnimate" : ""}`}>
        {children}
      </button>
    </div>
  );
}

export default UIButton;