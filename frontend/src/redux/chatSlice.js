import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    online: [],
    showSuggestedUser: false,
  },
  reducers: {
    setOnline: (state, action) => {
      state.online = action.payload;
    },
    setShowSuggestedUser: (state,action) => {
      state.showSuggestedUser = action.payload;
    },
  },
});

export const { setOnline,setShowSuggestedUser } = chatSlice.actions;
export default chatSlice.reducer;
