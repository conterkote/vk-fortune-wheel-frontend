import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store";

export interface IWheelState {
  status : "stay" | "spinning" | "braking" // spinning || stay
  currentPrizes : string[]
}

const initialState: IWheelState = {
  status : "stay",
  currentPrizes : ["Jackpot", "250", "400", "10", "100", "150", "200", "750"]
}

const wheelSlice = createSlice({
  name : "wheel",
  initialState,
  reducers : {
    changeState : (state) => {
      console.log('changed')
      return {
        ...state,
        status : (state.status === "stay" ? "spinning" : state.status === "spinning" ? "braking" : "stay")
      }
    },
    stop : (state, action) => {
      return {
        ...state,
        status : "stay"
      }
    }
  }
})

export const selectCurrentStatus = (state: RootState) => state.wheel.status

export const {changeState, stop} = wheelSlice.actions

export default wheelSlice