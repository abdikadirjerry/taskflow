import { useEffect, useState } from "react";
import { CalendarDays, X } from "lucide-react";
import { taskPriorities, taskStatuses } from "../../data/tasksData";

const emptyForm = {
  title: "",
  description: "",
  projectId: "",
  status: "Todo",
  priority: "Medium",
  dueDate: "",
  assignee: "",
};

function TaskForm({ task, projects, onSubmit, onClose }) {
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState("");

  const isEditing = Boolean(task);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title ?? "",
        description: task.description ?? "",
        projectId: task.projectId ? String(task.projectId) : "",
        status: task.status ?? "Todo",
        priority: task.priority ?? "Medium",
        dueDate: task.dueDate ?? "",
        assignee: task.assignee ?? "",
      });
    } else {
      setFormData(emptyForm);
    }

    setError("");
  }, [task]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const title = formData.title.trim();

    if (!title) {
      setError("Please enter a task title.");
      return;
    }

    if (!formData.projectId) {
      setError("Please select a project.");
      return;
    }

    onSubmit({
      ...formData,
      title,
      description: formData.description.trim(),
      assignee: formData.assignee.trim(),
    });
  };

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50";

  const labelClass = "block text-sm font-medium text-slate-700";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-6">
          <div>
            <h2
              id="task-form-title"
              className="text-lg font-bold text-slate-900"
            >
              {isEditing ? "Edit task" : "Create a new task"}
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              {isEditing
                ? "Update the task details below."
                : "Add a task and assign it to a project."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close task form"
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
            >
              {error}
            </div>
          )}

          <div>
            <label className={labelClass} htmlFor="task-title">
              Task title <span className="text-rose-500">*</span>
            </label>
            <input
              id="task-title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Design the dashboard"
              maxLength={120}
              required
              autoFocus
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="task-description">
              Description
            </label>
            <textarea
              id="task-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what needs to be done..."
              rows={4}
              maxLength={1000}
              className={`${inputClass} resize-y`}
            />
            <p className="mt-1 text-right text-xs text-slate-400">
              {formData.description.length}/1000
            </p>
          </div>

          <div>
            <label className={labelClass} htmlFor="task-project">
              Project <span className="text-rose-500">*</span>
            </label>
            <select
              id="task-project"
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              required
              className={inputClass}
            >
              <option value="">Select a project</option>
              {projects.map((project) => (
                <option key={project.id} value={String(project.id)}>
                  {project.name ?? project.title ?? "Untitled project"}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="task-status">
                Status
              </label>
              <select
                id="task-status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={inputClass}
              >
                {taskStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="task-priority">
                Priority
              </label>
              <select
                id="task-priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className={inputClass}
              >
                {taskPriorities.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass} htmlFor="task-due-date">
                Due date
              </label>
              <div className="relative">
                <CalendarDays
                  size={16}
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  id="task-due-date"
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="task-assignee">
                Assignee
              </label>
              <input
                id="task-assignee"
                name="assignee"
                value={formData.assignee}
                onChange={handleChange}
                placeholder="e.g. Alex Morgan"
                maxLength={80}
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100"
            >
              {isEditing ? "Save changes" : "Create task"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default TaskForm;
