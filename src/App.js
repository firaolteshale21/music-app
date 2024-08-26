// src/App.js
import React from "react";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import SongList from "./components/SongList";
import AddSongForm from "./components/AddSongForm";
import UpdateSongForm from "./components/UpdateSongForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FavoriteSongs from "./components/FavoriteSongs";
import Footer from "./components/Footer";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 3fr 1fr;
          grid-template-rows: 100vh;
          background-color: ${theme.colors.background};
          gap: 1rem;

          @media (max-width: 768px) {
            grid-template-columns: 1fr; /* Single column on smaller screens */
            grid-template-rows: auto; /* Auto rows for content */
          }
        `}
      >
        <aside
          css={css`
            grid-column: 1 / 2;
            background-color: #181818;
            color: ${theme.colors.textSecondary};
            padding: 1rem;

            @media (max-width: 768px) {
              grid-column: 1 / 2;
            }
          `}
        >
          <FavoriteSongs />
        </aside>
        <main
          css={css`
            grid-column: 2 / 3;
            padding-bottom: 0px;
            padding: 1rem;
            color: ${theme.colors.textPrimary};
            overflow-y: auto;
            background-color: #252525;
            border-radius: 8px;

            @media (max-width: 768px) {
              grid-column: 1 / 2;
            }
          `}
        >
          <SongList />
        </main>
        <aside
          css={css`
            grid-column: 3 / 4;
            background-color: #181818;
            padding: 1rem;
            color: ${theme.colors.textPrimary};
            display: flex;
            flex-direction: column;
            gap: 1rem;
            border-radius: 8px;

            @media (max-width: 768px) {
              grid-column: 1 / 2;
            }
          `}
        >
          <AddSongForm />
          <UpdateSongForm />
        </aside>
        <ToastContainer autoClose={1000} />
      </div>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
