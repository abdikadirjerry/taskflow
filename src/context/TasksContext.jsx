import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { initialTasks } from "../data/tasksData";

const TasksContext = createContext(null);
const STORAGE_KEY = "taskflow-tasks";

function loadTasks() {
  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY);

    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      return Array.isArray(parsedTasks) ? parsedTasks : initialTasks;
    }
  } catch (error) {
    console.error("Unable to load saved tasks:", error);
  }

  return initialTasks;
}

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState(loadTasks);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error("Unable to save tasks:", error);
    }
  }, [tasks]);

  const addTask = useCallback((taskData) => {
    const newTask = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);
    return newTask;
  }, []);

  const updateTask = useCallback((taskId, updates) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, ...updates, id: task.id } : task,
      ),
    );
  }, []);

  const deleteTask = useCallback((taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  }, []);

  const getTaskById = useCallback(
    (taskId) => tasks.find((task) => task.id === taskId),
    [tasks],
  );

  const getTasksByProject = useCallback(
    (projectId) => tasks.filter((task) => task.projectId === projectId),
    [tasks],
  );

  const value = useMemo(
    () => ({
      tasks,
      addTask,
      updateTask,
      deleteTask,
      getTaskById,
      getTasksByProject,
    }),
    [tasks, addTask, updateTask, deleteTask, getTaskById, getTasksByProject],
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTasks must be used within a TasksProvider");
  }

  return context;
}
