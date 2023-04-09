import React from 'react';


interface IUISpinButton {
  children : JSX.Element
}
function UISpinButton({children} : IUISpinButton) {
  return (
    <div className={`bg-[#8A0000] rounded-2xl relative`}>
      <button className={`w-full px-2  text-golden absolute -top-1.5 text-center text-golden-shadow text-xl bg-linear-red-button h-full rounded-2xl border-[3px] border-golden`}>
        {children}
      </button>
    </div>
  );
}

export default UISpinButton;