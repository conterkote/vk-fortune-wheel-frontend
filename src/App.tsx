import React, {useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {View, ScreenSpinner, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import './index.css'
import {IUserData, IUserDataResponse} from "./models";
import {useAppDispatch, useAppSelector} from "./store/store";
import {useAuthorizeMutation, useFetchBalanceQuery, useFetchJackpotQuery} from "./store/apis/fortuneApi";
import {initializeUser, selectCurrentUser} from "./store/slices/userSlice";
import Home from "./pages/Home";

function isCorrectUser(user: IUserDataResponse | unknown): user is IUserDataResponse {
  if (typeof user === 'object' && user) {
    return user.hasOwnProperty('id')
  } else return false
}

let devUser = {
  "id": 100228180,
  "bdate": "8.7.1915",
  "bdate_visibility": 1,
  "city": {
    "id": 99,
    "title": "Новосибирск"
  },
  "country": {
    "id": 1,
    "title": "Россия"
  },
  "timezone": 7,
  "photo_200": "https://sun6-20.userapi.com/s/v1/ig2/GZ_keeQdwTJePjk1k9GG5hXw8rprBPQi2KutIPhbHARGxZPSYYnGr1MfE0FBhM4KkFtx0rXvyCCpwI9oHTxK5oQw.jpg?size=200x200&quality=95&crop=0,494,1530,1530&ava=1",
  "photo_max_orig": "https://sun6-20.userapi.com/s/v1/ig2/vpB-Ww3neprGj2W1xoqEmvJnRxBUF5Nw8BBS3tTBDDrlFqseq5nhTWPsnvULDHGYQZMYPNMQrA9AMsxLF880MPL8.jpg?size=400x400&quality=95&crop=0,494,1530,1530&ava=1",
  "sex": 2,
  "photo_100": "https://sun6-20.userapi.com/s/v1/ig2/J7HbqqxxN5zout7XuB81onarlB5lFxNqVB5px9l6iYLsNncYv7cex-ihfZDqjRkOP63qOtNSvqJhshjEZIs4DnqX.jpg?size=100x100&quality=95&crop=0,494,1530,1530&ava=1",
  "first_name": "Алексей",
  "last_name": "Архипов",
  "can_access_closed": true,
  "is_closed": false
};

const dev = false

const App = () => {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(selectCurrentUser)

  const [useAuthorize] = useAuthorizeMutation();
  useFetchBalanceQuery(currentUser as IUserData, {skip : !currentUser})
  useFetchJackpotQuery(undefined, {skip : !currentUser})


  useEffect(() => {
    async function fetchData() {
      if (!dev) {
        const user = await bridge.send('VKWebAppGetUserInfo')
        if (isCorrectUser(user)) {
          dispatch(initializeUser(user))
          useAuthorize(user)
        }
      } else {
        dispatch(initializeUser(devUser))
        useAuthorize(devUser)
      }
    }

    fetchData();
  }, []);

  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout popout={currentUser ? null : <ScreenSpinner size='large'/>}>
            <SplitCol>
              <View activePanel={'home'}>
                <Home id='home'/>
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}

export default App;
