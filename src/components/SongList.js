import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { fetchSongs, removeSong } from "../features/songs/songsSlice";

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
      <ul>
        {songs.map((song) => (
          <li key={song.id}>
            (Song ID: {song.id}) {song.title}
            <button onClick={() => handleRemoveSong(song.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongList;
