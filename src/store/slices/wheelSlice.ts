import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {act} from "react-dom/test-utils";
import fortuneApi from "../apis/fortuneApi";
import {number} from "prop-types";

export interface IWheelState {
  isSpinning : boolean // spinning || stay
  isPopupOpen : boolean
  lastWinning : string
  currentPrizes : string[]
  jackpot : number
};

const initialState: IWheelState = {
  isSpinning : false,
  isPopupOpen : false,
  lastWinning : "0",
  currentPrizes : ["Jackpot", "250", "400", "10", "100", "150", "200", "750"],
  jackpot : 0
}

const wheelSlice = createSlice({
  name : "wheel",
  initialState,
  reducers : {
    changeState : (state, action : PayloadAction<boolean>) => {
      return {
        ...state,
        isSpinning : action.payload
      }
    },
    updateJackpot : (state, action : PayloadAction<number>) => {
      return {
        ...state,
        jackpot : action.payload
      }
    },
    updateLastWinning : (state, action : PayloadAction<string>) => {
      return {
        ...state,
        lastWinning : action.payload
      }
    },
    changePopupState : (state) => {
      return {
        ...state,
        isPopupOpen : !state.isPopupOpen
      }
    }
  },
  extraReducers : builder =>
    builder
      .addMatcher(fortuneApi.endpoints.fetchJackpot.matchFulfilled, (state, action) => {
        return {
          ...state,
          jackpot : action.payload.jackpot
        }
      })
})

export const selectIsWheelSpinning = (state: RootState) => state.wheel.isSpinning
export const selectCurrentJackpot = (state : RootState) => state.wheel.jackpot
export const selectCurrentPopupState = (state : RootState) => state.wheel.isPopupOpen
export const selectLastWinning = (state : RootState) => state.wheel.lastWinning
export const {changeState, updateJackpot, changePopupState, updateLastWinning} = wheelSlice.actions

export default wheelSlice