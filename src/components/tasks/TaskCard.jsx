import {
  CalendarDays,
  CircleUserRound,
  Flag,
  MessageSquare,
} from "lucide-react";

function getPriorityClasses(priority) {
  if (priority === "High") {
    return "bg-red-50 text-red-700";
  }

  if (priority === "Medium") {
    return "bg-amber-50 text-amber-700";
  }

  return "bg-emerald-50 text-emerald-700";
}

function getStatusClasses(status) {
  if (status === "Done") {
    return "bg-emerald-50 text-emerald-700";
  }

  if (status === "In Progress") {
    return "bg-indigo-50 text-indigo-700";
  }

  return "bg-slate-100 text-slate-700";
}

function formatDate(dateValue) {
  if (!dateValue) {
    return "No due date";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${dateValue}T00:00:00`));
}

function TaskCard({ task, projectName, commentCount = 0, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-sm font-bold text-slate-900 group-hover:text-indigo-600">
            {task.title}
          </h3>

          <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
            {task.description || "No description"}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${getPriorityClasses(
            task.priority,
          )}`}
        >
          {task.priority}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusClasses(
            task.status,
          )}`}
        >
          {task.status}
        </span>

        {projectName && (
          <span className="max-w-36 truncate rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-600">
            {projectName}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <div className="flex min-w-0 items-center gap-2 text-xs text-slate-500">
          <CircleUserRound size={15} />

          <span className="max-w-28 truncate">
            {task.assignee || "Unassigned"}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="inline-flex items-center gap-1">
            <CalendarDays size={14} />
            {formatDate(task.dueDate)}
          </span>

          <span className="inline-flex items-center gap-1">
            <MessageSquare size={14} />
            {commentCount}
          </span>
        </div>
      </div>
    </button>
  );
}

export default TaskCard;
