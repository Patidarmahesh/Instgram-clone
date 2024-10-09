import { createSlice } from "@reduxjs/toolkit";

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: {
    bookmark: [],
    saved: null,
    searchData:[],
  },
  reducers: {
    setBookMark: (state, action) => {
      state.bookmark = action.payload;
    },
    setSaved: (state, action) => {
      state.saved = action.payload;
    },
    setSearchData: (state, action) => {
      state.searchData.push(action.payload) 
    },
    setFilterSearchData: (state, action) => {
      state.searchData = state.searchData.filter(
        (item) => item._id != action.payload
      );
    },
    clearAllSearchData: (state, action) => {
      state.searchData = action.payload;
    },
  },
});

export const {
  setBookMark,
  setSaved,
  setSearchData,
  setFilterSearchData,
  clearAllSearchData,
} = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
