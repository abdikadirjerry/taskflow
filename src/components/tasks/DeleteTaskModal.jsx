import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  Pencil,
  Trash2,
} from "lucide-react";

const statusStyles = {
  Todo: "bg-slate-100 text-slate-600",
  "In Progress": "bg-indigo-50 text-indigo-700",
  Done: "bg-emerald-50 text-emerald-700",
};

const priorityStyles = {
  High: "text-rose-600",
  Medium: "text-amber-600",
  Low: "text-emerald-600",
};

function formatDate(dateString) {
  if (!dateString) return "—";
  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function TaskList({ tasks, projects, onEdit, onStatusChange, onDelete }) {
  const getProjectName = (projectId) => {
    const project = projects.find(
      (item) => String(item.id) === String(projectId),
    );
    return project?.name ?? project?.title ?? "Unassigned";
  };

  if (!tasks.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
          <Circle size={22} />
        </div>
        <h3 className="mt-4 text-sm font-semibold text-slate-800">
          No tasks found
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Try changing your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80">
              {[
                "Task",
                "Project",
                "Status",
                "Priority",
                "Due date",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tasks.map((task) => {
              const StatusIcon =
                task.status === "Done"
                  ? CheckCircle2
                  : task.status === "In Progress"
                    ? Clock3
                    : Circle;

              return (
                <tr key={task.id} className="transition hover:bg-slate-50/70">
                  <td className="max-w-64 px-4 py-4">
                    <div className="flex items-start gap-2.5">
                      <StatusIcon
                        size={17}
                        className={`mt-0.5 shrink-0 ${task.status === "Done" ? "text-emerald-500" : task.status === "In Progress" ? "text-indigo-500" : "text-slate-300"}`}
                      />
                      <div className="min-w-0">
                        <p
                          className={`truncate text-sm font-semibold ${task.status === "Done" ? "text-slate-400 line-through" : "text-slate-800"}`}
                        >
                          {task.title}
                        </p>
                        {task.description && (
                          <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                            {task.description}
                          </p>
                        )}
                        <p className="mt-1 text-xs text-slate-400">
                          {task.assignee || "Unassigned"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-xs text-slate-600">
                    {getProjectName(task.projectId)}
                  </td>
                  <td className="px-4 py-4">
                    <select
                      aria-label={`Change status for ${task.title}`}
                      value={task.status}
                      onChange={(event) =>
                        onStatusChange(task.id, event.target.value)
                      }
                      className={`max-w-32 rounded-full border-0 px-2.5 py-1.5 text-[11px] font-semibold outline-none focus:ring-2 focus:ring-indigo-200 ${statusStyles[task.status] ?? "bg-slate-100 text-slate-600"}`}
                    >
                      {["Todo", "In Progress", "Done"].map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`text-xs font-semibold ${priorityStyles[task.priority] ?? "text-slate-500"}`}
                    >
                      {task.priority ?? "—"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                      <CalendarDays size={13} /> {formatDate(task.dueDate)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onEdit(task)}
                        aria-label={`Edit ${task.title}`}
                        title="Edit task"
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(task)}
                        aria-label={`Delete ${task.title}`}
                        title="Delete task"
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskList;
