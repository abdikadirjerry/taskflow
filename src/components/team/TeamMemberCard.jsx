import { Mail, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700",
  Offline: "bg-slate-100 text-slate-600",
  Invited: "bg-amber-50 text-amber-700",
};

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function TeamMemberCard({ member, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <article className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="absolute right-4 top-4">
        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="flex size-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label={`Actions for ${member.name}`}
        >
          <MoreHorizontal size={18} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-11 z-20 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onEdit(member);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <Pencil size={14} />
              Edit member
            </button>

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onDelete(member);
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-medium text-rose-600 transition hover:bg-rose-50"
            >
              <Trash2 size={14} />
              Remove member
            </button>
          </div>
        )}
      </div>

      <div className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-sm font-bold text-indigo-700">
          {getInitials(member.name)}
        </div>

        <div className="min-w-0 pr-7">
          <h3 className="truncate text-sm font-bold text-slate-900">
            {member.name}
          </h3>

          <p className="mt-1 truncate text-xs text-slate-500">{member.role}</p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Mail size={14} className="shrink-0 text-slate-400" />
          <span className="truncate">{member.email}</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600">
            {member.department}
          </span>

          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
              statusStyles[member.status] ?? "bg-slate-100 text-slate-600"
            }`}
          >
            {member.status}
          </span>
        </div>
      </div>
    </article>
  );
}

export default TeamMemberCard;
