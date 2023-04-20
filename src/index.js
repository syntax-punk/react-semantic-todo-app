import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import 'semantic-ui-css/semantic.min.css';
import 'firebaseui/dist/firebaseui.css';
import "./styles.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);
