import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ISpinResponse, IUserData, IUserState} from "../../models";
import {RootState} from "../store";
import fortuneApi from "../apis/fortuneApi";

const initialState: IUserState = {
  // userData : {...},
  balance: 0,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initializeUser: (state, action: PayloadAction<IUserData>) => {
      return {
        ...state,
        userData: {...action.payload}
      }
    },
    updateBalance : (state, action : PayloadAction<ISpinResponse>) => {
      console.log(action.payload)
      return {
        ...state,
        balance : action.payload.balance
      }
    },
    decreaseBalance : (state, action : PayloadAction<number>) => {
      console.log(action.payload)
      return {
        ...state,
        balance : state.balance - action.payload
      }
    }
  },
  extraReducers: builder => builder
    .addMatcher(fortuneApi.endpoints.fetchBalance.matchFulfilled, (state, action) => {
      return {
        ...state,
        balance : action.payload.balance
      }
    })

    .addMatcher(fortuneApi.endpoints.spin.matchFulfilled, (state, action) => {
      return {
        ...state,
        balance : action.payload.balance,
        jackpot : action.payload.jackpot
      }
    })

})

export const selectCurrentUser = (state: RootState) => state.user.userData
export const selectCurrentBalance = (state: RootState) => state.user.balance
export const {initializeUser, updateBalance, decreaseBalance} = userSlice.actions
export default userSlice