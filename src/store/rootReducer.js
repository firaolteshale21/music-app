import { combineReducers } from "@reduxjs/toolkit";
import songsReducer from "../features/songs/songsSlice";

const rootReducer = combineReducers({
  songs: songsReducer, // Combine all your reducers here
});

export default rootReducer;
