import { useMemo, useState } from "react";
import {
  FolderKanban,
  Plus,
  Search,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectForm from "../components/projects/ProjectForm";
import DeleteProjectModal from "../components/projects/DeleteProjectModal";
import { useProjects } from "../context/ProjectsContext";

const filters = ["All", "In Progress", "Planning", "Completed", "On Hold"];

function Projects() {
  const { projects, addProject, updateProject, deleteProject } = useProjects();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deletingProject, setDeletingProject] = useState(null);

  const projectList = Array.isArray(projects) ? projects : [];

  const filteredProjects = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return projectList
      .filter((project) => {
        const matchesSearch =
          !normalizedSearch ||
          [project.name, project.description, project.category]
            .filter(Boolean)
            .some((value) => value.toLowerCase().includes(normalizedSearch));

        const matchesStatus =
          activeFilter === "All" || project.status === activeFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "progress") {
          return (Number(b.progress) || 0) - (Number(a.progress) || 0);
        }

        if (sortBy === "dueDate") {
          return (a.dueDate || "9999-12-31").localeCompare(
            b.dueDate || "9999-12-31",
          );
        }

        return (a.name || "").localeCompare(b.name || "");
      });
  }, [projectList, searchTerm, activeFilter, sortBy]);

  const activeCount = projectList.filter(
    (project) => project.status === "In Progress",
  ).length;

  const completedCount = projectList.filter(
    (project) => project.status === "Completed",
  ).length;

  const totalProgress = projectList.length
    ? Math.round(
        projectList.reduce(
          (sum, project) => sum + (Number(project.progress) || 0),
          0,
        ) / projectList.length,
      )
    : 0;

  function openCreateForm() {
    setEditingProject(null);
    setIsFormOpen(true);
  }

  function openEditForm(project) {
    setEditingProject(project);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingProject(null);
  }

  function handleProjectSubmit(projectData) {
    if (editingProject) {
      updateProject(editingProject.id, projectData);
    } else {
      addProject(projectData);
    }

    closeForm();
  }

  function openDeleteConfirmation(project) {
    setDeletingProject(project);
  }

  function closeDeleteConfirmation() {
    setDeletingProject(null);
  }

  function confirmDeleteProject() {
    if (!deletingProject) return;

    deleteProject(deletingProject.id);
    closeDeleteConfirmation();
  }

  return (
    <AppLayout pageTitle="Projects">
      <div className="space-y-6">
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-slate-500">
              Organize work, track progress, and collaborate with your team.
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              Projects
            </h1>
          </div>

          <button
            type="button"
            onClick={openCreateForm}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
          >
            <Plus size={17} />
            New project
          </button>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                Total projects
              </span>
              <span className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600">
                <FolderKanban size={19} />
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              {projectList.length}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Projects in your workspace
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                In progress
              </span>
              <span className="rounded-xl bg-sky-50 p-2.5 text-sky-600">
                <TrendingUp size={19} />
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              {activeCount}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Projects currently underway
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2 xl:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">
                Average progress
              </span>
              <span className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                <SlidersHorizontal size={19} />
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
              {totalProgress}%
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {completedCount} completed
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <Search
                size={17}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search projects..."
                aria-label="Search projects"
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-500">
              <span className="shrink-0">Sort by</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              >
                <option value="name">Name</option>
                <option value="progress">Progress</option>
                <option value="dueDate">Due date</option>
              </select>
            </label>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeFilter === filter
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:text-indigo-600"
                }`}
              >
                {filter}
                {filter === "All" && (
                  <span className="ml-2 opacity-75">{projectList.length}</span>
                )}
              </button>
            ))}
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={openEditForm}
                  onDelete={openDeleteConfirmation}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <FolderKanban size={22} />
              </div>
              <h2 className="mt-4 font-semibold text-slate-900">
                No projects found
              </h2>
              <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                Try another search or select a different status filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("All");
                }}
                className="mt-4 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>

      {isFormOpen && (
        <ProjectForm
          project={editingProject}
          onSubmit={handleProjectSubmit}
          onClose={closeForm}
        />
      )}

      {deletingProject && (
        <DeleteProjectModal
          project={deletingProject}
          onConfirm={confirmDeleteProject}
          onClose={closeDeleteConfirmation}
        />
      )}
    </AppLayout>
  );
}

export default Projects;
