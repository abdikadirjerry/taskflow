import { ArrowRight, CalendarDays, CheckCircle2 } from "lucide-react";

function ProjectProgress({ projects }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Project Progress
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Track the progress of your active projects.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
        >
          View all
          <ArrowRight size={15} />
        </button>
      </div>

      <div className="mt-6 space-y-6">
        {projects.map((project) => (
          <article key={project.id}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-slate-800">
                  {project.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {project.category}
                </p>
              </div>

              <span className="shrink-0 text-sm font-bold text-slate-800">
                {project.progress}%
              </span>
            </div>

            <div
              className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"
              role="progressbar"
              aria-label={`${project.name} progress`}
              aria-valuenow={project.progress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className={`h-full rounded-full transition-all duration-500 ${project.color}`}
                style={{ width: `${project.progress}%` }}
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={14} />
                {project.completedTasks}/{project.totalTasks} tasks completed
              </span>

              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={14} />
                {new Date(`${project.dueDate}T12:00:00`).toLocaleDateString(
                  "en-US",
                  { month: "short", day: "numeric" },
                )}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default ProjectProgress;
