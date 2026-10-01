import { useMemo, useState } from "react";
import {
  Activity,
  CheckCircle2,
  Circle,
  ClipboardList,
  LayoutGrid,
  List,
  Plus,
  Search,
} from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import TaskBoard from "../components/tasks/TaskBoard";
import TaskList from "../components/tasks/TaskList";
import { useProjects } from "../context/ProjectsContext";
import { useTasks } from "../context/TasksContext";

const statusFilters = ["All tasks", "Todo", "In Progress", "Done"];

function SummaryCard({ label, value, icon: Icon, iconClass, iconBg }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-500 sm:text-sm">
            {label}
          </p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {value}
          </p>
        </div>
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-xl sm:size-12 ${iconBg}`}
        >
          <Icon size={21} className={iconClass} />
        </div>
      </div>
    </div>
  );
}

function Tasks() {
  const { tasks } = useTasks();
  const { projects = [] } = useProjects();

  const [view, setView] = useState("board");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All tasks");

  const stats = useMemo(
    () => ({
      total: tasks.length,
      todo: tasks.filter((task) => task.status === "Todo").length,
      inProgress: tasks.filter((task) => task.status === "In Progress").length,
      done: tasks.filter((task) => task.status === "Done").length,
    }),
    [tasks],
  );

  const filteredTasks = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return tasks.filter((task) => {
      const project = projects.find(
        (item) => String(item.id) === String(task.projectId),
      );
      const projectName = project?.name ?? project?.title ?? "";

      const matchesSearch =
        !searchTerm ||
        task.title?.toLowerCase().includes(searchTerm) ||
        task.description?.toLowerCase().includes(searchTerm) ||
        task.assignee?.toLowerCase().includes(searchTerm) ||
        projectName.toLowerCase().includes(searchTerm);

      const matchesStatus =
        statusFilter === "All tasks" || task.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [tasks, projects, search, statusFilter]);

  return (
    <AppLayout>
      <main className="min-w-0 space-y-6 pb-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">
              <ClipboardList size={14} />
              Workspace
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Tasks
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Organize your work and keep every project moving forward.
            </p>
          </div>

          <button
            type="button"
            disabled
            title="Task creation will be enabled in the next feature"
            className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white opacity-70 shadow-sm"
          >
            <Plus size={17} />
            New task
          </button>
        </div>

        <section
          aria-label="Task statistics"
          className="grid grid-cols-2 gap-3 xl:grid-cols-4"
        >
          <SummaryCard
            label="Total tasks"
            value={stats.total}
            icon={ClipboardList}
            iconClass="text-indigo-600"
            iconBg="bg-indigo-50"
          />
          <SummaryCard
            label="To do"
            value={stats.todo}
            icon={Circle}
            iconClass="text-slate-500"
            iconBg="bg-slate-100"
          />
          <SummaryCard
            label="In progress"
            value={stats.inProgress}
            icon={Activity}
            iconClass="text-amber-600"
            iconBg="bg-amber-50"
          />
          <SummaryCard
            label="Completed"
            value={stats.done}
            icon={CheckCircle2}
            iconClass="text-emerald-600"
            iconBg="bg-emerald-50"
          />
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-4">
            <div className="relative min-w-0 flex-1 sm:max-w-sm">
              <Search
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search tasks, projects, assignees..."
                aria-label="Search tasks"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
              <div className="flex flex-wrap items-center gap-1 rounded-xl bg-slate-100 p-1">
                {statusFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setStatusFilter(filter)}
                    aria-pressed={statusFilter === filter}
                    className={`rounded-lg px-2.5 py-2 text-xs font-semibold transition sm:px-3 ${
                      statusFilter === filter
                        ? "bg-white text-indigo-700 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div
                className="flex items-center gap-1 rounded-xl border border-slate-200 p-1"
                aria-label="Task view"
              >
                <button
                  type="button"
                  onClick={() => setView("board")}
                  aria-label="Board view"
                  aria-pressed={view === "board"}
                  title="Board view"
                  className={`rounded-lg p-2 transition ${
                    view === "board"
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-400 hover:bg-slate-50 hover:text-slate-700"
                  }`}
                >
                  <LayoutGrid size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => setView("list")}
                  aria-label="List view"
                  aria-pressed={view === "list"}
                  title="List view"
                  className={`rounded-lg p-2 transition ${
                    view === "list"
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-400 hover:bg-slate-50 hover:text-slate-700"
                  }`}
                >
                  <List size={17} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-slate-700">
              {view === "board" ? "Task board" : "All tasks"}
            </h2>
            <p className="text-xs text-slate-500">
              {filteredTasks.length}{" "}
              {filteredTasks.length === 1 ? "task" : "tasks"} shown
            </p>
          </div>

          {view === "board" ? (
            <TaskBoard tasks={filteredTasks} projects={projects} />
          ) : (
            <TaskList tasks={filteredTasks} projects={projects} />
          )}
        </section>
      </main>
    </AppLayout>
  );
}

export default Tasks;
