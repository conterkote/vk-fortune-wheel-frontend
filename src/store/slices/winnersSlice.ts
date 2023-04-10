import {createSlice} from "@reduxjs/toolkit";

interface IWinnersState {
  lastWinners : []
}

const initialState: IWinnersState = {

}

const winnersSlice = createSlice({
  name : 'winners',
  initialState,
  reducers : {
    addWinner : () => {

    }
  }
})

export const {} = winnersSlice.actions
export default winnersSlice;