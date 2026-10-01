import { AlertTriangle, X } from "lucide-react";

function DeleteProjectModal({ project, onConfirm, onClose }) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/50 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-project-title"
        aria-describedby="delete-project-description"
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
            <AlertTriangle size={23} />
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close confirmation"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        <h2
          id="delete-project-title"
          className="mt-5 text-lg font-bold text-slate-900"
        >
          Delete this project?
        </h2>

        <p
          id="delete-project-description"
          className="mt-2 text-sm leading-6 text-slate-500"
        >
          Are you sure you want to delete{" "}
          <span className="font-semibold text-slate-800">{project.name}</span>?
          This action cannot be undone.
        </p>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-200"
          >
            Delete project
          </button>
        </div>
      </section>
    </div>
  );
}

export default DeleteProjectModal;
