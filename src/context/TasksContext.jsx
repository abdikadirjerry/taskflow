import { createContext, useContext, useEffect, useMemo, useState } from "react";

const TasksContext = createContext(null);

const TASKS_STORAGE_KEY = "taskflow-tasks";
const COMMENTS_STORAGE_KEY = "taskflow-task-comments";
const ACTIVITY_STORAGE_KEY = "taskflow-task-activity";

const initialTasks = [
  {
    id: "task-1",
    title: "Design landing page",
    description:
      "Create the initial landing page design and responsive layout.",
    projectId: "project-1",
    status: "In Progress",
    priority: "High",
    dueDate: "2026-10-08",
    assignee: "Sarah Johnson",
    createdAt: "2026-10-01",
  },
  {
    id: "task-2",
    title: "Build authentication flow",
    description:
      "Implement login, logout, protected routes, and persistent authentication.",
    projectId: "project-1",
    status: "Done",
    priority: "High",
    dueDate: "2026-10-05",
    assignee: "Alex Morgan",
    createdAt: "2026-09-28",
  },
  {
    id: "task-3",
    title: "Create analytics dashboard",
    description:
      "Build charts and performance metrics for the analytics workspace.",
    projectId: "project-2",
    status: "Todo",
    priority: "Medium",
    dueDate: "2026-10-12",
    assignee: "David Wilson",
    createdAt: "2026-10-02",
  },
  {
    id: "task-4",
    title: "Review mobile layout",
    description:
      "Review all important screens and fix responsive layout issues.",
    projectId: "project-2",
    status: "In Progress",
    priority: "Medium",
    dueDate: "2026-10-10",
    assignee: "Emily Carter",
    createdAt: "2026-10-01",
  },
  {
    id: "task-5",
    title: "Prepare project documentation",
    description:
      "Write setup instructions and document important project decisions.",
    projectId: "project-3",
    status: "Todo",
    priority: "Low",
    dueDate: "2026-10-15",
    assignee: "Michael Brown",
    createdAt: "2026-10-03",
  },
];

function readStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);

    if (!stored) {
      return fallback;
    }

    return JSON.parse(stored);
  } catch {
    return fallback;
  }
}

function createActivity({ taskId, type, message, user }) {
  return {
    id: `activity-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    taskId,
    type,
    message,
    user,
    createdAt: new Date().toISOString(),
  };
}

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState(() =>
    readStorage(TASKS_STORAGE_KEY, initialTasks),
  );

  const [comments, setComments] = useState(() =>
    readStorage(COMMENTS_STORAGE_KEY, []),
  );

  const [activity, setActivity] = useState(() =>
    readStorage(ACTIVITY_STORAGE_KEY, []),
  );

  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(activity));
  }, [activity]);

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: task.createdAt || new Date().toISOString(),
    };

    setTasks((current) => [newTask, ...current]);

    setActivity((current) => [
      createActivity({
        taskId: newTask.id,
        type: "created",
        message: `created task "${newTask.title}"`,
        user: "Alex Morgan",
      }),
      ...current,
    ]);

    return newTask;
  };

  const updateTask = (taskId, updates) => {
    let updatedTask = null;
    let previousTask = null;

    setTasks((current) =>
      current.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        previousTask = task;

        updatedTask = {
          ...task,
          ...updates,
        };

        return updatedTask;
      }),
    );

    if (updatedTask && previousTask) {
      const activities = [];

      if (updates.status && updates.status !== previousTask.status) {
        activities.push(
          createActivity({
            taskId,
            type: "status",
            message: `changed status from "${previousTask.status}" to "${updates.status}"`,
            user: "Alex Morgan",
          }),
        );
      }

      if (updates.priority && updates.priority !== previousTask.priority) {
        activities.push(
          createActivity({
            taskId,
            type: "priority",
            message: `changed priority from "${previousTask.priority}" to "${updates.priority}"`,
            user: "Alex Morgan",
          }),
        );
      }

      if (updates.assignee && updates.assignee !== previousTask.assignee) {
        activities.push(
          createActivity({
            taskId,
            type: "assignee",
            message: `assigned the task to ${updates.assignee}`,
            user: "Alex Morgan",
          }),
        );
      }

      if (activities.length > 0) {
        setActivity((current) => [...activities, ...current]);
      }
    }

    return updatedTask;
  };

  const deleteTask = (taskId) => {
    const deletedTask = tasks.find((task) => task.id === taskId);

    setTasks((current) => current.filter((task) => task.id !== taskId));

    setComments((current) =>
      current.filter((comment) => comment.taskId !== taskId),
    );

    setActivity((current) => current.filter((item) => item.taskId !== taskId));

    if (deletedTask) {
      setActivity((current) => [
        createActivity({
          taskId,
          type: "deleted",
          message: `deleted task "${deletedTask.title}"`,
          user: "Alex Morgan",
        }),
        ...current,
      ]);
    }
  };

  const addComment = (taskId, text, user = "Alex Morgan") => {
    const trimmedText = text.trim();

    if (!trimmedText) {
      return null;
    }

    const comment = {
      id: `comment-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      taskId,
      text: trimmedText,
      user,
      createdAt: new Date().toISOString(),
    };

    setComments((current) => [...current, comment]);

    setActivity((current) => [
      createActivity({
        taskId,
        type: "comment",
        message: "added a comment",
        user,
      }),
      ...current,
    ]);

    return comment;
  };

  const deleteComment = (commentId) => {
    setComments((current) =>
      current.filter((comment) => comment.id !== commentId),
    );
  };

  const getTaskComments = (taskId) =>
    comments
      .filter((comment) => comment.taskId === taskId)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  const getTaskActivity = (taskId) =>
    activity
      .filter((item) => item.taskId === taskId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const value = useMemo(
    () => ({
      tasks,
      comments,
      activity,
      addTask,
      updateTask,
      deleteTask,
      addComment,
      deleteComment,
      getTaskComments,
      getTaskActivity,
    }),
    [tasks, comments, activity],
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTasks must be used inside TasksProvider");
  }

  return context;
}
