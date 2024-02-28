import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userData: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserLoginStatus(state, action) {
      state.isLoggedIn = action.payload;
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },
  },
});

export const { setUserLoginStatus, setUserData } = authSlice.actions;
export default authSlice.reducer;
