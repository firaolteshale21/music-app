import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { removeFavorite } from "../features/songs/songsSlice";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function FavoriteSongs() {
  const favorites = useSelector((state) => state.songs.favorites);
  const songs = useSelector((state) => state.songs.list); // Get all songs
  const dispatch = useDispatch();

  // Get favorite songs by filtering the full list based on favorite IDs
  const favoriteSongs = songs.filter((song) => favorites.includes(song.id));

  if (favoriteSongs.length === 0) {
    return (
      <h2>
        No favorite songs.
        <img
          src={require("../images/StarBeforePress.png")}
          alt="Favorite"
          css={css`
            width: 24px;
            height: 24px;
            filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
            transform: translateY(3.2px);
          `}
        />
      </h2>
    );

  }

  return (
    <div>
      <h2
        css={css`
          color: lightblue;
        `}
      >
        Favorite Songs 
        <img
          src={require("../images/AfterPress.png")}
          alt="Favorite"
          css={css`
            width: 24px;
            height: 24px;
            filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.5));
            transform: translateY(3.2px);
          `}
        />
      </h2>

      <ul
        css={css`
          list-style: none;
          padding: 0;
          margin: 0;
        `}
      >
        {favoriteSongs.map((song) => (
          <li
            key={song.id} // Ensure each list item has a unique key
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
            {song.title}
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
                dispatch(removeFavorite(song.id)); // Correct dispatch usage
              }}
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
