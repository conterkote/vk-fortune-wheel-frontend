import React from 'react';

import {IUserDataResponse} from "../models";
import UICard from "../ui/UICard";
import UIHeading from "../ui/UIHeading";
import UISpinButton from "../ui/UISpinButton";
import WinnersList from "../components/WinnersList";
import {FixedLayout} from "@vkontakte/vkui";
import Wheel from "../components/WheelContainer";

interface IHomeProps {
  id: string,
  fetchedUser: IUserDataResponse | null
}

const Home = ({id, fetchedUser}: IHomeProps) => (
  <FixedLayout className={`h-screen flex bg-radial-blue`}>
    <div className={`flex flex-col p-4 disable-scroll grow`}>
      <UIHeading className={`text-[36px] pt-2`}>Wheel of fortune</UIHeading>
      <div className={`flex flex-col mt-8 space-y-8 grow`}>
        <div className={`grid grid-cols-[2fr_1fr] gap-x-4`}>
          <Wheel />
          <div className={`grid grid-rows-3 gap-y-4`}>
            <UICard>
              Jackpot
              1000
            </UICard>
            <UICard>
              Balance
              10000
            </UICard>
            <UISpinButton>
              Spin Wheel
            </UISpinButton>
          </div>
        </div>
        <WinnersList className={`flex-grow`}/>
      </div>
    </div>
  </FixedLayout>


);

export default Home;
