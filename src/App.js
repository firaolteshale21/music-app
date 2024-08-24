import React from "react";
import SongList from "./components/SongList";
import AddSongForm from "./components/AddSongForm";
import UpdateSongForm from "./components/UpdateSongForm";

function App() {
  return (
    <div className="App">
      <SongList />
      <AddSongForm />
      <UpdateSongForm />
    </div>
  );
}

export default App;
