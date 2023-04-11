import React from 'react';

import UIHeading from "../ui/UIHeading";
import WinnersList from "../components/WinnersList";
import {FixedLayout} from "@vkontakte/vkui";
import WheelContainer from "../components/WheelContainer";

interface IHomeProps {
  id: string,
}


const Home = ({id} : IHomeProps) => (
  <FixedLayout className={`h-screen flex bg-radial-blue`}>
    <div className={`flex flex-col p-4 pt-8 md:pt-2 disable-scroll grow`}>
      <UIHeading className={`text-[36px] pt-2`}>Wheel of fortune</UIHeading>
      <div className={`flex flex-col mt-8 space-y-8 grow`}>
        <WheelContainer />
        <WinnersList className={`h-fit`}/>
      </div>
    </div>
  </FixedLayout>


);

export default Home;
