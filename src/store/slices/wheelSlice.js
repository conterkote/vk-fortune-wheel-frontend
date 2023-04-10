import { createSlice } from "@reduxjs/toolkit";
import fortuneApi from "../apis/fortuneApi";
;
const initialState = {
    isSpinning: false,
    isPopupOpen: false,
    lastWinning: "0",
    currentPrizes: ["Jackpot", "250", "400", "10", "100", "150", "200", "750"],
    jackpot: 0
};
const wheelSlice = createSlice({
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
        .addMatcher(fortuneApi.endpoints.fetchJackpot.matchFulfilled, (state, action) => {
        return Object.assign(Object.assign({}, state), { jackpot: action.payload.jackpot });
    })
});
export const selectIsWheelSpinning = (state) => state.wheel.isSpinning;
export const selectCurrentJackpot = (state) => state.wheel.jackpot;
export const selectCurrentPopupState = (state) => state.wheel.isPopupOpen;
export const selectLastWinning = (state) => state.wheel.lastWinning;
export const { changeState, updateJackpot, changePopupState, updateLastWinning } = wheelSlice.actions;
export default wheelSlice;
