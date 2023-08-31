import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // userData: {
  //   username: "",
  //   password: "",
  //   balance: 0,
  //   bet_amount: 0,
  //   payout_multiplier: 0,
  // },

  userData: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;

export const getUserState = (state) => {
  return state.userData;
};

export default userSlice.reducer;
