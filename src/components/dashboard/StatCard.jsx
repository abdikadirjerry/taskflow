import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  FolderKanban,
  ListTodo,
  Users,
} from "lucide-react";

const icons = {
  projects: FolderKanban,
  tasks: ListTodo,
  team: Users,
  completed: CheckCircle2,
};

const styles = {
  indigo: {
    icon: "bg-indigo-50 text-indigo-600",
    badge: "bg-indigo-50 text-indigo-700",
  },
  amber: {
    icon: "bg-amber-50 text-amber-600",
    badge: "bg-amber-50 text-amber-700",
  },
  violet: {
    icon: "bg-violet-50 text-violet-600",
    badge: "bg-violet-50 text-violet-700",
  },
  emerald: {
    icon: "bg-emerald-50 text-emerald-600",
    badge: "bg-emerald-50 text-emerald-700",
  },
};

function StatCard({ stat }) {
  const Icon = icons[stat.icon] ?? FolderKanban;
  const style = styles[stat.color] ?? styles.indigo;

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">{stat.title}</p>

          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {stat.value.toLocaleString()}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${style.icon}`}
        >
          <Icon size={21} strokeWidth={2} />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        {stat.trend === "up" && (
          <ArrowUpRight size={15} className="text-emerald-600" />
        )}

        {stat.trend === "down" && (
          <ArrowDownRight size={15} className="text-red-600" />
        )}

        <span
          className={`text-xs font-semibold ${
            stat.trend === "down" ? "text-red-600" : "text-slate-600"
          }`}
        >
          {stat.change}
        </span>
      </div>
    </article>
  );
}

export default StatCard;
