function ProjectPerformance({ projects, tasks }) {
  const performance = projects
    .map((project) => {
      const projectTasks = tasks.filter(
        (task) => task.projectId === project.id,
      );

      const completed = projectTasks.filter(
        (task) => task.status === "Done",
      ).length;

      const total = projectTasks.length;

      const completionRate =
        total > 0 ? Math.round((completed / total) * 100) : 0;

      return {
        ...project,
        total,
        completed,
        completionRate,
      };
    })
    .sort((a, b) => b.completionRate - a.completionRate);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Project Performance
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Completion progress across your projects.
        </p>
      </div>

      {performance.length > 0 ? (
        <div className="space-y-5">
          {performance.map((project) => (
            <div key={project.id}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {project.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    {project.completed} of {project.total} tasks completed
                  </p>
                </div>

                <span className="shrink-0 text-sm font-semibold text-slate-700">
                  {project.completionRate}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-indigo-500 transition-all"
                  style={{
                    width: `${project.completionRate}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-h-40 items-center justify-center text-sm text-slate-500">
          No projects available yet.
        </div>
      )}
    </div>
  );
}

export default ProjectPerformance;
