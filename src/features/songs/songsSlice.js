import { createSlice } from "@reduxjs/toolkit";

const songsSlice = createSlice({
  name: "songs",
  initialState: {
    list: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 0,
  },
  reducers: {
    fetchSongs: (state) => {
      state.loading = true;
    },
    fetchSongsSuccess: (state, action) => {
      state.loading = false;
      state.list = action.payload.songs;
      state.totalPages = action.payload.totalPages;
    },
    fetchSongsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addSongRequest: (state) => {
      state.loading = true;
    },
    addSongSuccess: (state, action) => {
      state.loading = false;
      state.list.push(action.payload);
    },
    addSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateSongRequest: (state) => {
      state.loading = true;
    },
    updateSongSuccess: (state, action) => {
      state.loading = false;
      const index = state.list.findIndex(
        (song) => song.id === action.payload.id
      );
      if (index !== -1) state.list[index] = action.payload;
    },
    updateSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSongRequest: (state) => {
      state.loading = true;
    },
    deleteSongSuccess: (state, action) => {
      state.loading = false;
      state.list = state.list.filter((song) => song.id !== action.payload);
    },
    deleteSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Move setCurrentPage into the reducers object
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  fetchSongs,
  fetchSongsSuccess,
  fetchSongsFailure,
  addSongRequest,
  addSongSuccess,
  addSongFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
  setCurrentPage,
} = songsSlice.actions;

export default songsSlice.reducer;
