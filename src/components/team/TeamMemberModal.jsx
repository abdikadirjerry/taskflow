import { useState } from "react";
import { X, UserPlus } from "lucide-react";

const roles = [
  "Product Manager",
  "UI/UX Designer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "QA Engineer",
  "DevOps Engineer",
  "Marketing Specialist",
  "Content Strategist",
];

const departments = [
  "Product",
  "Design",
  "Engineering",
  "Marketing",
  "Sales",
  "Operations",
];

const statuses = ["Active", "Offline", "Invited"];

function getInitialForm(member) {
  return {
    name: member?.name ?? "",
    email: member?.email ?? "",
    role: member?.role ?? "Frontend Developer",
    department: member?.department ?? "Engineering",
    status: member?.status ?? "Active",
  };
}

function TeamMemberModal({ member, onSubmit, onClose }) {
  const [form, setForm] = useState(getInitialForm(member));

  const [error, setError] = useState("");

  const isEditing = Boolean(member);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim()) {
      setError("Please enter the member's name.");
      return;
    }

    if (!form.email.trim()) {
      setError("Please enter an email address.");
      return;
    }

    if (!form.email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    onSubmit({
      ...form,
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <UserPlus size={18} />
            </div>

            <div>
              <h2 className="text-sm font-bold text-slate-900">
                {isEditing ? "Edit team member" : "Invite team member"}
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                {isEditing
                  ? "Update member information."
                  : "Add a new person to your workspace."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 p-5">
            {error && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-xs font-medium text-rose-700">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="member-name"
                className="mb-1.5 block text-xs font-semibold text-slate-700"
              >
                Full name
              </label>

              <input
                id="member-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. John Smith"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            <div>
              <label
                htmlFor="member-email"
                className="mb-1.5 block text-xs font-semibold text-slate-700"
              >
                Email address
              </label>

              <input
                id="member-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="member-role"
                  className="mb-1.5 block text-xs font-semibold text-slate-700"
                >
                  Role
                </label>

                <select
                  id="member-role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="member-department"
                  className="mb-1.5 block text-xs font-semibold text-slate-700"
                >
                  Department
                </label>

                <select
                  id="member-department"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                >
                  {departments.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="member-status"
                className="mb-1.5 block text-xs font-semibold text-slate-700"
              >
                Status
              </label>

              <select
                id="member-status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              {isEditing ? "Save changes" : "Add member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TeamMemberModal;
