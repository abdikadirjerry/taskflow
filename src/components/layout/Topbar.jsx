import { useState } from "react";
import { Bell, ChevronRight, Menu, Search, Settings } from "lucide-react";
import Avatar from "../ui/Avatar";

function Topbar({ onMenuClick, pageTitle = "Dashboard" }) {
  const [search, setSearch] = useState("");

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 lg:hidden"
        >
          <Menu size={21} />
        </button>

        <div className="hidden items-center gap-2 text-sm sm:flex">
          <span className="text-slate-400">Workspace</span>
          <ChevronRight size={15} className="text-slate-300" />
          <span className="font-semibold text-slate-800">{pageTitle}</span>
        </div>

        <h2 className="truncate text-sm font-semibold text-slate-800 sm:hidden">
          {pageTitle}
        </h2>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <form
          role="search"
          onSubmit={(event) => event.preventDefault()}
          className="hidden w-52 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 transition focus-within:border-indigo-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 md:flex lg:w-64"
        >
          <Search size={16} className="shrink-0 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search anything..."
            aria-label="Search anything"
            className="w-full border-0 bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
          />
          <kbd className="hidden shrink-0 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] text-slate-400 lg:inline">
            /
          </kbd>
        </form>

        <button
          type="button"
          aria-label="Search"
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 md:hidden"
        >
          <Search size={19} />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
        >
          <Bell size={19} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
        </button>

        <div className="hidden h-7 w-px bg-slate-200 sm:block" />

        <button
          type="button"
          aria-label="Account settings"
          className="hidden rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 sm:block"
        >
          <Settings size={18} />
        </button>

        <button
          type="button"
          aria-label="Open user profile"
          className="rounded-full transition hover:ring-2 hover:ring-indigo-200"
        >
          <Avatar name="Abdi Qadir" size="sm" />
        </button>
      </div>
    </header>
  );
}

export default Topbar;
