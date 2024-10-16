import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    selectedUser: [],
    indexCountValue: 0,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setIndexCount: (state, action) => {
      state.indexCountValue = action.payload;
    },
  },
});

export const { setAuthUser, setSelectedUser, setIndexCount } =
  authSlice.actions;
export default authSlice.reducer;
