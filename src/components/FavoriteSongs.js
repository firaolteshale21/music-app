import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../features/songs/songsSlice";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { toast } from "react-toastify";

function FavoriteSongs() {
  const favoriteSongs = useSelector((state) => state.songs.favorites);
  const dispatch = useDispatch();

  if (favoriteSongs.length === 0) {
    return (
      <h2
        css={css`
          color: red;
        `}
      >
        No favorite songs added.
      </h2>
    );
  }

  const handleRemoveFavorite = (songId) => {
    dispatch(removeFavorite(songId));
    toast.success("Removed from favorites!");
  };

  return (
    <div>
      <h1
        css={css`
          color: lightgreen;
          display: flex;
          align-items: center;
        `}
      >
        <img
          src={require("../images/StarBeforePress.png")}
          alt="Favorite icon"
          css={css`
            width: 34px;
            height: 34px;
            margin-right: 10px;
            filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
            opacity: 0.8;
          `}
        />
        Favorite Songs
      </h1>
      <ul
        css={css`
          list-style: none;
          padding: 0;
          margin: 0;
        `}
      >
        {favoriteSongs.map((song) => (
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
              onClick={() => handleRemoveFavorite(song.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteSongs;
