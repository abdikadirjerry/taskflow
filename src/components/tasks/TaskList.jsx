import { useState } from "react";

import { useProjects } from "../../context/ProjectsContext";
import { useTasks } from "../../context/TasksContext";
import TaskCard from "./TaskCard";
import TaskDetailModal from "./TaskDetailModal";

function TaskList({ tasks }) {
  const { projects } = useProjects();
  const { getTaskComments, deleteTask } = useTasks();

  const [selectedTask, setSelectedTask] = useState(null);

  const getProjectName = (projectId) => {
    const project = projects.find((item) => item.id === projectId);

    return project?.name || "Unknown project";
  };

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            projectName={getProjectName(task.projectId)}
            commentCount={getTaskComments(task.id).length}
            onClick={() => setSelectedTask(task)}
          />
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center">
          <p className="text-sm font-semibold text-slate-700">No tasks found</p>

          <p className="mt-1 text-xs text-slate-500">
            Try changing your filters or create a new task.
          </p>
        </div>
      )}

      {selectedTask && (
        <TaskDetailModal
          task={
            tasks.find((task) => task.id === selectedTask.id) || selectedTask
          }
          projectName={getProjectName(selectedTask.projectId)}
          onClose={() => setSelectedTask(null)}
          onDelete={deleteTask}
        />
      )}
    </>
  );
}

export default TaskList;
