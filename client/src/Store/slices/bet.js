import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  betActive: 1,
  liveBettingTable: "",
  crashHistory: [],
};

export const betSlice = createSlice({
  name: "bet",
  initialState,
  reducers: {
    setBetActive: (state, action) => {
      state.betActive = action.payload;
    },

    setLiveBettingTable: (state, action) => {
      state.liveBettingTable = action.payload;
    },

    setCrashHistory: (state, action) => {
      state.crashHistory = action.payload;
    },
  },
});

export const { setBetActive, setLiveBettingTable, setCrashHistory } =
  betSlice.actions;

export const getBetState = (state) => {
  return state.betActive;
};

export const getLiveBettingTable = (state) => {
  return state.liveBettingTable;
};

export const getCrashHistory = (state) => {
  return state.crashHistory;
};
export default betSlice.reducer;
