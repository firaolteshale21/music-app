import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSongRequest } from "../features/songs/songsSlice";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function AddSongForm() {
  const [newSongTitle, setNewSongTitle] = useState("");
  const dispatch = useDispatch();

  const handleAddSong = () => {
    if (!newSongTitle) {
      toast.error("Please enter a song title.");
      return;
    }

    const newSong = {
      id: Math.floor(Math.random() * 900) + 101, // Temp ID
      title: newSongTitle,
    };

    dispatch(addSongRequest(newSong)); // Dispatch action to request song addition
    setNewSongTitle("");
    toast.success("Song addition requested!");
  };

  const isFormValid = newSongTitle.trim() !== "";

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddSong();
    }
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;
        padding: 1rem;

        @media (max-width: 600px) {
          padding: 0.5rem;
          margin-bottom: 1rem;
        }
      `}
    >
      <h2
        css={css`
          font-size: 1.5rem;

          @media (max-width: 600px) {
            font-size: 1.25rem;
          }
        `}
      >
        Add Song
      </h2>
      <input
        type="text"
        value={newSongTitle}
        onChange={(e) => setNewSongTitle(e.target.value)}
        placeholder="New Song Title"
        onKeyDown={handleKeyDown}
        css={css`
          padding: 0.5rem;
          margin-bottom: 0.5rem;
          border-radius: 8px;
          border: 1px solid #333;
          background-color: #1b1b1b;
          color: white;
          font-size: 1rem;

          @media (max-width: 600px) {
            padding: 0.4rem;
            font-size: 0.9rem;
          }
        `}
      />
      <button
        css={css`
          background-color: #1db954;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;

          &:hover {
            scale: 1.05;
          }

          @media (max-width: 600px) {
            padding: 0.4rem 0.8rem;
            font-size: 0.9rem;
          }
        `}
        onClick={handleAddSong}
        disabled={!isFormValid}
      >
        Add Song
      </button>
    </div>
  );
}

export default AddSongForm;
