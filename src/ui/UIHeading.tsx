import React from 'react';

interface IUIHeadingProps {
  children : JSX.Element | string
  className?: string
}

function UIHeading({children, className} : IUIHeadingProps) {
  return (
    <h1 className={`${className} text-center`}>
      {children}
    </h1>
  );
}

export default UIHeading;