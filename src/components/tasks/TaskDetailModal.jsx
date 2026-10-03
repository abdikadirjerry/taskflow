import { useState } from "react";
import {
  Activity,
  CalendarDays,
  CheckCircle2,
  CircleUserRound,
  Clock3,
  MessageSquare,
  Send,
  Trash2,
  X,
} from "lucide-react";

import { useTasks } from "../../context/TasksContext";
import { useSettings } from "../../context/SettingsContext";

function formatDate(dateValue) {
  if (!dateValue) {
    return "No due date";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${dateValue}T00:00:00`));
}

function formatActivityTime(dateValue) {
  const date = new Date(dateValue);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function getPriorityClasses(priority) {
  if (priority === "High") {
    return "bg-red-50 text-red-700 ring-red-600/10";
  }

  if (priority === "Medium") {
    return "bg-amber-50 text-amber-700 ring-amber-600/10";
  }

  return "bg-emerald-50 text-emerald-700 ring-emerald-600/10";
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

function TaskDetailModal({ task, projectName, onClose, onDelete }) {
  const {
    updateTask,
    addComment,
    deleteComment,
    getTaskComments,
    getTaskActivity,
  } = useTasks();

  const { settings } = useSettings();

  const [commentText, setCommentText] = useState("");

  const comments = getTaskComments(task.id);
  const activities = getTaskActivity(task.id);

  const handleCommentSubmit = (event) => {
    event.preventDefault();

    if (!commentText.trim()) {
      return;
    }

    addComment(task.id, commentText, settings.profile.name);

    setCommentText("");
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      "Delete this task? This will also remove its comments and activity history.",
    );

    if (!confirmed) {
      return;
    }

    onDelete(task.id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-7">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Task details
            </p>

            <h2 className="mt-1 truncate text-lg font-bold text-slate-900 sm:text-xl">
              {task.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close task details"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-7 p-5 sm:p-7">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                    task.status,
                  )}`}
                >
                  {task.status}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${getPriorityClasses(
                    task.priority,
                  )}`}
                >
                  {task.priority} priority
                </span>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-600">
                {task.description ||
                  "No description has been added to this task."}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <CircleUserRound size={17} />
                  <span className="text-xs font-semibold">Assignee</span>
                </div>

                <p className="mt-3 text-sm font-semibold text-slate-900">
                  {task.assignee || "Unassigned"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <CalendarDays size={17} />
                  <span className="text-xs font-semibold">Due date</span>
                </div>

                <p className="mt-3 text-sm font-semibold text-slate-900">
                  {formatDate(task.dueDate)}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock3 size={17} />
                  <span className="text-xs font-semibold">Project</span>
                </div>

                <p className="mt-3 truncate text-sm font-semibold text-slate-900">
                  {projectName || "Unknown project"}
                </p>
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Task status
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    Update the task without leaving the detail view.
                  </p>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                {["Todo", "In Progress", "Done"].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => updateTask(task.id, { status })}
                    className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                      task.status === status
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-2">
                <MessageSquare size={19} className="text-indigo-600" />

                <h3 className="text-base font-bold text-slate-900">Comments</h3>

                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
                  {comments.length}
                </span>
              </div>

              <form onSubmit={handleCommentSubmit} className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                  {settings.profile.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <textarea
                    value={commentText}
                    onChange={(event) => setCommentText(event.target.value)}
                    placeholder="Write a comment..."
                    rows={3}
                    className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                  />

                  <div className="mt-2 flex justify-end">
                    <button
                      type="submit"
                      disabled={!commentText.trim()}
                      className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Send size={15} />
                      Comment
                    </button>
                  </div>
                </div>
              </form>

              <div className="mt-6 space-y-4">
                {comments.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 px-5 py-8 text-center">
                    <MessageSquare
                      size={22}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-2 text-sm font-semibold text-slate-600">
                      No comments yet
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Start the conversation with your team.
                    </p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                        {comment.user
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>

                      <div className="min-w-0 flex-1 rounded-2xl bg-slate-50 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {comment.user}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              {formatActivityTime(comment.createdAt)}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => deleteComment(comment.id)}
                            className="text-slate-300 transition hover:text-red-500"
                            aria-label="Delete comment"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <aside className="border-t border-slate-200 bg-slate-50 p-5 sm:p-7 lg:border-l lg:border-t-0">
            <div className="flex items-center gap-2">
              <Activity size={19} className="text-indigo-600" />

              <h3 className="text-base font-bold text-slate-900">Activity</h3>
            </div>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              A timeline of changes and collaboration on this task.
            </p>

            <div className="mt-6">
              {activities.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-8 text-center">
                  <CheckCircle2 size={22} className="mx-auto text-slate-300" />

                  <p className="mt-2 text-sm font-semibold text-slate-600">
                    No activity yet
                  </p>
                </div>
              ) : (
                <div className="relative space-y-6 pl-7">
                  <div className="absolute bottom-2 left-2 top-2 w-px bg-slate-200" />

                  {activities.map((item) => (
                    <div key={item.id} className="relative">
                      <div className="absolute -left-[1.72rem] top-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-indigo-100 text-indigo-600 shadow-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />
                      </div>

                      <p className="text-sm leading-6 text-slate-600">
                        <span className="font-semibold text-slate-900">
                          {item.user}
                        </span>{" "}
                        {item.message}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {formatActivityTime(item.createdAt)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-10 border-t border-slate-200 pt-6">
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                <Trash2 size={16} />
                Delete task
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailModal;
