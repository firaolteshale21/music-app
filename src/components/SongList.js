import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { fetchSongs, removeSong } from "../features/songs/songsSlice";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function SongList() {
  const songs = useSelector((state) => state.songs.list);
  const loading = useSelector((state) => state.songs.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  if (loading) return <h2>Loading...</h2>;
  if (songs.length === 0) return <h2>No songs found.</h2>;

  const handleRemoveSong = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    });
    dispatch(removeSong(id)); // Update state after API call succeeds
  };

  return (
    <div>
      <h1>Song List</h1>
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
                }
              `}
              onClick={() => handleRemoveSong(song.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongList;
