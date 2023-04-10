"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateLastWinning = exports.changePopupState = exports.updateJackpot = exports.changeState = exports.selectLastWinning = exports.selectCurrentPopupState = exports.selectCurrentJackpot = exports.selectIsWheelSpinning = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const fortuneApi_1 = __importDefault(require("../apis/fortuneApi"));
const initialState = {
    isSpinning: false,
    isPopupOpen: false,
    lastWinning: "0",
    currentPrizes: ["Jackpot", "250", "400", "10", "100", "150", "200", "750"],
    jackpot: 0
};
const wheelSlice = (0, toolkit_1.createSlice)({
    name: "wheel",
    initialState,
    reducers: {
        changeState: (state, action) => {
            return Object.assign(Object.assign({}, state), { isSpinning: action.payload });
        },
        updateJackpot: (state, action) => {
            return Object.assign(Object.assign({}, state), { jackpot: action.payload });
        },
        updateLastWinning: (state, action) => {
            return Object.assign(Object.assign({}, state), { lastWinning: action.payload });
        },
        changePopupState: (state) => {
            return Object.assign(Object.assign({}, state), { isPopupOpen: !state.isPopupOpen });
        }
    },
    extraReducers: builder => builder
        .addMatcher(fortuneApi_1.default.endpoints.fetchJackpot.matchFulfilled, (state, action) => {
        return Object.assign(Object.assign({}, state), { jackpot: action.payload.jackpot });
    })
});
const selectIsWheelSpinning = (state) => state.wheel.isSpinning;
exports.selectIsWheelSpinning = selectIsWheelSpinning;
const selectCurrentJackpot = (state) => state.wheel.jackpot;
exports.selectCurrentJackpot = selectCurrentJackpot;
const selectCurrentPopupState = (state) => state.wheel.isPopupOpen;
exports.selectCurrentPopupState = selectCurrentPopupState;
const selectLastWinning = (state) => state.wheel.lastWinning;
exports.selectLastWinning = selectLastWinning;
_a = wheelSlice.actions, exports.changeState = _a.changeState, exports.updateJackpot = _a.updateJackpot, exports.changePopupState = _a.changePopupState, exports.updateLastWinning = _a.updateLastWinning;
exports.default = wheelSlice;
