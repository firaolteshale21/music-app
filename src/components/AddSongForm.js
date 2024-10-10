import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSong } from "../features/songs/songsSlice";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function AddSongForm() {
  const [newSongTitle, setNewSongTitle] = useState("");
  const dispatch = useDispatch();

  const handleAddSong = async () => {
    if (!newSongTitle) {
      toast.error("Please enter a song title.");
      return;
    }

    const newSong = {
      id: Math.floor(Math.random() * 900) + 101,
      title: newSongTitle,
    };

    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSong),
    });

    const data = await response.json();
    data.id = newSong.id;

    dispatch(addSong(data));
    setNewSongTitle("");
    toast.success("Song added successfully!");
  };

  const isFormValid = newSongTitle.trim() !== "";
  const buttonDisabled = !isFormValid;

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
          disabled: ${buttonDisabled};

          &:hover {
            scale: 1.05;
          }

          @media (max-width: 600px) {
            padding: 0.4rem 0.8rem;
            font-size: 0.9rem;
          }
        `}
        onClick={handleAddSong}
      >
        Add Song
      </button>
    </div>
  );
}

export default AddSongForm;
  