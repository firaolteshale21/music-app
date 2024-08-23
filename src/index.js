import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import { Provider } from "react-redux"; // Ensure you're importing Provider
import store from "./store/store"; // Import the store correctly
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root")); // Create a root element

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
