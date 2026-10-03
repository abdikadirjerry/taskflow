import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { ProjectsProvider } from "./context/ProjectsContext";
import { TasksProvider } from "./context/TasksContext";
import { TeamProvider } from "./context/TeamContext";
import { NotificationProvider } from "./context/NotificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProjectsProvider>
      <TasksProvider>
        <TeamProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </TeamProvider>
      </TasksProvider>
    </ProjectsProvider>
  </React.StrictMode>,
);
