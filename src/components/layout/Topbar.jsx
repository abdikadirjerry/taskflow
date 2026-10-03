import { Menu, Search } from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "../ui/Avatar";
import NotificationBell from "../notifications/NotificationBell";

function Topbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={21} />
        </button>

        <Link
          to="/"
          className="shrink-0 text-lg font-bold tracking-tight text-slate-900 lg:hidden"
        >
          Task<span className="text-indigo-600">Flow</span>
        </Link>

        <div className="relative hidden max-w-md flex-1 lg:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            placeholder="Search workspace..."
            className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <NotificationBell />

        <div className="hidden h-6 w-px bg-slate-200 sm:block" />

        <div className="flex items-center gap-2">
          <Avatar name="Alex Morgan" size="sm" />

          <div className="hidden min-w-0 md:block">
            <p className="truncate text-sm font-semibold text-slate-900">
              Alex Morgan
            </p>

            <p className="text-xs text-slate-500">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
