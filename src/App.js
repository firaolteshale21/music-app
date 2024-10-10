// src/App.js
import React from "react";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import SongList from "./components/SongList";
import AddSongForm from "./components/AddSongForm";
import UpdateSongForm from "./components/UpdateSongForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr 1fr",
          gridTemplateRows: "100vh",
          backgroundColor: theme.colors.background,
          gap: "1rem",
        }}
      >
        <aside
          style={{
            gridColumn: "1 / 2",
            backgroundColor: "#181818",
            color: theme.colors.textSecondary,
            padding: "1rem",
          }}
        >
          <h2>Favorite Component</h2>
        </aside>

        <main
          style={{
            gridColumn: "2 / 3",
            padding: "1rem",
            color: theme.colors.textPrimary,
            overflowY: "auto",
            backgroundColor: "#252525",
            borderRadius: "8px",
          }}
        >
          <SongList />
        </main>

        <aside
          style={{
            gridColumn: "3 / 4",
            backgroundColor: "#181818",
            padding: "1rem",
            color: theme.colors.textPrimary,
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            borderRadius: "8px",
          }}
        >
          <AddSongForm />
          <UpdateSongForm />
        </aside>
        <ToastContainer autoClose={1000} />
    
      </div>

    </ThemeProvider>
  );
}

export default App;
