import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CatalogProvider } from "./context/CatalogContext.jsx";
import { GameProvider } from "./context/GameContext.jsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CatalogProvider>
        <GameProvider>
          <App />
        </GameProvider>
      </CatalogProvider>
    </AuthProvider>
  </React.StrictMode>
);
