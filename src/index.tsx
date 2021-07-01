import { StrictMode } from "react";
import ReactDOM from "react-dom";

/**
 * Imports the App
 */
import App from "./App";

/**
 * Imports styling
 */
import "./index.css";

/**
 * Renders the App
 */
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
