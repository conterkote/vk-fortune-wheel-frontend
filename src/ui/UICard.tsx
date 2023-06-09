import React from 'react';

interface IButtonProps {
  children: JSX.Element | string
  className : string
}

// bg-linear-red
// bg-linear-blue
function UICard({children, className}: IButtonProps) {
  return (
    <div className={`${className} flex bg-linear-blue-card items-center justify-center px-2 rounded-2xl text-golden text-center text-golden-shadow border-[3px] border-golden`}>
      {children}
    </div>
  );
}

export default UICard;