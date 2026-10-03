import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router-dom";

const priorityStyles = {
  High: "bg-rose-50 text-rose-700",
  Medium: "bg-amber-50 text-amber-700",
  Low: "bg-emerald-50 text-emerald-700",
};

const statusStyles = {
  Todo: {
    icon: Circle,
    className: "text-slate-400",
  },
  "In Progress": {
    icon: Clock3,
    className: "text-indigo-500",
  },
  Done: {
    icon: CheckCircle2,
    className: "text-emerald-500",
  },
};

function parseDate(dateValue) {
  if (!dateValue) {
    return null;
  }

  const date = new Date(`${dateValue.slice(0, 10)}T00:00:00`);

  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(dateValue) {
  const date = parseDate(dateValue);

  if (!date) {
    return "No due date";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function DeadlineList({ tasks, projects, selectedDate }) {
  const getProjectName = (projectId) => {
    const project = projects.find(
      (item) => String(item.id) === String(projectId),
    );

    return project?.name ?? project?.title ?? "Unassigned project";
  };

  const getStatusConfig = (status) => {
    return (
      statusStyles[status] ?? {
        icon: Circle,
        className: "text-slate-400",
      }
    );
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingTasks = [...tasks]
    .filter((task) => task.dueDate)
    .filter((task) => task.status !== "Done")
    .sort((a, b) => {
      const dateA = parseDate(a.dueDate)?.getTime() ?? 0;
      const dateB = parseDate(b.dueDate)?.getTime() ?? 0;

      return dateA - dateB;
    })
    .slice(0, 6);

  const selectedTasks = tasks
    .filter((task) => {
      if (!task.dueDate) {
        return false;
      }

      return task.dueDate.slice(0, 10) === selectedDate;
    })
    .sort((a, b) => {
      const priorityOrder = {
        High: 1,
        Medium: 2,
        Low: 3,
      };

      return (
        (priorityOrder[a.priority] ?? 4) - (priorityOrder[b.priority] ?? 4)
      );
    });

  const selectedDateObject = parseDate(selectedDate);

  const selectedDateLabel = selectedDateObject
    ? selectedDateObject.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "Selected date";

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <CalendarDays size={17} />
              </div>

              <h2 className="text-sm font-bold text-slate-900">
                Selected date
              </h2>
            </div>

            <p className="mt-2 text-xs text-slate-500">{selectedDateLabel}</p>
          </div>

          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500">
            {selectedTasks.length}{" "}
            {selectedTasks.length === 1 ? "task" : "tasks"}
          </span>
        </div>

        <div className="mt-4">
          {selectedTasks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center">
              <CalendarDays size={20} className="mx-auto text-slate-300" />

              <p className="mt-2 text-xs font-semibold text-slate-600">
                No tasks scheduled
              </p>

              <p className="mt-1 text-[11px] text-slate-400">
                This date has no tasks with a due date.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {selectedTasks.map((task) => {
                const config = getStatusConfig(task.status);

                const StatusIcon = config.icon;

                return (
                  <div
                    key={task.id}
                    className="rounded-xl border border-slate-100 bg-slate-50/70 p-3"
                  >
                    <div className="flex items-start gap-3">
                      <StatusIcon
                        size={16}
                        className={`mt-0.5 shrink-0 ${config.className}`}
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

                        <p className="mt-1 truncate text-[10px] text-slate-400">
                          {getProjectName(task.projectId)}
                        </p>
                      </div>

                      {task.priority && (
                        <span
                          className={`shrink-0 rounded-full px-2 py-1 text-[9px] font-bold ${
                            priorityStyles[task.priority] ??
                            "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {task.priority}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Upcoming deadlines
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Tasks that still need attention.
            </p>
          </div>

          <Link
            to="/tasks"
            className="inline-flex items-center gap-1 text-[10px] font-semibold text-indigo-600 transition hover:text-indigo-700"
          >
            All tasks
            <ExternalLink size={12} />
          </Link>
        </div>

        <div className="mt-4 space-y-2">
          {upcomingTasks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center">
              <CheckCircle2 size={20} className="mx-auto text-emerald-500" />

              <p className="mt-2 text-xs font-semibold text-slate-600">
                No upcoming deadlines
              </p>

              <p className="mt-1 text-[11px] text-slate-400">
                Your active tasks have no upcoming due dates.
              </p>
            </div>
          ) : (
            upcomingTasks.map((task) => {
              const dueDate = parseDate(task.dueDate);

              const isOverdue = dueDate && dueDate.getTime() < today.getTime();

              return (
                <div
                  key={task.id}
                  className="rounded-xl border border-slate-100 p-3 transition hover:bg-slate-50"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                      <CalendarDays size={15} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-slate-800">
                        {task.title}
                      </p>

                      <p className="mt-1 truncate text-[10px] text-slate-400">
                        {getProjectName(task.projectId)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-semibold ${
                        isOverdue ? "text-rose-600" : "text-slate-500"
                      }`}
                    >
                      {isOverdue
                        ? `Overdue · ${formatDate(task.dueDate)}`
                        : formatDate(task.dueDate)}
                    </span>

                    {task.priority && (
                      <span
                        className={`rounded-full px-2 py-1 text-[9px] font-bold ${
                          priorityStyles[task.priority] ??
                          "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {task.priority}
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}

export default DeadlineList;
