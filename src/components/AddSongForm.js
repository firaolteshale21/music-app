import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSongRequest } from "../features/songs/songsSlice"; // Updated action
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function AddSongForm() {
  const [newSongTitle, setNewSongTitle] = useState("");
  const dispatch = useDispatch();

  const handleAddSong = () => {
    if (!newSongTitle) {
      toast.error("Please enter a song title."); // Show error toast
      return;
    }

    const newSong = {
      // Generate a unique ID using math random value between 101 - 999
      id: Math.floor(Math.random() * 900) + 101, // Use Math.floor to round down the random number
      title: newSongTitle,
    };

    // Dispatch the saga request instead of direct add action
    dispatch(addSongRequest(newSong));
    setNewSongTitle(""); // Reset input field
    toast.success("Song added successfully!"); // Show success toast
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
          background-color: ${buttonDisabled ? "#b0bec5" : "#1db954"};
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: ${buttonDisabled ? "not-allowed" : "pointer"};
          &:hover {
            scale: ${buttonDisabled ? "1" : "1.05"};
          }
        `}
        onClick={handleAddSong}
        disabled={buttonDisabled}
      >
        Add Song
      </button>
    </div>
  );
}

export default AddSongForm;
