import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isRegistered: false,
  mySecrete: "",
  myPassword: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initUser: (state, action) => {
      state.isRegistered = action.payload.isRegistered;
      state.mySecrete = action.payload.mySecrete;
      state.myPassword = action.payload.myPassword;
    },
    resetUser: (state, action) => {
      state.isRegistered = false;
      state.mySecrete = "";
      state.myPassword = "";
    },
    setIsRegistered: (state, action) => {
      state.isRegistered = action.payload;
    },
    setMySecrete: (state, action) => {
      state.mySecrete = action.payload;
    },
    setMyPassword: (state, action) => {
      state.myPassword = action.payload;
    },
  },
});

export const {
  initUser,
  resetUser,
  setIsRegistered,
  setMySecrete,
  setMyPassword,
} = userSlice.actions;

export const selectUser = (state) => state;
export default userSlice.reducer;
