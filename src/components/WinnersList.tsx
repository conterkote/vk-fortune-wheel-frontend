import React from 'react';
import UIHeading from "../ui/UIHeading";

interface IWinnersListProps {
  className ?: string
}

function WinnersList({className} : IWinnersListProps) {
  return (
    <div className={`${className} inner-shadow rounded-2xl bg-linear-blue`}>
      <UIHeading className={`text-[30px] py-4`}>Winners</UIHeading>
      <div className={``}>

      </div>
    </div>
  );
}

export default WinnersList;