import { useEffect, useState } from "react";
import { X } from "lucide-react";

const categories = ["Design", "Development", "Marketing", "Research", "Other"];
const statuses = ["Planning", "In Progress", "Completed", "On Hold"];
const priorities = ["Low", "Medium", "High"];

const emptyForm = {
  name: "",
  description: "",
  category: "Development",
  status: "Planning",
  priority: "Medium",
  progress: 0,
  dueDate: "",
  tasksCompleted: 0,
  totalTasks: 0,
  team: [],
};

function ProjectForm({ project, onSubmit, onClose }) {
  const isEditing = Boolean(project);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (project) {
      setForm({
        ...emptyForm,
        ...project,
        team: Array.isArray(project.team) ? project.team : [],
      });
    } else {
      setForm(emptyForm);
    }

    setErrors({});
  }, [project]);

  function updateField(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]:
        name === "progress" ||
        name === "tasksCompleted" ||
        name === "totalTasks"
          ? value
          : value,
    }));

    setErrors((current) => ({ ...current, [name]: "" }));
  }

  function validate() {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Project name is required.";
    } else if (form.name.trim().length < 3) {
      nextErrors.name = "Use at least 3 characters.";
    }

    if (!form.description.trim()) {
      nextErrors.description = "Project description is required.";
    }

    const progress = Number(form.progress);
    const completed = Number(form.tasksCompleted);
    const total = Number(form.totalTasks);

    if (!Number.isFinite(progress) || progress < 0 || progress > 100) {
      nextErrors.progress = "Progress must be between 0 and 100.";
    }

    if (
      !Number.isInteger(completed) ||
      completed < 0 ||
      !Number.isInteger(total) ||
      total < 0
    ) {
      nextErrors.tasks = "Task counts must be whole numbers of 0 or more.";
    } else if (completed > total) {
      nextErrors.tasks = "Completed tasks cannot exceed total tasks.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) return;

    onSubmit({
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      progress: Number(form.progress),
      tasksCompleted: Number(form.tasksCompleted),
      totalTasks: Number(form.totalTasks),
      team: Array.isArray(form.team) ? form.team : [],
    });
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100";

  const labelClass = "block text-sm font-medium text-slate-700";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-form-title"
        className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div>
            <h2
              id="project-form-title"
              className="text-lg font-bold text-slate-900"
            >
              {isEditing ? "Edit project" : "Create a project"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {isEditing
                ? "Update the project details below."
                : "Add the details to get your project started."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project form"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={19} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="overflow-y-auto">
          <div className="grid gap-4 px-5 py-5 sm:grid-cols-2 sm:px-6">
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="project-name">
                Project name
              </label>
              <input
                id="project-name"
                name="name"
                value={form.name}
                onChange={updateField}
                placeholder="e.g. Website Redesign"
                className={`${inputClass} ${
                  errors.name
                    ? "border-rose-400 focus:border-rose-400 focus:ring-rose-100"
                    : ""
                }`}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={
                  errors.name ? "project-name-error" : undefined
                }
              />
              {errors.name && (
                <p
                  id="project-name-error"
                  className="mt-1 text-xs text-rose-600"
                >
                  {errors.name}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="project-description">
                Description
              </label>
              <textarea
                id="project-description"
                name="description"
                value={form.description}
                onChange={updateField}
                rows={3}
                placeholder="What is this project about?"
                className={`${inputClass} resize-y ${
                  errors.description ? "border-rose-400" : ""
                }`}
                aria-invalid={Boolean(errors.description)}
              />
              {errors.description && (
                <p className="mt-1 text-xs text-rose-600">
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <label className={labelClass} htmlFor="project-category">
                Category
              </label>
              <select
                id="project-category"
                name="category"
                value={form.category}
                onChange={updateField}
                className={inputClass}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="project-status">
                Status
              </label>
              <select
                id="project-status"
                name="status"
                value={form.status}
                onChange={updateField}
                className={inputClass}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="project-priority">
                Priority
              </label>
              <select
                id="project-priority"
                name="priority"
                value={form.priority}
                onChange={updateField}
                className={inputClass}
              >
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="project-due-date">
                Due date
              </label>
              <input
                id="project-due-date"
                type="date"
                name="dueDate"
                value={form.dueDate || ""}
                onChange={updateField}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="project-progress">
                Progress (%)
              </label>
              <input
                id="project-progress"
                type="number"
                name="progress"
                min="0"
                max="100"
                value={form.progress}
                onChange={updateField}
                className={`${inputClass} ${
                  errors.progress ? "border-rose-400" : ""
                }`}
              />
              {errors.progress && (
                <p className="mt-1 text-xs text-rose-600">{errors.progress}</p>
              )}
            </div>

            <div>
              <label className={labelClass} htmlFor="project-total-tasks">
                Total tasks
              </label>
              <input
                id="project-total-tasks"
                type="number"
                name="totalTasks"
                min="0"
                step="1"
                value={form.totalTasks}
                onChange={updateField}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass} htmlFor="project-completed-tasks">
                Completed tasks
              </label>
              <input
                id="project-completed-tasks"
                type="number"
                name="tasksCompleted"
                min="0"
                step="1"
                value={form.tasksCompleted}
                onChange={updateField}
                className={`${inputClass} ${
                  errors.tasks ? "border-rose-400" : ""
                }`}
              />
              {errors.tasks && (
                <p className="mt-1 text-xs text-rose-600">{errors.tasks}</p>
              )}
            </div>
          </div>

          <footer className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
            >
              {isEditing ? "Save changes" : "Create project"}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}

export default ProjectForm;
