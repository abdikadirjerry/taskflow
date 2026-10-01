import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Flag,
  MoreHorizontal,
  Pencil,
  Trash2,
  UserRound,
} from "lucide-react";
import { useState } from "react";

const priorityStyles = {
  High: "bg-rose-50 text-rose-700 ring-rose-200",
  Medium: "bg-amber-50 text-amber-700 ring-amber-200",
  Low: "bg-emerald-50 text-emerald-700 ring-emerald-200",
};

const statuses = ["Todo", "In Progress", "Done"];

function formatDate(dateString) {
  if (!dateString) return "No due date";
  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "No due date";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function TaskCard({ task, projectName, onEdit, onStatusChange, onDelete }) {
  const [showActions, setShowActions] = useState(false);
  const isDone = task.status === "Done";

  return (
    <article className="group relative rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-2.5">
          {isDone ? (
            <CheckCircle2
              size={19}
              className="mt-0.5 shrink-0 text-emerald-500"
            />
          ) : (
            <Circle size={19} className="mt-0.5 shrink-0 text-slate-300" />
          )}
          <h3
            className={`text-sm font-semibold leading-5 ${isDone ? "text-slate-400 line-through" : "text-slate-800"}`}
          >
            {task.title}
          </h3>
        </div>

        <div className="relative">
          <button
            type="button"
            aria-label={`Task actions for ${task.title}`}
            aria-expanded={showActions}
            onClick={() => setShowActions((open) => !open)}
            className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <MoreHorizontal size={18} />
          </button>

          {showActions && (
            <div className="absolute right-0 top-8 z-20 w-40 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
              <button
                type="button"
                onClick={() => {
                  setShowActions(false);
                  onEdit(task);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                <Pencil size={14} /> Edit task
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowActions(false);
                  onDelete(task);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-rose-600 hover:bg-rose-50"
              >
                <Trash2 size={14} /> Delete task
              </button>
            </div>
          )}
        </div>
      </div>

      {task.description && (
        <p className="mt-3 line-clamp-2 pl-7 text-xs leading-5 text-slate-500">
          {task.description}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2 pl-7">
        <span
          className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold ring-1 ring-inset ${priorityStyles[task.priority] ?? "bg-slate-50 text-slate-600 ring-slate-200"}`}
        >
          <Flag size={11} /> {task.priority ?? "No priority"}
        </span>
        <span className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-500">
          <CalendarDays size={11} /> {formatDate(task.dueDate)}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
        <div className="min-w-0 truncate text-xs text-slate-500">
          {projectName || "Unassigned project"}
        </div>
        <div
          className="flex shrink-0 items-center gap-1.5"
          title={task.assignee || "Unassigned"}
        >
          <span className="flex size-7 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-700">
            {task.assignee ? (
              getInitials(task.assignee)
            ) : (
              <UserRound size={13} />
            )}
          </span>
          <span className="hidden max-w-20 truncate text-[11px] text-slate-500 sm:inline">
            {task.assignee || "Unassigned"}
          </span>
        </div>
      </div>

      <div className="mt-3 border-t border-slate-100 pt-3">
        <label
          className="mb-1 block text-[11px] font-semibold text-slate-500"
          htmlFor={`status-${task.id}`}
        >
          Update status
        </label>
        <select
          id={`status-${task.id}`}
          value={task.status}
          onChange={(event) => onStatusChange(task.id, event.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-medium text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </article>
  );
}

export default TaskCard;
