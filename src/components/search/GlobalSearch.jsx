import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckSquare,
  FileText,
  FolderKanban,
  Search,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useProjects } from "../../context/ProjectsContext";
import { useTasks } from "../../context/TasksContext";
import { useTeam } from "../../context/TeamContext";

const navigationItems = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "Workspace overview and task activity",
    path: "/",
    icon: BarChart3,
    keywords: "home overview dashboard",
  },
  {
    id: "projects",
    title: "Projects",
    description: "Manage and track your projects",
    path: "/projects",
    icon: FolderKanban,
    keywords: "projects project management",
  },
  {
    id: "tasks",
    title: "Tasks",
    description: "Manage your workspace tasks",
    path: "/tasks",
    icon: CheckSquare,
    keywords: "tasks todo work",
  },
  {
    id: "team",
    title: "Team",
    description: "Manage workspace members",
    path: "/team",
    icon: Users,
    keywords: "team members people staff",
  },
  {
    id: "calendar",
    title: "Calendar",
    description: "View deadlines and scheduled tasks",
    path: "/calendar",
    icon: CalendarDays,
    keywords: "calendar deadlines schedule dates",
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "View workspace performance and reports",
    path: "/analytics",
    icon: BarChart3,
    keywords: "analytics reports statistics performance",
  },
];

function GlobalSearch() {
  const navigate = useNavigate();

  const { projects } = useProjects();
  const { tasks } = useTasks();
  const { teamMembers } = useTeam();

  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleKeyboardShortcut(event) {
      const isShortcut =
        (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";

      if (isShortcut) {
        event.preventDefault();
        inputRef.current?.focus();
      }

      if (event.key === "Escape") {
        inputRef.current?.blur();
        setIsFocused(false);
      }
    }

    document.addEventListener("keydown", handleKeyboardShortcut);

    return () => {
      document.removeEventListener("keydown", handleKeyboardShortcut);
    };
  }, []);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return {
        projects: [],
        tasks: [],
        team: [],
        navigation: navigationItems.slice(0, 4),
      };
    }

    const matchingProjects = projects
      .filter((project) => {
        const searchableText = [
          project.name,
          project.description,
          project.status,
          project.category,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(normalizedQuery);
      })
      .slice(0, 5);

    const matchingTasks = tasks
      .filter((task) => {
        const searchableText = [
          task.title,
          task.description,
          task.status,
          task.priority,
          task.assignee?.name,
          task.assignee,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(normalizedQuery);
      })
      .slice(0, 5);

    const matchingTeamMembers = teamMembers
      .filter((member) => {
        const searchableText = [
          member.name,
          member.email,
          member.role,
          member.department,
          member.status,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(normalizedQuery);
      })
      .slice(0, 5);

    const matchingNavigation = navigationItems.filter((item) => {
      const searchableText = [item.title, item.description, item.keywords]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });

    return {
      projects: matchingProjects,
      tasks: matchingTasks,
      team: matchingTeamMembers,
      navigation: matchingNavigation,
    };
  }, [query, projects, tasks, teamMembers]);

  const totalResults =
    results.projects.length +
    results.tasks.length +
    results.team.length +
    results.navigation.length;

  function closeSearch() {
    setIsFocused(false);
  }

  function goTo(path) {
    navigate(path);
    setQuery("");
    closeSearch();
  }

  function openSearchPage() {
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      navigate("/search");
    } else {
      navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    }

    closeSearch();
  }

  return (
    <div
      ref={containerRef}
      className="relative hidden max-w-xl flex-1 lg:block"
    >
      <div
        className={[
          "flex h-10 items-center rounded-xl border bg-slate-50 transition",
          isFocused
            ? "border-indigo-300 bg-white ring-2 ring-indigo-100"
            : "border-slate-200",
        ].join(" ")}
      >
        <Search size={18} className="ml-3 shrink-0 text-slate-400" />

        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && query.trim()) {
              openSearchPage();
            }
          }}
          placeholder="Search workspace..."
          className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mr-1 flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}

        {!query && (
          <button
            type="button"
            onClick={() => inputRef.current?.focus()}
            className="mr-2 hidden rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 xl:block"
          >
            Ctrl K
          </button>
        )}
      </div>

      {isFocused && (
        <div className="absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
          {!query.trim() ? (
            <div className="p-4">
              <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Quick navigation
              </p>

              <div className="space-y-1">
                {results.navigation.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => goTo(item.path)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-slate-50"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        <Icon size={17} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-800">
                          {item.title}
                        </p>

                        <p className="truncate text-xs text-slate-500">
                          {item.description}
                        </p>
                      </div>

                      <ArrowRight size={15} className="text-slate-300" />
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 border-t border-slate-100 pt-3 text-xs text-slate-400">
                Press{" "}
                <span className="font-semibold text-slate-500">Ctrl K</span>{" "}
                anytime to search.
              </div>
            </div>
          ) : totalResults > 0 ? (
            <div className="max-h-[500px] overflow-y-auto">
              {results.projects.length > 0 && (
                <SearchSection title="Projects" icon={FolderKanban}>
                  {results.projects.map((project) => (
                    <SearchResult
                      key={project.id}
                      icon={FolderKanban}
                      title={project.name}
                      description={
                        project.description || project.status || "Project"
                      }
                      onClick={() => goTo(`/projects/${project.id}`)}
                    />
                  ))}
                </SearchSection>
              )}

              {results.tasks.length > 0 && (
                <SearchSection title="Tasks" icon={CheckSquare}>
                  {results.tasks.map((task) => (
                    <SearchResult
                      key={task.id}
                      icon={CheckSquare}
                      title={task.title}
                      description={`${task.status || "Task"}${
                        task.priority ? ` • ${task.priority}` : ""
                      }`}
                      onClick={() => goTo("/tasks")}
                    />
                  ))}
                </SearchSection>
              )}

              {results.team.length > 0 && (
                <SearchSection title="Team members" icon={Users}>
                  {results.team.map((member) => (
                    <SearchResult
                      key={member.id}
                      icon={Users}
                      title={member.name}
                      description={member.role || member.email || "Team member"}
                      onClick={() => goTo("/team")}
                    />
                  ))}
                </SearchSection>
              )}

              {results.navigation.length > 0 && (
                <SearchSection title="Workspace" icon={FileText}>
                  {results.navigation.map((item) => {
                    const Icon = item.icon;

                    return (
                      <SearchResult
                        key={item.id}
                        icon={Icon}
                        title={item.title}
                        description={item.description}
                        onClick={() => goTo(item.path)}
                      />
                    );
                  })}
                </SearchSection>
              )}

              <button
                type="button"
                onClick={openSearchPage}
                className="flex w-full items-center justify-center gap-2 border-t border-slate-100 px-4 py-3 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
              >
                View all search results
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div className="px-6 py-10 text-center">
              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Search size={20} />
              </div>

              <h3 className="mt-3 text-sm font-semibold text-slate-900">
                No results found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try searching for a project, task, person, or workspace page.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SearchSection({ title, children }) {
  return (
    <div className="border-b border-slate-100 p-3 last:border-b-0">
      <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
        {title}
      </p>

      <div className="space-y-1">{children}</div>
    </div>
  );
}

function SearchResult({ icon: Icon, title, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-xl px-2 py-2.5 text-left transition hover:bg-slate-50"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        <Icon size={17} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-slate-800">{title}</p>

        <p className="truncate text-xs text-slate-500">{description}</p>
      </div>

      <ArrowRight size={15} className="shrink-0 text-slate-300" />
    </button>
  );
}

export default GlobalSearch;
