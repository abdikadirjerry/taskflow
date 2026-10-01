import { CheckCircle2, Circle, Clock3 } from "lucide-react";
import TaskCard from "./TaskCard";

const columns = [
  {
    status: "Todo",
    title: "To Do",
    description: "Ready to be started",
    icon: Circle,
    iconClass: "text-slate-400",
    countClass: "bg-slate-100 text-slate-600",
  },
  {
    status: "In Progress",
    title: "In Progress",
    description: "Currently being worked on",
    icon: Clock3,
    iconClass: "text-indigo-500",
    countClass: "bg-indigo-50 text-indigo-700",
  },
  {
    status: "Done",
    title: "Done",
    description: "Completed tasks",
    icon: CheckCircle2,
    iconClass: "text-emerald-500",
    countClass: "bg-emerald-50 text-emerald-700",
  },
];

function TaskBoard({ tasks, projects, onEdit, onStatusChange, onDelete }) {
  const getProjectName = (projectId) => {
    const project = projects.find(
      (item) => String(item.id) === String(projectId),
    );
    return project?.name ?? project?.title ?? "Unassigned project";
  };

  return (
    <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-3">
      {columns.map((column) => {
        const Icon = column.icon;
        const columnTasks = tasks.filter(
          (task) => task.status === column.status,
        );

        return (
          <section
            key={column.status}
            aria-label={`${column.title} tasks`}
            className="min-w-0 rounded-2xl bg-slate-50/80 p-3 sm:p-4"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-2.5">
                <div className="mt-0.5 rounded-lg bg-white p-2 shadow-sm">
                  <Icon size={16} className={column.iconClass} />
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm font-bold text-slate-800">
                    {column.title}
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {column.description}
                  </p>
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-bold ${column.countClass}`}
              >
                {columnTasks.length}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {columnTasks.length ? (
                columnTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    projectName={getProjectName(task.projectId)}
                    onEdit={onEdit}
                    onStatusChange={onStatusChange}
                    onDelete={onDelete}
                  />
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-slate-200 bg-white/70 px-4 py-8 text-center">
                  <p className="text-xs font-medium text-slate-400">
                    No tasks here yet
                  </p>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default TaskBoard;
