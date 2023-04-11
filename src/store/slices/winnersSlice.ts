import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IWinner} from "../../models";
import {isWinnerMessage} from "../apis/fortuneApi";
import {RootState} from "../store";

interface IWinnersState {
  lastWinners : IWinner[]
}

const initialState: IWinnersState = {
  lastWinners : []
}

const winnersSlice = createSlice({
  name : 'winners',
  initialState,
  reducers : {
    addWinner : (state, action: PayloadAction<IWinner | IWinner[]>) => {
      if (isWinnerMessage(action.payload)) {
        state.lastWinners.push(action.payload)
      } else {
        return {
          lastWinners : state.lastWinners.concat(action.payload)
        }
      }
    }
  }
})

export const selectLatestWinners = (state : RootState) => {
  const copy = [...state.winners.lastWinners]
  if (state.winners.lastWinners.length) {
    const result = copy.sort((a, b) => {
      return new Date(b.time).getTime() - new Date(a.time).getTime()
    })
    return result
  } else return []
}
export const {addWinner} = winnersSlice.actions
export default winnersSlice;