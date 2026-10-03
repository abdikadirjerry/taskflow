import {
  Search,
  SlidersHorizontal,
  UserPlus,
  Users,
  UserCheck,
  UserRoundX,
  Clock3,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import TeamMemberCard from "../components/team/TeamMemberCard";
import TeamMemberModal from "../components/team/TeamMemberModal";
import DeleteMemberModal from "../components/team/DeleteMemberModal";
import { useTeam } from "../context/TeamContext";

function Team() {
  const { members, addMember, updateMember, deleteMember } = useTeam();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const [memberToDelete, setMemberToDelete] = useState(null);

  const departments = useMemo(() => {
    return [
      "All",
      ...new Set(members.map((member) => member.department).filter(Boolean)),
    ];
  }, [members]);

  const filteredMembers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return members.filter((member) => {
      const matchesSearch =
        !normalizedSearch ||
        member.name.toLowerCase().includes(normalizedSearch) ||
        member.email.toLowerCase().includes(normalizedSearch) ||
        member.role.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "All" || member.status === statusFilter;

      const matchesDepartment =
        departmentFilter === "All" || member.department === departmentFilter;

      return matchesSearch && matchesStatus && matchesDepartment;
    });
  }, [members, searchTerm, statusFilter, departmentFilter]);

  const activeCount = members.filter(
    (member) => member.status === "Active",
  ).length;

  const invitedCount = members.filter(
    (member) => member.status === "Invited",
  ).length;

  const offlineCount = members.filter(
    (member) => member.status === "Offline",
  ).length;

  const openCreateModal = () => {
    setEditingMember(null);
    setShowModal(true);
  };

  const openEditModal = (member) => {
    setEditingMember(member);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingMember(null);
  };

  const handleSubmit = (memberData) => {
    if (editingMember) {
      updateMember(editingMember.id, memberData);
    } else {
      addMember(memberData);
    }

    closeModal();
  };

  const handleDelete = () => {
    if (!memberToDelete) {
      return;
    }

    deleteMember(memberToDelete.id);
    setMemberToDelete(null);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setDepartmentFilter("All");
  };

  const hasActiveFilters =
    searchTerm || statusFilter !== "All" || departmentFilter !== "All";

  return (
    <AppLayout>
      <main className="min-w-0 space-y-6 pb-8">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">
              Workspace people
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Team
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              Manage your workspace members, roles, departments, and
              availability.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            <UserPlus size={16} />
            Invite member
          </button>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex size-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Users size={18} />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Total
              </span>
            </div>

            <p className="mt-4 text-2xl font-bold text-slate-900">
              {members.length}
            </p>

            <p className="mt-1 text-xs text-slate-500">Workspace members</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <UserCheck size={18} />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-wide text-emerald-600">
                Active
              </span>
            </div>

            <p className="mt-4 text-2xl font-bold text-slate-900">
              {activeCount}
            </p>

            <p className="mt-1 text-xs text-slate-500">Currently active</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex size-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Clock3 size={18} />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-wide text-amber-600">
                Invited
              </span>
            </div>

            <p className="mt-4 text-2xl font-bold text-slate-900">
              {invitedCount}
            </p>

            <p className="mt-1 text-xs text-slate-500">Awaiting invitation</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <UserRoundX size={18} />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Offline
              </span>
            </div>

            <p className="mt-4 text-2xl font-bold text-slate-900">
              {offlineCount}
            </p>

            <p className="mt-1 text-xs text-slate-500">Currently unavailable</p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
            <div className="relative min-w-0 flex-1">
              <Search
                size={17}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by name, email, or role..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex items-center gap-2">
                <SlidersHorizontal
                  size={15}
                  className="hidden text-slate-400 sm:block"
                />

                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 sm:w-36"
                >
                  <option value="All">All statuses</option>
                  <option value="Active">Active</option>
                  <option value="Offline">Offline</option>
                  <option value="Invited">Invited</option>
                </select>
              </div>

              <select
                value={departmentFilter}
                onChange={(event) => setDepartmentFilter(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 sm:w-40"
              >
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department === "All" ? "All departments" : department}
                  </option>
                ))}
              </select>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  <X size={14} />
                  Clear
                </button>
              )}
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Team members</h2>

              <p className="mt-1 text-xs text-slate-500">
                Showing {filteredMembers.length} of {members.length} members
              </p>
            </div>
          </div>

          {filteredMembers.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-5 py-14 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Users size={21} />
              </div>

              <h3 className="mt-4 text-sm font-bold text-slate-800">
                No team members found
              </h3>

              <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-slate-500">
                Try changing your search or filters, or invite a new member to
                the workspace.
              </p>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-4 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-700"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredMembers.map((member) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  onEdit={openEditModal}
                  onDelete={setMemberToDelete}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {showModal && (
        <TeamMemberModal
          key={editingMember?.id ?? "new-member"}
          member={editingMember}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      )}

      <DeleteMemberModal
        member={memberToDelete}
        onConfirm={handleDelete}
        onCancel={() => setMemberToDelete(null)}
      />
    </AppLayout>
  );
}

export default Team;
