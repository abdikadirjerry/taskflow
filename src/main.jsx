import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ProjectsProvider } from "./context/ProjectsContext";
import { TasksProvider } from "./context/TasksContext";
import { TeamProvider } from "./context/TeamContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProjectsProvider>
      <TasksProvider>
        <TeamProvider>
          <App />
        </TeamProvider>
      </TasksProvider>
    </ProjectsProvider>
  </StrictMode>,
);
