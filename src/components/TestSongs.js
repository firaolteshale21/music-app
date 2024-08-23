import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSongs,
  addSong,
  removeSong,
  updateSong,
} from "../features/songs/songsSlice";

function TestSongs() {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.list);
  const loading = useSelector((state) => state.songs.loading);
  const error = useSelector((state) => state.songs.error);

  const [newSong, setNewSong] = useState("");
  const [updateInfo, setUpdateInfo] = useState({ id: "", title: "" });

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  const handleAddSong = () => {
    const newId = songs.length ? songs[songs.length - 1].id + 1 : 1;
    dispatch(addSong({ id: newId, title: newSong }));
    setNewSong("");
  };

  const handleRemoveSong = (id) => {
    dispatch(removeSong(id));
  };

  const handleUpdateSong = () => {
    dispatch(updateSong({ id: updateInfo.id, title: updateInfo.title }));
    setUpdateInfo({ id: "", title: "" });
  };

  if (loading) return <div>loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Song List</h1>
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            {song.title}
            <button onClick={() => handleRemoveSong(song.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <h2>Add Song</h2>
      <input
        type="text"
        value={newSong}
        onChange={(e) => setNewSong(e.target.value)}
        placeholder="New Song Title"
      />
      <button onClick={handleAddSong}>Add Song</button>

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

export default TestSongs;
