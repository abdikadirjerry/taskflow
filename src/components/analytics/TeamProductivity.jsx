import { Users } from "lucide-react";

function TeamProductivity({ tasks, teamMembers }) {
  const productivity = teamMembers
    .map((member) => {
      const memberTasks = tasks.filter(
        (task) =>
          task.assignee === member.name || task.assignee?.id === member.id,
      );

      const completed = memberTasks.filter(
        (task) => task.status === "Done",
      ).length;

      const total = memberTasks.length;

      const completionRate =
        total > 0 ? Math.round((completed / total) * 100) : 0;

      return {
        ...member,
        total,
        completed,
        completionRate,
      };
    })
    .filter((member) => member.total > 0)
    .sort((a, b) => b.completed - a.completed);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Users size={20} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Team Productivity
          </h2>

          <p className="text-sm text-slate-500">
            Task completion by team member.
          </p>
        </div>
      </div>

      {productivity.length > 0 ? (
        <div className="space-y-5">
          {productivity.map((member) => (
            <div key={member.id}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {member.name}
                  </p>

                  <p className="text-xs text-slate-500">
                    {member.completed} of {member.total} tasks completed
                  </p>
                </div>

                <span className="text-sm font-semibold text-slate-700">
                  {member.completionRate}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-indigo-500 transition-all"
                  style={{
                    width: `${member.completionRate}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-h-40 items-center justify-center text-sm text-slate-500">
          No assigned tasks available yet.
        </div>
      )}
    </div>
  );
}

export default TeamProductivity;
