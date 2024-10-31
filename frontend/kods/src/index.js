import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import SnackbarProviders from "./provider/notification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <SnackbarProviders>
      <App />
      <ToastContainer />
    </SnackbarProviders>
  </StrictMode>
);
reportWebVitals();
