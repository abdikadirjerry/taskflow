import {
  ArrowRight,
  CheckCircle2,
  FilePlus2,
  UserPlus,
  RefreshCw,
} from "lucide-react";

const activityIcons = {
  completed: CheckCircle2,
  created: FilePlus2,
  joined: UserPlus,
  updated: RefreshCw,
};

function ActivityFeed({ activities }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Recent Activity
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            The latest updates from your team.
          </p>
        </div>

        <button
          type="button"
          aria-label="View all activity"
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-indigo-600"
        >
          <ArrowRight size={18} />
        </button>
      </div>

      <div className="mt-6">
        {activities.map((activity, index) => {
          const Icon = activityIcons[activity.type] ?? RefreshCw;

          return (
            <div
              key={activity.id}
              className="relative flex gap-3 pb-6 last:pb-0"
            >
              {index !== activities.length - 1 && (
                <div className="absolute bottom-0 left-4 top-9 w-px bg-slate-100" />
              )}

              <div
                className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${activity.color}`}
                aria-label={activity.name}
              >
                {activity.initials}
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <p className="text-sm leading-6 text-slate-600">
                  <span className="font-semibold text-slate-800">
                    {activity.name}
                  </span>{" "}
                  {activity.action}{" "}
                  <span className="font-semibold text-slate-800">
                    {activity.target}
                  </span>
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <Icon size={13} className="text-slate-400" />
                  <span className="text-xs text-slate-400">
                    {activity.time}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ActivityFeed;
