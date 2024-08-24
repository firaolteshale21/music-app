import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSong } from "../features/songs/songsSlice";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"; // Import css from @emotion/react

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
