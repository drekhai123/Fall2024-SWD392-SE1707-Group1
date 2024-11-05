// import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import SnackbarProviders from "./provider/notification";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import './index.css';
import './flags.css';

// import { GoogleOAuthProvider } from "@react-oauth/google";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<PrimeReactProvider>
  <SnackbarProviders>
    <App />
    <ToastContainer />
  </SnackbarProviders>
  </PrimeReactProvider>
);
reportWebVitals();
