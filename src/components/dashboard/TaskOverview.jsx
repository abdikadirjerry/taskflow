import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock3,
  ClipboardList,
} from "lucide-react";
import { Link } from "react-router-dom";

const statusConfig = {
  Todo: {
    label: "To do",
    icon: Circle,
    className: "bg-slate-100 text-slate-600",
  },
  "In Progress": {
    label: "In progress",
    icon: Clock3,
    className: "bg-indigo-50 text-indigo-700",
  },
  Done: {
    label: "Completed",
    icon: CheckCircle2,
    className: "bg-emerald-50 text-emerald-700",
  },
};

const priorityStyles = {
  High: "text-rose-600",
  Medium: "text-amber-600",
  Low: "text-emerald-600",
};

function TaskOverview({ tasks = [], projects = [] }) {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.status === "Done").length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress",
  ).length;

  const completionPercentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const recentTasks = [...tasks]
    .sort((a, b) => {
      const dateA = new Date(a.createdAt ?? 0).getTime();
      const dateB = new Date(b.createdAt ?? 0).getTime();

      return dateB - dateA;
    })
    .slice(0, 5);

  const getProjectName = (projectId) => {
    const project = projects.find(
      (item) => String(item.id) === String(projectId),
    );

    return project?.name ?? project?.title ?? "Unassigned project";
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <ClipboardList size={18} />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">
                Task overview
              </h2>
              <p className="text-xs text-slate-500">
                Your current workload at a glance
              </p>
            </div>
          </div>
        </div>

        <Link
          to="/tasks"
          className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-indigo-600 transition hover:text-indigo-700"
        >
          View all tasks
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[220px_1fr]">
        {/* Completion summary */}
        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Completion
          </p>

          <div className="mt-5 flex items-center justify-center">
            <div className="relative flex size-32 items-center justify-center rounded-full border-[10px] border-slate-200">
              <div className="absolute inset-[-10px] rounded-full border-[10px] border-indigo-500 border-b-transparent border-l-transparent border-r-transparent" />

              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900">
                  {completionPercentage}%
                </p>
                <p className="text-[10px] font-medium text-slate-400">
                  completed
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-white p-3">
              <p className="text-[11px] text-slate-500">Total</p>
              <p className="mt-1 text-lg font-bold text-slate-900">
                {totalTasks}
              </p>
            </div>

            <div className="rounded-xl bg-white p-3">
              <p className="text-[11px] text-slate-500">Active</p>
              <p className="mt-1 text-lg font-bold text-slate-900">
                {inProgressTasks}
              </p>
            </div>
          </div>
        </div>

        {/* Recent tasks */}
        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800">
              Recent tasks
            </h3>

            <span className="text-xs text-slate-400">
              {recentTasks.length} shown
            </span>
          </div>

          {recentTasks.length === 0 ? (
            <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 px-5 text-center">
              <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                <ClipboardList size={18} />
              </div>

              <p className="mt-3 text-sm font-semibold text-slate-700">
                No tasks yet
              </p>

              <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
                Create your first task to start tracking your team&apos;s work.
              </p>

              <Link
                to="/tasks"
                className="mt-4 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
              >
                Create a task
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 rounded-xl border border-slate-100">
              {recentTasks.map((task) => {
                const config = statusConfig[task.status] ?? statusConfig.Todo;

                const StatusIcon = config.icon;

                return (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-3 transition hover:bg-slate-50"
                  >
                    <StatusIcon
                      size={17}
                      className={
                        task.status === "Done"
                          ? "shrink-0 text-emerald-500"
                          : task.status === "In Progress"
                            ? "shrink-0 text-indigo-500"
                            : "shrink-0 text-slate-300"
                      }
                    />

                    <div className="min-w-0 flex-1">
                      <p
                        className={`truncate text-xs font-semibold ${
                          task.status === "Done"
                            ? "text-slate-400 line-through"
                            : "text-slate-800"
                        }`}
                      >
                        {task.title}
                      </p>

                      <p className="mt-0.5 truncate text-[11px] text-slate-400">
                        {getProjectName(task.projectId)}
                      </p>
                    </div>

                    <div className="hidden shrink-0 items-center gap-2 sm:flex">
                      <span
                        className={`text-[10px] font-semibold ${
                          priorityStyles[task.priority] ?? "text-slate-400"
                        }`}
                      >
                        {task.priority ?? "—"}
                      </span>

                      <span
                        className={`rounded-full px-2 py-1 text-[10px] font-semibold ${config.className}`}
                      >
                        {config.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default TaskOverview;
