import { AlertTriangle, X } from "lucide-react";

function DeleteMemberModal({ member, onConfirm, onCancel }) {
  if (!member) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-start justify-between p-5">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
              <AlertTriangle size={19} />
            </div>

            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Remove team member?
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                You are about to remove{" "}
                <span className="font-semibold text-slate-700">
                  {member.name}
                </span>{" "}
                from this workspace.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="flex size-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close modal"
          >
            <X size={17} />
          </button>
        </div>

        <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-4">
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onConfirm}
              className="rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-rose-700"
            >
              Remove member
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteMemberModal;
