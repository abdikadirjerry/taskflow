import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  FolderKanban,
  UserRound,
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

function TaskList({ tasks, projects }) {
  const getProjectName = (projectId) => {
    const project = projects.find(
      (item) => String(item.id) === String(projectId),
    );

    return project?.name ?? project?.title ?? "Unassigned";
  };

  if (tasks.length === 0) {
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
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80">
              <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Task
              </th>
              <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Project
              </th>
              <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>
              <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Priority
              </th>
              <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Due date
              </th>
              <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Assignee
              </th>
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
                  <td className="max-w-64 px-5 py-4">
                    <div className="flex items-start gap-2.5">
                      <StatusIcon
                        size={17}
                        className={`mt-0.5 shrink-0 ${
                          task.status === "Done"
                            ? "text-emerald-500"
                            : task.status === "In Progress"
                              ? "text-indigo-500"
                              : "text-slate-300"
                        }`}
                      />
                      <div className="min-w-0">
                        <p
                          className={`truncate text-sm font-semibold ${
                            task.status === "Done"
                              ? "text-slate-400 line-through"
                              : "text-slate-800"
                          }`}
                        >
                          {task.title}
                        </p>
                        {task.description && (
                          <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                            {task.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <span className="inline-flex max-w-36 items-center gap-1.5 truncate text-xs text-slate-600">
                      <FolderKanban
                        size={13}
                        className="shrink-0 text-slate-400"
                      />
                      <span className="truncate">
                        {getProjectName(task.projectId)}
                      </span>
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        statusStyles[task.status] ??
                        "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`text-xs font-semibold ${
                        priorityStyles[task.priority] ?? "text-slate-500"
                      }`}
                    >
                      {task.priority ?? "—"}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-4 py-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                      <CalendarDays size={13} />
                      {formatDate(task.dueDate)}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span className="inline-flex max-w-32 items-center gap-1.5 truncate text-xs text-slate-600">
                      <UserRound
                        size={14}
                        className="shrink-0 text-slate-400"
                      />
                      <span className="truncate">
                        {task.assignee || "Unassigned"}
                      </span>
                    </span>
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
