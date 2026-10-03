import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Tasks from "./pages/Tasks";
import Team from "./pages/Team";
import Calendar from "./pages/Calendar";
import Analytics from "./pages/Analytics";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/projects" element={<Projects />} />

        <Route path="/projects/:projectId" element={<ProjectDetails />} />

        <Route path="/tasks" element={<Tasks />} />

        <Route path="/team" element={<Team />} />

        <Route path="/calendar" element={<Calendar />} />

        <Route path="/analytics" element={<Analytics />} />

        <Route path="/notifications" element={<Notifications />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
