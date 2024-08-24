import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSong } from "../features/songs/songsSlice";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function AddSongForm() {
  const [newSongTitle, setNewSongTitle] = useState("");
  const dispatch = useDispatch();

  const handleAddSong = async () => {
    const newSong = { title: newSongTitle };
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSong),
    });
    const data = await response.json();
    dispatch(addSong(data));
    setNewSongTitle(""); // Reset input field
  };

  // Adding form validation
  const isFormValid = newSongTitle.trim() !== "";
  const buttonDisabled = !isFormValid;

  // Adding form submission with Enter key
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
      `}
    >
      <h2>Add Song</h2>
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
        `}
        onClick={handleAddSong}
      >
        Add Song
      </button>
    </div>
  );
}

export default AddSongForm;
