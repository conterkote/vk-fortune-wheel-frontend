var _a;
import { configureStore } from "@reduxjs/toolkit";
import wheelSlice from "./slices/wheelSlice";
import { useDispatch, useSelector } from "react-redux";
import fortuneApi from "./apis/fortuneApi";
import userSlice from "./slices/userSlice";
import winnersSlice from "./slices/winnersSlice";
var store = configureStore({
    reducer: (_a = {},
        _a[wheelSlice.name] = wheelSlice.reducer,
        _a[userSlice.name] = userSlice.reducer,
        _a[winnersSlice.name] = winnersSlice.reducer,
        _a[fortuneApi.reducerPath] = fortuneApi.reducer,
        _a),
    middleware: function (getDefaultMiddleware) {
        return getDefaultMiddleware({})
            .concat(fortuneApi.middleware);
    }
});
export var useAppDispatch = useDispatch;
export var useAppSelector = useSelector;
export default store;
