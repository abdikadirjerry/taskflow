import {
  CalendarDays,
  CheckCircle2,
  MoreHorizontal,
  Pencil,
  Users,
} from "lucide-react";
import Avatar from "../ui/Avatar";

const statusStyles = {
  "In Progress": "bg-blue-50 text-blue-700 ring-blue-600/20",
  Planning: "bg-violet-50 text-violet-700 ring-violet-600/20",
  Completed: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  "On Hold": "bg-amber-50 text-amber-700 ring-amber-600/20",
};

const priorityStyles = {
  High: "bg-rose-50 text-rose-700",
  Medium: "bg-amber-50 text-amber-700",
  Low: "bg-slate-100 text-slate-600",
};

const categoryStyles = {
  Design: "bg-violet-100 text-violet-700",
  Development: "bg-sky-100 text-sky-700",
  Marketing: "bg-pink-100 text-pink-700",
};

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

function ProjectCard({ project, onEdit, onDelete }) {
  const progress = Math.min(100, Math.max(0, Number(project.progress) || 0));
  const team = Array.isArray(project.team) ? project.team : [];

  return (
    <article className="group flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`flex size-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
              categoryStyles[project.category] || "bg-slate-100 text-slate-600"
            }`}
          >
            {(project.name || "P").slice(0, 2).toUpperCase()}
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-slate-900">
              {project.name}
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">
              {project.category || "General"}
            </p>
          </div>
        </div>

        <div className="relative flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => onEdit?.(project)}
            aria-label={`Edit ${project.name}`}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600"
          >
            <Pencil size={16} />
          </button>
          <button
            type="button"
            onClick={() => onDelete?.(project)}
            aria-label={`Delete ${project.name}`}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
          >
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      <p className="mt-4 min-h-10 text-sm leading-5 text-slate-500">
        {project.description || "No project description provided."}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
            statusStyles[project.status] ||
            "bg-slate-100 text-slate-600 ring-slate-200"
          }`}
        >
          {project.status || "Planning"}
        </span>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            priorityStyles[project.priority] || "bg-slate-100 text-slate-600"
          }`}
        >
          {project.priority || "Medium"} priority
        </span>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-medium text-slate-600">Project progress</span>
          <span className="font-semibold tabular-nums text-slate-900">
            {progress}%
          </span>
        </div>
        <div
          className="h-2 overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-label={`${project.name} progress`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div
            className="h-full rounded-full bg-indigo-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
          <CheckCircle2 size={14} />
          <span>
            {project.tasksCompleted || 0} of {project.totalTasks || 0} tasks
            completed
          </span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <div className="flex min-w-0 items-center">
          <Users size={15} className="mr-2 shrink-0 text-slate-400" />
          <div className="flex -space-x-2">
            {team.slice(0, 3).map((member, index) => (
              <div
                key={`${member.name}-${index}`}
                title={member.name}
                className={`flex size-7 items-center justify-center rounded-full border-2 border-white text-[10px] font-semibold text-white ${
                  member.color || "bg-indigo-500"
                }`}
              >
                {member.initials ||
                  member.name?.slice(0, 2).toUpperCase() ||
                  "TM"}
              </div>
            ))}
            {team.length > 3 && (
              <span className="flex size-7 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[10px] font-semibold text-slate-600">
                +{team.length - 3}
              </span>
            )}
          </div>
          {team.length === 0 && (
            <span className="text-xs text-slate-400">No team members</span>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 text-xs text-slate-500">
          <CalendarDays size={14} />
          <span>{formatDate(project.dueDate)}</span>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
