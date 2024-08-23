import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchSongs,
  fetchSongsSuccess,
  fetchSongsFailure,
} from "../features/songs/songsSlice";

function* fetchSongsSaga() {
  try {
    console.log("Fetching songs...");
    const response = yield call(
      axios.get,
      "https://jsonplaceholder.typicode.com/albums"
    );
    
    yield put(fetchSongsSuccess(response.data));
     console.log("Songs fetched:", response.data);
  } catch (error) {
    console.error("Error fetching songs:", error);
    yield put(fetchSongsFailure(error.message));
  }
}

export function* watchFetchSongs() {
  yield takeLatest(fetchSongs.type, fetchSongsSaga);
}
