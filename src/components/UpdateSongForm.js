import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSong } from "../features/songs/songsSlice";

function UpdateSongForm() {
  const [updateInfo, setUpdateInfo] = useState({ id: "", title: "" });
  const dispatch = useDispatch();

  const handleUpdateSong = async () => {
    if (!updateInfo.id || !updateInfo.title) {
      alert("Please enter both ID and title.");
      return;
    }

    if (!Number.isInteger(+updateInfo.id)) {
      alert("ID must be a valid integer.");
      return;
    }

    if (updateInfo.title.length < 3) {
      alert("Title must be at least 3 characters long.");
      return;
    }

    const updatedSong = { id: updateInfo.id, title: updateInfo.title };
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${updatedSong.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedSong),
      }
    );
    const data = await response.json();
    dispatch(updateSong(data)); // Dispatch update action with updated song
    setUpdateInfo({ id: "", title: "" }); // Reset input fields
  };

  return (
    <div>
      <h2>Update Song</h2>
      <input
        type="text"
        value={updateInfo.id}
        onChange={(e) => setUpdateInfo({ ...updateInfo, id: e.target.value })}
        placeholder="Song ID"
      />
      <input
        type="text"
        value={updateInfo.title}
        onChange={(e) =>
          setUpdateInfo({ ...updateInfo, title: e.target.value })
        }
        placeholder="New Title"
      />
      <button onClick={handleUpdateSong}>Update Song</button>
    </div>
  );
}

export default UpdateSongForm;
