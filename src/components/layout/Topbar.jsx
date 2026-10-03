import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

import Avatar from "../ui/Avatar";
import GlobalSearch from "../search/GlobalSearch";
import NotificationBell from "../notifications/NotificationBell";

function Topbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 lg:hidden"
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

        <GlobalSearch />
      </div>

      <div className="ml-3 flex items-center gap-2 sm:gap-3">
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
