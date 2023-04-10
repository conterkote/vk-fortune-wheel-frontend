import { configureStore } from "@reduxjs/toolkit";
import wheelSlice from "./slices/wheelSlice";
import { useDispatch, useSelector } from "react-redux";
import fortuneApi from "./apis/fortuneApi";
import userSlice from "./slices/userSlice";
import winnersSlice from "./slices/winnersSlice";
const store = configureStore({
    reducer: {
        [wheelSlice.name]: wheelSlice.reducer,
        [userSlice.name]: userSlice.reducer,
        [winnersSlice.name]: winnersSlice.reducer,
        [fortuneApi.reducerPath]: fortuneApi.reducer
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({})
            .concat(fortuneApi.middleware);
    }
});
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
export default store;
