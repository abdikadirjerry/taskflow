import { useState } from "react";

import { useProjects } from "../../context/ProjectsContext";
import { useTasks } from "../../context/TasksContext";
import TaskCard from "./TaskCard";
import TaskDetailModal from "./TaskDetailModal";

const columns = [
  {
    status: "Todo",
    title: "To Do",
    description: "Tasks waiting to be started.",
  },
  {
    status: "In Progress",
    title: "In Progress",
    description: "Tasks currently being worked on.",
  },
  {
    status: "Done",
    title: "Done",
    description: "Completed tasks.",
  },
];

function TaskBoard({ tasks }) {
  const { projects } = useProjects();
  const { getTaskComments, deleteTask } = useTasks();

  const [selectedTask, setSelectedTask] = useState(null);

  const getProjectName = (projectId) => {
    const project = projects.find((item) => item.id === projectId);

    return project?.name || "Unknown project";
  };

  return (
    <>
      <div className="grid gap-5 xl:grid-cols-3">
        {columns.map((column) => {
          const columnTasks = tasks.filter(
            (task) => task.status === column.status,
          );

          return (
            <section
              key={column.status}
              className="min-w-0 rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {column.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {column.description}
                  </p>
                </div>

                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-500 shadow-sm">
                  {columnTasks.length}
                </span>
              </div>

              <div className="space-y-3">
                {columnTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    projectName={getProjectName(task.projectId)}
                    commentCount={getTaskComments(task.id).length}
                    onClick={() => setSelectedTask(task)}
                  />
                ))}

                {columnTasks.length === 0 && (
                  <div className="rounded-xl border border-dashed border-slate-200 bg-white px-4 py-8 text-center">
                    <p className="text-xs font-medium text-slate-400">
                      No tasks in this column
                    </p>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>

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

export default TaskBoard;
