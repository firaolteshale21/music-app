import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addSong } from "../features/songs/songsSlice";

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
    <div>
      <h2>Add Song</h2>
      <input
        type="text"
        value={newSongTitle}
        onChange={(e) => setNewSongTitle(e.target.value)}
        placeholder="New Song Title"
        onKeyDown={handleKeyDown}
      />
      <button disabled={buttonDisabled} onClick={handleAddSong}>
        Add Song
      </button>
    </div>
  );
}

export default AddSongForm;
