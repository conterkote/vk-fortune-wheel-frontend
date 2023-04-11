import React from 'react';

import UIHeading from "../ui/UIHeading";
import WinnersList from "../components/WinnersList";
import {FixedLayout} from "@vkontakte/vkui";
import WheelContainer from "../components/WheelContainer";

interface IHomeProps {
  id: string,
  width: number | null
}

const Home = ({id, width}: IHomeProps) => {
  return (
    <FixedLayout className={`h-screen w-screen flex`}>
      <div className={`flex flex-col bg-radial-blue p-4 pt-8 md:pt-2 disable-scroll grow`}>
        <UIHeading className={`block md:hidden text-[36px] pt-2`}>Wheel of fortune</UIHeading>
        <div className={`flex flex-col md:grid gap-x-8 md:grid-cols-2 w-full basis-1/2 mt-8 space-y-8 md:items-center md:space-x-0 md:space-y-0 md:grow`}>
          {
            width as number > 768 ? (
                <>
                  <WinnersList width={width as number} className={``}/>
                  <WheelContainer width={width as number}/>
                </>
            ) : (
              <>
                <WheelContainer width={width as number}/>
                <WinnersList width={width as number} className={`flex-grow md:flex-grow-0`}/>
              </>
            )
          }
        </div>
      </div>
    </FixedLayout>


  );
};

export default Home;
