import React from "react";
import ReactDOM from "react-dom/client"; // React 18
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; // optional

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found. Make sure index.html has a div with id='root'");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);