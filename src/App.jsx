import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  FolderKanban,
  ListTodo,
  Plus,
  Users,
} from "lucide-react";
import AppLayout from "./components/layout/AppLayout";
import Button from "./components/ui/Button";
import PageHeader from "./components/ui/PageHeader";

const overviewCards = [
  {
    title: "Total Projects",
    value: "12",
    change: "+2 this month",
    icon: FolderKanban,
    iconStyle: "bg-indigo-50 text-indigo-600",
  },
  {
    title: "Active Tasks",
    value: "24",
    change: "8 due this week",
    icon: ListTodo,
    iconStyle: "bg-amber-50 text-amber-600",
  },
  {
    title: "Team Members",
    value: "8",
    change: "Across 3 teams",
    icon: Users,
    iconStyle: "bg-violet-50 text-violet-600",
  },
  {
    title: "Completed Tasks",
    value: "36",
    change: "+12 this month",
    icon: CheckCircle2,
    iconStyle: "bg-emerald-50 text-emerald-600",
  },
];

function App() {
  return (
    <AppLayout pageTitle="Dashboard">
      <div className="space-y-8">
        <PageHeader
          eyebrow="Thursday, October 1"
          title="Good evening, Abdi 👋"
          description="Here's what's happening with your projects today."
          action={<Button icon={Plus}>Create project</Button>}
        />

        <section
          aria-label="Workspace overview"
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {overviewCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {card.title}
                    </p>
                    <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                      {card.value}
                    </p>
                  </div>

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconStyle}`}
                  >
                    <Icon size={21} />
                  </div>
                </div>

                <p className="mt-4 text-xs font-medium text-slate-500">
                  {card.change}
                </p>
              </article>
            );
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Recent Projects
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Keep track of your team's latest work.
                </p>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                View all
                <ArrowUpRight size={15} />
              </button>
            </div>

            <div className="mt-6 flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/70 px-5 py-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <FolderKanban size={23} />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-800">
                Your projects will appear here
              </h3>

              <p className="mt-1 max-w-xs text-sm leading-6 text-slate-500">
                Create your first project to start organizing your team's work.
              </p>

              <Button
                variant="secondary"
                size="sm"
                icon={Plus}
                className="mt-4"
              >
                New project
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  Upcoming Tasks
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Stay on top of your deadlines.
                </p>
              </div>

              <CalendarDays size={20} className="text-slate-400" />
            </div>

            <div className="mt-6 flex min-h-48 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/70 px-5 py-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <ListTodo size={23} />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-800">
                No upcoming tasks yet
              </h3>

              <p className="mt-1 max-w-xs text-sm leading-6 text-slate-500">
                Your assigned tasks and deadlines will show up here.
              </p>
            </div>
          </div>
        </section>

        <footer className="border-t border-slate-200 py-5">
          <p className="text-center text-xs text-slate-400">
            TaskFlow · Organize work. Achieve more.
          </p>
        </footer>
      </div>
    </AppLayout>
  );
}

export default App;
