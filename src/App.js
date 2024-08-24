// src/App.js
import React from "react";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import SongList from "./components/SongList";
import AddSongForm from "./components/AddSongForm";
import UpdateSongForm from "./components/UpdateSongForm";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          height: "100vh",
          backgroundColor: theme.colors.background,
        }}
      >
        <aside
          style={{
            width: "20%",
            backgroundColor: "#181818",
            color: theme.colors.textSecondary,
          }}
        >
          <h2 style={{ padding: "1rem" }}>Favorite Component</h2>
        </aside>
        <main
          style={{ flex: 1, padding: "2rem", color: theme.colors.textPrimary }}
        >
          <SongList />
        </main>
        <aside
          style={{
            width: "20%",
            backgroundColor: "#181818",
            padding: "2rem",
            color: theme.colors.textPrimary,
          }}
        >
          <AddSongForm />
          <UpdateSongForm />
        </aside>
      </div>
    </ThemeProvider>
  );
}

export default App;
