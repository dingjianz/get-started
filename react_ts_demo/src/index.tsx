import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ThemeContext from "api/theme";

import "./index.css";


ReactDOM.render(
  <React.StrictMode>
    <ThemeContext.Provider
      value={{
        foreground: "#000000",
        background: "#eeeeee",
      }}
    >
      <App />
    </ThemeContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
