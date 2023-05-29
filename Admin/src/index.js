import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import reportWebVitals from "./reportWebVitals";
import { Analytics } from '@vercel/analytics/react';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ToastContainer />
      <App />
      <Analytics />
    </AuthContextProvider>
  </React.StrictMode>
);


reportWebVitals();
