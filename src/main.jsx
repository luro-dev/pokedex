import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./fanta.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// 2:40:38 -> setup side nav
