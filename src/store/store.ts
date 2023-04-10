import {configureStore} from "@reduxjs/toolkit";
import wheelSlice from "./slices/wheelSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import fortuneApi from "./apis/fortuneApi";
import userSlice from "./slices/userSlice";
import winnersSlice from "./slices/winnersSlice";

const store = configureStore({
  reducer : {
    [wheelSlice.name] : wheelSlice.reducer,
    [userSlice.name] : userSlice.reducer,
    [winnersSlice.name] : winnersSlice.reducer,
    [fortuneApi.reducerPath] : fortuneApi.reducer
  },
  middleware : getDefaultMiddleware => {
    return getDefaultMiddleware({})
      .concat(fortuneApi.middleware)
  }
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store