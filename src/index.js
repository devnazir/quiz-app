import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { AuthProvider } from './hook/useAuth'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
