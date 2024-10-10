import { createSlice, createAction } from "@reduxjs/toolkit";

// Action creators for async operations
export const fetchSongs = createAction("songs/fetchSongs");
export const fetchSongsSuccess = createAction("songs/fetchSongsSuccess");
export const fetchSongsFailure = createAction("songs/fetchSongsFailure");

// Additional action creators for async operations related to add, update, and delete
export const addSongRequest = createAction("songs/addSongRequest");
export const addSongSuccess = createAction("songs/addSongSuccess");
export const addSongFailure = createAction("songs/addSongFailure");

export const updateSongRequest = createAction("songs/updateSongRequest");
export const updateSongSuccess = createAction("songs/updateSongSuccess");
export const updateSongFailure = createAction("songs/updateSongFailure");

export const deleteSongRequest = createAction("songs/deleteSongRequest");
export const deleteSongSuccess = createAction("songs/deleteSongSuccess");
export const deleteSongFailure = createAction("songs/deleteSongFailure");

// New action creators for add and remove song
export const addSong = createAction("songs/addSong");
export const removeSong = createAction("songs/removeSong");

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
      // Fetch Songs
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
      })
      // Add Song
      .addCase(addSongRequest, (state) => {
        state.loading = true;
      })
      .addCase(addSongSuccess, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addSongFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Song
      .addCase(updateSongRequest, (state) => {
        state.loading = true;
      })
      .addCase(updateSongSuccess, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(
          (song) => song.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateSongFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Song
      .addCase(deleteSongRequest, (state) => {
        state.loading = true;
      })
      .addCase(deleteSongSuccess, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((song) => song.id !== action.payload);
      })
      .addCase(deleteSongFailure, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Direct add/remove Song actions for non-async scenarios
      .addCase(addSong, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(removeSong, (state, action) => {
        state.list = state.list.filter((song) => song.id !== action.payload);
      });
  },
});

export const { addFavorite, removeFavorite, setCurrentPage } =
  songsSlice.actions;

export default songsSlice.reducer;
