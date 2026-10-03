import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { NotificationProvider } from "./context/NotificationContext";
import { ProjectsProvider } from "./context/ProjectsContext";
import { SettingsProvider } from "./context/SettingsContext";
import { TasksProvider } from "./context/TasksContext";
import { TeamProvider } from "./context/TeamContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProjectsProvider>
      <TasksProvider>
        <TeamProvider>
          <NotificationProvider>
            <SettingsProvider>
              <App />
            </SettingsProvider>
          </NotificationProvider>
        </TeamProvider>
      </TasksProvider>
    </ProjectsProvider>
  </React.StrictMode>,
);
