import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  CircleDashed,
  Clock3,
  FolderKanban,
  Flag,
  Users,
} from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import { useProjects } from "../context/ProjectsContext";

const statusStyles = {
  "In Progress": "bg-blue-50 text-blue-700",
  Planning: "bg-violet-50 text-violet-700",
  Completed: "bg-emerald-50 text-emerald-700",
  "On Hold": "bg-amber-50 text-amber-700",
};

const priorityStyles = {
  High: "bg-rose-50 text-rose-700",
  Medium: "bg-amber-50 text-amber-700",
  Low: "bg-slate-100 text-slate-600",
};

function formatDate(dateString) {
  if (!dateString) return "No due date";

  const date = new Date(`${dateString}T00:00:00`);

  if (Number.isNaN(date.getTime())) return "No due date";

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function DetailCard({
  icon: Icon,
  label,
  value,
  iconClass = "bg-indigo-50 text-indigo-600",
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span
          className={`flex size-10 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={19} />
        </span>
        <div>
          <p className="text-xs font-medium text-slate-500">{label}</p>
          <p className="mt-1 font-semibold text-slate-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

function ProjectDetails() {
  const { projectId } = useParams();
  const { getProjectById } = useProjects();
  const project = getProjectById(projectId);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const progress = Math.min(100, Math.max(0, Number(project.progress) || 0));
  const team = Array.isArray(project.team) ? project.team : [];
  const totalTasks = Number(project.totalTasks) || 0;
  const completedTasks = Number(project.tasksCompleted) || 0;
  const remainingTasks = Math.max(0, totalTasks - completedTasks);

  return (
    <AppLayout pageTitle="Project Details">
      <div className="mx-auto max-w-6xl space-y-6">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
        >
          <ArrowLeft size={17} />
          Back to projects
        </Link>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-lg font-bold text-indigo-700">
                {(project.name || "P").slice(0, 2).toUpperCase()}
              </div>

              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    {project.category || "General"}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      statusStyles[project.status] ||
                      "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {project.status || "Planning"}
                  </span>
                </div>

                <h1 className="break-words text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {project.name}
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
                  {project.description || "No project description provided."}
                </p>
              </div>
            </div>

            <span
              className={`inline-flex shrink-0 items-center gap-2 self-start rounded-xl px-3 py-2 text-sm font-semibold ${
                priorityStyles[project.priority] ||
                "bg-slate-100 text-slate-600"
              }`}
            >
              <Flag size={15} />
              {project.priority || "Medium"} priority
            </span>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <DetailCard
            icon={CalendarDays}
            label="Due date"
            value={formatDate(project.dueDate)}
            iconClass="bg-violet-50 text-violet-600"
          />
          <DetailCard
            icon={CheckCircle2}
            label="Completed tasks"
            value={`${completedTasks} tasks`}
            iconClass="bg-emerald-50 text-emerald-600"
          />
          <DetailCard
            icon={CircleDashed}
            label="Remaining tasks"
            value={`${remainingTasks} tasks`}
            iconClass="bg-sky-50 text-sky-600"
          />
          <DetailCard
            icon={Users}
            label="Team members"
            value={`${team.length} ${team.length === 1 ? "member" : "members"}`}
            iconClass="bg-amber-50 text-amber-600"
          />
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Project progress
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Overview of the project's current completion.
                </p>
              </div>
              <span className="text-2xl font-bold tabular-nums text-indigo-600">
                {progress}%
              </span>
            </div>

            <div
              className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100"
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

            <div className="mt-3 flex flex-wrap justify-between gap-2 text-xs text-slate-500">
              <span>
                {completedTasks} of {totalTasks} tasks completed
              </span>
              <span>{remainingTasks} tasks remaining</span>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  Completed
                </div>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {completedTasks}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <Clock3 size={16} className="text-sky-600" />
                  Remaining
                </div>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {remainingTasks}
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-indigo-600" />
              <h2 className="font-semibold text-slate-900">Project team</h2>
            </div>

            {team.length > 0 ? (
              <ul className="mt-5 space-y-4">
                {team.map((member, index) => (
                  <li
                    key={`${member.name || "member"}-${index}`}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={`flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                        member.color || "bg-indigo-500"
                      }`}
                    >
                      {member.initials ||
                        member.name?.slice(0, 2).toUpperCase() ||
                        "TM"}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-800">
                        {member.name || "Team member"}
                      </p>
                      <p className="text-xs text-slate-500">Project member</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-500">
                No team members have been assigned to this project yet.
              </div>
            )}
          </aside>
        </section>

        <div className="flex items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50 p-4 text-sm text-indigo-800">
          <FolderKanban size={18} className="shrink-0" />
          <p>
            This page displays the project's current saved information.
            Task-level management and team assignment workflows can be added in
            later parts.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}

export default ProjectDetails;
