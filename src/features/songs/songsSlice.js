import { createSlice, createAction } from "@reduxjs/toolkit";

// Action creators for async operations
export const fetchSongs = createAction("songs/fetchSongs");
export const fetchSongsSuccess = createAction("songs/fetchSongsSuccess");
export const fetchSongsFailure = createAction("songs/fetchSongsFailure");

const songsSlice = createSlice({
  name: "songs",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    addSong: (state, action) => {
      const newSong = action.payload;
      return [newSong, ...state]; // Prepend the new song to the array
    },
    removeSong: (state, action) => {
      state.list = state.list.filter((song) => song.id !== action.payload);
    },
    updateSong: (state, action) => {
      const index = state.list.findIndex(
        (song) => song.id === action.payload.id
      );
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs, (state) => {
        state.loading = true;
      })
      .addCase(fetchSongsSuccess, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchSongsFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addSong, removeSong, updateSong } = songsSlice.actions;
export default songsSlice.reducer;
  