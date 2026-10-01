import {
  BarChart3,
  CalendarDays,
  ChevronDown,
  CircleHelp,
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Settings,
  Users,
  X,
  Layers3,
} from "lucide-react";
import Avatar from "../ui/Avatar";

const navigation = [
  {
    label: "WORKSPACE",
    items: [
      { name: "Dashboard", icon: LayoutDashboard, active: true },
      { name: "Projects", icon: FolderKanban },
      { name: "My Tasks", icon: ListTodo },
      { name: "Calendar", icon: CalendarDays },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      { name: "Team", icon: Users },
      { name: "Reports", icon: BarChart3 },
    ],
  },
];

function Sidebar({ mobileOpen, onClose, activePage = "Dashboard" }) {
  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-5">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Layers3 size={21} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Task<span className="text-indigo-600">Flow</span>
            </span>
          </a>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="border-b border-slate-100 p-4">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl border border-slate-200 p-3 text-left transition hover:bg-slate-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-sm font-bold text-violet-700">
              AC
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">
                Acme Corporation
              </p>
              <p className="mt-0.5 text-xs text-slate-500">Free workspace</p>
            </div>

            <ChevronDown size={16} className="shrink-0 text-slate-400" />
          </button>
        </div>

        <nav
          aria-label="Main navigation"
          className="flex-1 space-y-7 overflow-y-auto px-3 py-6"
        >
          {navigation.map((group) => (
            <div key={group.label}>
              <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.14em] text-slate-400">
                {group.label}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = activePage === item.name;

                  return (
                    <a
                      key={item.name}
                      href={item.name === "Dashboard" ? "/" : "#"}
                      onClick={onClose}
                      aria-current={active ? "page" : undefined}
                      className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                        active
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <Icon
                        size={18}
                        className={
                          active
                            ? "text-indigo-600"
                            : "text-slate-400 group-hover:text-slate-600"
                        }
                      />
                      <span>{item.name}</span>

                      {item.name === "My Tasks" && (
                        <span className="ml-auto rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                          8
                        </span>
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="space-y-1 border-t border-slate-100 p-3">
          <a
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <CircleHelp size={18} className="text-slate-400" />
            Help & Support
          </a>

          <a
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <Settings size={18} className="text-slate-400" />
            Settings
          </a>

          <div className="mt-3 flex items-center gap-3 border-t border-slate-100 px-2 pt-4">
            <Avatar name="Abdi Qadir" size="md" />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">
                Abdi Qadir
              </p>
              <p className="truncate text-xs text-slate-500">Workspace admin</p>
            </div>

            <button
              type="button"
              aria-label="Sign out"
              title="Sign out"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
