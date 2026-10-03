import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Analytics from "./pages/Analytics";
import Calendar from "./pages/Calendar";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import ProjectDetails from "./pages/ProjectDetails";
import Projects from "./pages/Projects";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import Tasks from "./pages/Tasks";
import Team from "./pages/Team";

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

        <Route path="/search" element={<Search />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/settings" element={<Settings />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
