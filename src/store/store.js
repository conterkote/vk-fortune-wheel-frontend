"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppSelector = exports.useAppDispatch = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const wheelSlice_1 = __importDefault(require("./slices/wheelSlice"));
const react_redux_1 = require("react-redux");
const fortuneApi_1 = __importDefault(require("./apis/fortuneApi"));
const userSlice_1 = __importDefault(require("./slices/userSlice"));
const winnersSlice_1 = __importDefault(require("./slices/winnersSlice"));
const store = (0, toolkit_1.configureStore)({
    reducer: {
        [wheelSlice_1.default.name]: wheelSlice_1.default.reducer,
        [userSlice_1.default.name]: userSlice_1.default.reducer,
        [winnersSlice_1.default.name]: winnersSlice_1.default.reducer,
        [fortuneApi_1.default.reducerPath]: fortuneApi_1.default.reducer
    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({})
            .concat(fortuneApi_1.default.middleware);
    }
});
exports.useAppDispatch = react_redux_1.useDispatch;
exports.useAppSelector = react_redux_1.useSelector;
exports.default = store;
