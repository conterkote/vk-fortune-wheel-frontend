var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
import { createSlice } from "@reduxjs/toolkit";
import fortuneApi from "../apis/fortuneApi";
;
var initialState = {
    isSpinning: false,
    isPopupOpen: false,
    lastWinning: "0",
    currentPrizes: ["Jackpot", "250", "400", "10", "100", "150", "200", "750"],
    jackpot: 0
};
var wheelSlice = createSlice({
    name: "wheel",
    initialState: initialState,
    reducers: {
        changeState: function (state, action) {
            return __assign(__assign({}, state), { isSpinning: action.payload });
        },
        updateJackpot: function (state, action) {
            return __assign(__assign({}, state), { jackpot: action.payload });
        },
        updateLastWinning: function (state, action) {
            return __assign(__assign({}, state), { lastWinning: action.payload });
        },
        changePopupState: function (state) {
            return __assign(__assign({}, state), { isPopupOpen: !state.isPopupOpen });
        }
    },
    extraReducers: function (builder) {
        return builder
            .addMatcher(fortuneApi.endpoints.fetchJackpot.matchFulfilled, function (state, action) {
            return __assign(__assign({}, state), { jackpot: action.payload.jackpot });
        });
    }
});
export var selectIsWheelSpinning = function (state) { return state.wheel.isSpinning; };
export var selectCurrentJackpot = function (state) { return state.wheel.jackpot; };
export var selectCurrentPopupState = function (state) { return state.wheel.isPopupOpen; };
export var selectLastWinning = function (state) { return state.wheel.lastWinning; };
export var changeState = (_a = wheelSlice.actions, _a.changeState), updateJackpot = _a.updateJackpot, changePopupState = _a.changePopupState, updateLastWinning = _a.updateLastWinning;
export default wheelSlice;
