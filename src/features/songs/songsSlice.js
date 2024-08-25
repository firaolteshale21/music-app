import { createSlice, createAction } from "@reduxjs/toolkit";

// Action creators for async operations
export const fetchSongs = createAction("songs/fetchSongs");
export const fetchSongsSuccess = createAction("songs/fetchSongsSuccess");
export const fetchSongsFailure = createAction("songs/fetchSongsFailure");

const songsSlice = createSlice({
  name: "songs",
  initialState: {
    list: [], // List of all songs
    loading: false,
    error: null,
    currentPage: 1, // Start on page 1
    totalPages: 1, // Initialize with 1, will be updated based on API response
    favorites: [], // Array to store favorite song IDs
  },
  reducers: {
    addSong: (state, action) => {
      const newSong = action.payload;
      state.list.unshift(newSong); // Prepend the new song to the list array
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
    addFavorite: (state, action) => {
      const songId = action.payload; // Expecting just the song ID
      if (!state.favorites.includes(songId)) {
        state.favorites.push(songId); // Add the song ID to favorites
      }
    },
    removeFavorite: (state, action) => {
      const songId = action.payload; // Expecting just the song ID
      state.favorites = state.favorites.filter((id) => id !== songId); // Remove the song ID from favorites
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSongs, (state) => {
        state.loading = true;
      })
      .addCase(fetchSongsSuccess, (state, action) => {
        state.loading = false;
        state.list = action.payload.songs;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchSongsFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addSong,
  removeSong,
  addFavorite,
  removeFavorite,
  setCurrentPage,
  updateSong,
} = songsSlice.actions;

export default songsSlice.reducer;

