import { call, put, takeLatest, select } from "redux-saga/effects";
import axios from "axios";
import {
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
} from "../features/songs/songsSlice";

// Fetch songs
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

// Create Song Saga
function* createSongSaga(action) {
  try {
    const response = yield call(
      axios.post,
      "https://jsonplaceholder.typicode.com/posts",
      action.payload
    );
    yield put(addSongSuccess(response.data));
  } catch (error) {
    yield put(addSongFailure(error.message));
  }
}

// Update Song Saga
function* updateSongSaga(action) {
  try {
    const response = yield call(
      axios.put,
      `https://jsonplaceholder.typicode.com/posts/${action.payload.id}`,
      action.payload
    );
    yield put(updateSongSuccess(response.data));
  } catch (error) {
    yield put(updateSongFailure(error.message));
  }
}

// Delete Song Saga
function* deleteSongSaga(action) {
  try {
    yield call(
      axios.delete,
      `https://jsonplaceholder.typicode.com/posts/${action.payload}`
    );
    yield put(deleteSongSuccess(action.payload));
  } catch (error) {
    yield put(deleteSongFailure(error.message));
  }
}

export function* watchFetchSongs() {
  yield takeLatest(fetchSongs.type, fetchSongsSaga);
  yield takeLatest(addSongRequest.type, createSongSaga);
  yield takeLatest(updateSongRequest.type, updateSongSaga);
  yield takeLatest(deleteSongRequest.type, deleteSongSaga);
}
