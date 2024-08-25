import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import {
  fetchSongs,
  removeSong,
  addFavorite,
  removeFavorite,
} from "../features/songs/songsSlice";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { setCurrentPage } from "../features/songs/songsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingSpinner from "./LoadingSpinner";

function SongList() {
  const {
    list: songs,
    loading,
    currentPage,
    totalPages,
    favorites,
  } = useSelector((state) => state.songs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleFavorite = (song) => {
    if (favorites.includes(song.id)) {
      dispatch(removeFavorite(song.id));
      toast.success("Song removed from favorites!");
    } else {
      dispatch(addFavorite(song.id));
      toast.success("Song added to favorites!");
    }
  };

  if (loading)
    return (
      <h2
        css={css`
          color: red;
        `}
      >
        <LoadingSpinner />
      </h2>
    );
  if (songs.length === 0)
    return (
      <h2
        css={css`
          color: red;
        `}
      >
        No songs found.
      </h2>
    );

  return (
    <div>
      <h1
        css={css`
          color: lightblue;
          display: flex;
          align-items: center;
        `}
      >
        <img
          src={require("../images/mLogo.png")}
          alt="Music note"
          css={css`
            width: 24px; /* Increased width */
            height: 24px;
            margin-right: 10px;
            filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
            opacity: 0.8;
          `}
        />
        Song List
      </h1>
      <ul
        css={css`
          list-style: none;
          padding: 0;
          margin: 0;
        `}
      >
        {songs.map((song) => (
          <li
            key={song.id}
            css={css`
              background-color: #1b1b1b;
              padding: 1rem;
              margin-bottom: 0.5rem;
              border-radius: 8px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              color: white;
            `}
          >
            (Song ID: {song.id}) {song.title}
            <div>
              <button
                css={css`
                  background-color: #d32f2f;
                  color: white;
                  border: none;
                  padding: 0.5rem 1rem;
                  border-radius: 8px;
                  cursor: pointer;

                  &:hover {
                    background-color: #c62828;
                    scale: 1.1;
                  }
                `}
                onClick={() => {
                  fetch(
                    `https://jsonplaceholder.typicode.com/albums/${song.id}`,
                    {
                      method: "DELETE",
                    }
                  ).then(() => {
                    dispatch(removeSong(song.id));
                    toast.success("Song removed successfully!");
                  });
                }}
              >
                Remove
              </button>
              <button
                css={css`
                  background: none;
                  border: none;
                  cursor: pointer;
                  margin-left: 10px;
                `}
                onClick={() => handleFavorite(song)}
              >
                <img
                  src={
                    favorites.includes(song.id)
                      ? require("../images/AfterPress.png")
                      : require("../images/StarBeforePress.png")
                  }
                  alt="Favorite"
                  css={css`
                    width: 24px;
                    height: 24px;
                    filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
                  `}
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
        `}
      >
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          css={css`
            background-color: #1976d2;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            cursor: pointer;

            &:hover {
              background-color: #1565c0;
            }

            &:disabled {
              background-color: #b0bec5;
              cursor: not-allowed;
            }
          `}
        >
          Prev
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          css={css`
            background-color: #1976d2;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            cursor: pointer;

            &:hover {
              background-color: #1565c0;
            }

            &:disabled {
              background-color: #b0bec5;
              cursor: not-allowed;
            }
          `}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default SongList;
