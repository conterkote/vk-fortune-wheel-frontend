import React from 'react';

import {IUserDataResponse} from "../models";
import UICard from "../ui/UICard";
import UIHeading from "../ui/UIHeading";
import UISpinButton from "../ui/UISpinButton";
import WinnersList from "../components/WinnersList";
import {FixedLayout} from "@vkontakte/vkui";
import logo from '../img/wheel.svg'
import Wheel from "../components/WheelContainer";

interface IHomeProps {
  id: string,
  fetchedUser: IUserDataResponse | null
}

const Home = ({id, fetchedUser}: IHomeProps) => (
  <FixedLayout>
    <div className={`bg-radial-blue h-screen p-4 disable-scroll`}>
      <UIHeading className={`text-[36px] pt-2`}>Wheel of fortune</UIHeading>
      <div className={`grid grid-rows-[1fr_1.5fr] gap-y-8 mt-8 h-fit`}>
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
        <WinnersList />
      </div>
    </div>
  </FixedLayout>


);

export default Home;
