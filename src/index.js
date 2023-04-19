import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import 'semantic-ui-css/semantic.min.css'
import "./styles.css";

const seed_data = [
  { id: "0", name: "Dance", completed: true },
  { id: "1", name: "Buy milk", completed: false },
  { id: "2", name: "Make pancakes", completed: false },
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <App todos={seed_data} />
  // </React.StrictMode>
);
