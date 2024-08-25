import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSong } from "../features/songs/songsSlice";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const containerStyle = css`
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 300px;
  margin: 20px auto;
`;

const headingStyle = css`
  color: #ffffff;
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
`;

const inputStyle = css`
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const buttonStyle = css`
  background-color: #00b4d8;
  color: #ffffff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;

  &:hover {
    background-color: #0096c7;
  }
`;

function UpdateSongForm() {
  const [updateInfo, setUpdateInfo] = useState({ id: "", title: "" });
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.list); // Access the list of songs from Redux

  const handleUpdateSong = async () => {
    if (!updateInfo.id || !updateInfo.title) {
      toast.warning("Please enter both ID and title.");
      return;
    }

    if (!Number.isInteger(+updateInfo.id)) {
      toast.warning("ID Must be Valid Integer.");;
      return;
    }

    if (updateInfo.title.length < 3) {
    toast.warning("Title must be at least 3 characters long."); 
      return;
    }

    // Check if the song exists locally in Redux
    const localSong = songs.find((song) => song.id === +updateInfo.id);

    if (localSong) {
      // Update the song's title locally
      const updatedSong = { ...localSong, title: updateInfo.title };
      dispatch(updateSong(updatedSong));
      setUpdateInfo({ id: "", title: "" }); // Reset input fields
      toast.success("Song updated successfully!"); // Show success toast
    } else {
      // Fetch the song from the API if it doesn't exist locally
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${updateInfo.id}`
      );

      if (!response.ok) {
        alert("Failed to fetch the song. Please check the song ID.");
        return;
      }

      const existingSong = await response.json();

      // Update the song's properties locally
      const updatedSong = { ...existingSong, title: updateInfo.title };

      // Dispatch an action to update the song in the Redux store
      dispatch(updateSong(updatedSong));
      setUpdateInfo({ id: "", title: "" }); // Reset input fields
      toast.success("Song updated successfully!"); // Show success toast
    }
  };

  return (
    <div css={containerStyle}>
      <h2 css={headingStyle}>Update Song</h2>
      <input
        type="text"
        value={updateInfo.id}
        onChange={(e) => setUpdateInfo({ ...updateInfo, id: e.target.value })}
        placeholder="Song ID"
        css={inputStyle}
      />
      <input
        type="text"
        value={updateInfo.title}
        onChange={(e) =>
          setUpdateInfo({ ...updateInfo, title: e.target.value })
        }
        placeholder="New Title"
        css={inputStyle}
      />
      <button onClick={handleUpdateSong} css={buttonStyle}>
        Update Song
      </button>
    </div>
  );
}

export default UpdateSongForm;
