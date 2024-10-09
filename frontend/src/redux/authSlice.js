import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    selectedUser: [],
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});
export const { setAuthUser, setSelectedUser } = authSlice.actions;
export default authSlice.reducer;
