import { createSlice } from "@reduxjs/toolkit";

const darkAndWhiteSlice = createSlice({
  name: "dark",
  initialState: {
    dark: "white",
  },
  reducers: {
    setAddDarkMode: (state, action) => {
      state.dark = action.payload;
    },
    setRemoveDarkMode: (state, action) => {
      state.dark = action.payload;
    },
  },
});

export const { setAddDarkMode, setRemoveDarkMode } = darkAndWhiteSlice.actions;
export default darkAndWhiteSlice.reducer;
