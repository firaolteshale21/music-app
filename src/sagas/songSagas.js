import { call, put, takeLatest, select } from "redux-saga/effects";
import axios from "axios";
import {
  fetchSongs,
  fetchSongsSuccess,
  fetchSongsFailure,
} from "../features/songs/songsSlice";

const PAGE_SIZE = 10;

function* fetchSongsSaga() {
  try {
    const currentPage = yield select((state) => state.songs.currentPage);
    const response = yield call(
      axios.get,
      `https://jsonplaceholder.typicode.com/albums?_page=${currentPage}&_limit=${PAGE_SIZE}`
    );

    const totalPages = Math.ceil(response.headers["x-total-count"] / PAGE_SIZE);

    yield put(fetchSongsSuccess({ songs: response.data, totalPages }));
  } catch (error) {
    yield put(fetchSongsFailure(error.message));
  }
}

export function* watchFetchSongs() {
  yield takeLatest(fetchSongs.type, fetchSongsSaga);
}
