import { useMemo, useState } from "react";
import {
  Activity,
  CheckCircle2,
  ChevronDown,
  Circle,
  ClipboardList,
  Filter,
  LayoutGrid,
  List,
  Plus,
  RotateCcw,
  Search,
} from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import DeleteTaskModal from "../components/tasks/DeleteTaskModal";
import TaskBoard from "../components/tasks/TaskBoard";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import { useProjects } from "../context/ProjectsContext";
import { useTasks } from "../context/TasksContext";

const statusFilters = ["All tasks", "Todo", "In Progress", "Done"];

const priorityOptions = ["All priorities", "High", "Medium", "Low"];

const sortOptions = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "dueSoon", label: "Due date: soonest" },
  { value: "dueLate", label: "Due date: latest" },
  { value: "priority", label: "Priority: high to low" },
];

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
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const { projects = [] } = useProjects();

  const [view, setView] = useState("board");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All tasks");
  const [priorityFilter, setPriorityFilter] = useState("All priorities");
  const [projectFilter, setProjectFilter] = useState("All projects");
  const [sortBy, setSortBy] = useState("newest");

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

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

    const priorityOrder = {
      High: 3,
      Medium: 2,
      Low: 1,
    };

    const getProjectName = (projectId) => {
      const project = projects.find(
        (item) => String(item.id) === String(projectId),
      );

      return project?.name ?? project?.title ?? "";
    };

    const getDateValue = (dateString) => {
      if (!dateString) return Number.MAX_SAFE_INTEGER;

      const value = new Date(`${dateString}T00:00:00`).getTime();

      return Number.isNaN(value) ? Number.MAX_SAFE_INTEGER : value;
    };

    const filtered = tasks.filter((task) => {
      const projectName = getProjectName(task.projectId);

      const matchesSearch =
        !searchTerm ||
        task.title?.toLowerCase().includes(searchTerm) ||
        task.description?.toLowerCase().includes(searchTerm) ||
        task.assignee?.toLowerCase().includes(searchTerm) ||
        projectName.toLowerCase().includes(searchTerm);

      const matchesStatus =
        statusFilter === "All tasks" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All priorities" || task.priority === priorityFilter;

      const matchesProject =
        projectFilter === "All projects" ||
        String(task.projectId) === String(projectFilter);

      return (
        matchesSearch && matchesStatus && matchesPriority && matchesProject
      );
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "oldest") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }

      if (sortBy === "dueSoon") {
        return getDateValue(a.dueDate) - getDateValue(b.dueDate);
      }

      if (sortBy === "dueLate") {
        return getDateValue(b.dueDate) - getDateValue(a.dueDate);
      }

      if (sortBy === "priority") {
        return (
          (priorityOrder[b.priority] ?? 0) - (priorityOrder[a.priority] ?? 0)
        );
      }

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [
    tasks,
    projects,
    search,
    statusFilter,
    priorityFilter,
    projectFilter,
    sortBy,
  ]);

  const activeFilterCount = [
    priorityFilter !== "All priorities",
    projectFilter !== "All projects",
  ].filter(Boolean).length;

  const hasAdvancedFilters = activeFilterCount > 0;

  const openCreateForm = () => {
    setSelectedTask(null);
    setIsFormOpen(true);
  };

  const openEditForm = (task) => {
    setSelectedTask(task);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setSelectedTask(null);
  };

  const handleSubmit = (taskData) => {
    if (selectedTask) {
      updateTask(selectedTask.id, taskData);
    } else {
      addTask(taskData);
    }

    closeForm();
  };

  const handleStatusChange = (taskId, status) => {
    updateTask(taskId, { status });
  };

  const handleDelete = (taskId) => {
    deleteTask(taskId);
    setTaskToDelete(null);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All tasks");
    setPriorityFilter("All priorities");
    setProjectFilter("All projects");
    setSortBy("newest");
  };

  return (
    <AppLayout>
      <main className="min-w-0 space-y-6 pb-8">
        {/* Page header */}
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
            onClick={openCreateForm}
            disabled={projects.length === 0}
            title={
              projects.length === 0
                ? "Create a project before adding tasks"
                : "Create a new task"
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={17} />
            New task
          </button>
        </div>

        {projects.length === 0 && (
          <div
            role="status"
            className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
          >
            Create a project before adding tasks.
          </div>
        )}

        {/* Statistics */}
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

        {/* Task controls */}
        <section className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              {/* Search */}
              <div className="relative min-w-0 flex-1 xl:max-w-md">
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

              <div className="flex flex-wrap items-center gap-2">
                {/* Status filters */}
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

                {/* Advanced filters */}
                <button
                  type="button"
                  onClick={() => setIsFiltersOpen((open) => !open)}
                  aria-expanded={isFiltersOpen}
                  className={`relative inline-flex items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                    isFiltersOpen || hasAdvancedFilters
                      ? "border-indigo-200 bg-indigo-50 text-indigo-700"
                      : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Filter size={15} />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="flex size-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] text-white">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                {/* View switch */}
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

            {/* Advanced filter panel */}
            {isFiltersOpen && (
              <div className="mt-4 border-t border-slate-100 pt-4">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Priority */}
                  <div>
                    <label
                      htmlFor="priority-filter"
                      className="mb-1.5 block text-xs font-semibold text-slate-600"
                    >
                      Priority
                    </label>

                    <div className="relative">
                      <select
                        id="priority-filter"
                        value={priorityFilter}
                        onChange={(event) =>
                          setPriorityFilter(event.target.value)
                        }
                        className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-9 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                      >
                        {priorityOptions.map((priority) => (
                          <option key={priority} value={priority}>
                            {priority}
                          </option>
                        ))}
                      </select>

                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Project */}
                  <div>
                    <label
                      htmlFor="project-filter"
                      className="mb-1.5 block text-xs font-semibold text-slate-600"
                    >
                      Project
                    </label>

                    <div className="relative">
                      <select
                        id="project-filter"
                        value={projectFilter}
                        onChange={(event) =>
                          setProjectFilter(event.target.value)
                        }
                        className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-9 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                      >
                        <option value="All projects">All projects</option>

                        {projects.map((project) => (
                          <option key={project.id} value={String(project.id)}>
                            {project.name ??
                              project.title ??
                              "Untitled project"}
                          </option>
                        ))}
                      </select>

                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Sort */}
                  <div>
                    <label
                      htmlFor="task-sort"
                      className="mb-1.5 block text-xs font-semibold text-slate-600"
                    >
                      Sort by
                    </label>

                    <div className="relative">
                      <select
                        id="task-sort"
                        value={sortBy}
                        onChange={(event) => setSortBy(event.target.value)}
                        className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-9 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                      >
                        {sortOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>

                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                  >
                    <RotateCcw size={13} />
                    Clear all filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Result summary */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-700">
                {view === "board" ? "Task board" : "All tasks"}
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Showing {filteredTasks.length} of {tasks.length}{" "}
                {tasks.length === 1 ? "task" : "tasks"}
              </p>
            </div>

            {(search ||
              statusFilter !== "All tasks" ||
              priorityFilter !== "All priorities" ||
              projectFilter !== "All projects" ||
              sortBy !== "newest") && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Reset view
              </button>
            )}
          </div>

          {/* Tasks */}
          {view === "board" ? (
            <TaskBoard
              tasks={filteredTasks}
              projects={projects}
              onEdit={openEditForm}
              onStatusChange={handleStatusChange}
              onDelete={setTaskToDelete}
            />
          ) : (
            <TaskList
              tasks={filteredTasks}
              projects={projects}
              onEdit={openEditForm}
              onStatusChange={handleStatusChange}
              onDelete={setTaskToDelete}
            />
          )}
        </section>

        {/* Create / edit modal */}
        {isFormOpen && (
          <TaskForm
            task={selectedTask}
            projects={projects}
            onSubmit={handleSubmit}
            onClose={closeForm}
          />
        )}

        {/* Delete modal */}
        {taskToDelete && (
          <DeleteTaskModal
            task={taskToDelete}
            onConfirm={handleDelete}
            onCancel={() => setTaskToDelete(null)}
          />
        )}
      </main>
    </AppLayout>
  );
}

export default Tasks;
