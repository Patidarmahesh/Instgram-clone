import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likeNotification: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setLikeNotification: (state, action) => {
      if (Array.isArray(state.likeNotification)) {
        if (action.payload.type === "like") {
          state.likeNotification.push(action.payload);
        } else if (action.payload.type === "dislike") {
          state.likeNotification = state.likeNotification.filter(
            (item) => item.userId !== action.payload.userId
          );
        }
      } else {
        state.likeNotification = [action.payload]; // Reinitialize if it's not an array
      }
    },
  },
});

export const { setLikeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
