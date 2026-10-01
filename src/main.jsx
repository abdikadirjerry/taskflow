import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProjectsProvider } from "./context/ProjectsContext";
import { TasksProvider } from "./context/TasksContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProjectsProvider>
      <TasksProvider>
        <App />
      </TasksProvider>
    </ProjectsProvider>
  </React.StrictMode>,
);
