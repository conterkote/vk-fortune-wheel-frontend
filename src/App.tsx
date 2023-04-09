import React, {useState, useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import './index.css'
import {IUserDataResponse} from "./models";
import Wheel from "./pages/Home";
import {Provider} from "react-redux";
import store from "./store/store";

function isCorrectUser(user: IUserDataResponse | unknown): user is IUserDataResponse {
  if (typeof user === 'object' && user) {
    return user.hasOwnProperty('id')
  } else return false
}

const App = () => {
  const [activePanel, setActivePanel] = useState('home');
  const [fetchedUser, setUser] = useState<IUserDataResponse | null>(null);
  const [popout, setPopout] = useState<JSX.Element | null>(
    // <ScreenSpinner size='large'/>
    null
  );

  useEffect(() => {
    async function fetchData() {
      const user = await bridge.send('VKWebAppGetUserInfo');
      if (isCorrectUser(user)) {
        console.log(user);
        setUser(user);
        setPopout(null);
      }

    }

    fetchData();
  }, []);

  return (
    <Provider store={store}>
      <ConfigProvider>
        <AdaptivityProvider>
          <AppRoot>
            <SplitLayout popout={popout}>
              <SplitCol>
                <View activePanel={activePanel}>
                  <Wheel id='home' fetchedUser={fetchedUser}/>
                </View>
              </SplitCol>
            </SplitLayout>
          </AppRoot>
        </AdaptivityProvider>
      </ConfigProvider>
    </Provider>
  );
}

export default App;
