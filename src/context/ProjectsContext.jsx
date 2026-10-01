import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { initialProjects } from "../data/projectsData";

const ProjectsContext = createContext(null);
const STORAGE_KEY = "taskflow-projects";

function getSavedProjects() {
  try {
    const savedProjects = localStorage.getItem(STORAGE_KEY);

    if (!savedProjects) {
      return initialProjects;
    }

    const parsedProjects = JSON.parse(savedProjects);

    return Array.isArray(parsedProjects) ? parsedProjects : initialProjects;
  } catch {
    return initialProjects;
  }
}

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState(getSavedProjects);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (error) {
      console.error("Unable to save projects to local storage:", error);
    }
  }, [projects]);

  const addProject = useCallback((project) => {
    const newProject = {
      ...project,
      id: `project-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      progress: Number(project.progress) || 0,
      tasksCompleted: Number(project.tasksCompleted) || 0,
      totalTasks: Number(project.totalTasks) || 0,
      team: Array.isArray(project.team) ? project.team : [],
    };

    setProjects((currentProjects) => [newProject, ...currentProjects]);

    return newProject;
  }, []);

  const updateProject = useCallback((projectId, updates) => {
    setProjects((currentProjects) =>
      currentProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              ...updates,
              progress: Number(updates.progress ?? project.progress) || 0,
              tasksCompleted:
                Number(updates.tasksCompleted ?? project.tasksCompleted) || 0,
              totalTasks: Number(updates.totalTasks ?? project.totalTasks) || 0,
            }
          : project,
      ),
    );
  }, []);

  const deleteProject = useCallback((projectId) => {
    setProjects((currentProjects) =>
      currentProjects.filter((project) => project.id !== projectId),
    );
  }, []);

  const getProjectById = useCallback(
    (projectId) => projects.find((project) => project.id === projectId),
    [projects],
  );

  const value = {
    projects,
    addProject,
    updateProject,
    deleteProject,
    getProjectById,
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);

  if (!context) {
    throw new Error("useProjects must be used inside ProjectsProvider");
  }

  return context;
}
