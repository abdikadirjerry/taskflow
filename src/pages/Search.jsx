import {
  BarChart3,
  CalendarDays,
  CheckSquare,
  FolderKanban,
  Search as SearchIcon,
  Users,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useMemo } from "react";

import AppLayout from "../components/layout/AppLayout";
import { useProjects } from "../context/ProjectsContext";
import { useTasks } from "../context/TasksContext";
import { useTeam } from "../context/TeamContext";

const navigationItems = [
  {
    title: "Dashboard",
    description: "Workspace overview and task activity",
    path: "/",
    icon: BarChart3,
    keywords: "home overview dashboard",
  },
  {
    title: "Projects",
    description: "Manage and track your projects",
    path: "/projects",
    icon: FolderKanban,
    keywords: "projects project management",
  },
  {
    title: "Tasks",
    description: "Manage your workspace tasks",
    path: "/tasks",
    icon: CheckSquare,
    keywords: "tasks todo work",
  },
  {
    title: "Team",
    description: "Manage workspace members",
    path: "/team",
    icon: Users,
    keywords: "team members people staff",
  },
  {
    title: "Calendar",
    description: "View deadlines and scheduled tasks",
    path: "/calendar",
    icon: CalendarDays,
    keywords: "calendar deadlines schedule dates",
  },
  {
    title: "Analytics",
    description: "View workspace performance and reports",
    path: "/analytics",
    icon: BarChart3,
    keywords: "analytics reports statistics performance",
  },
];

function Search() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q")?.trim() || "";

  const { projects } = useProjects();
  const { tasks } = useTasks();
  const { teamMembers } = useTeam();

  const results = useMemo(() => {
    if (!query) {
      return {
        projects: [],
        tasks: [],
        team: [],
        navigation: [],
      };
    }

    const normalizedQuery = query.toLowerCase();

    return {
      projects: projects.filter((project) => {
        const text = [
          project.name,
          project.description,
          project.status,
          project.category,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return text.includes(normalizedQuery);
      }),

      tasks: tasks.filter((task) => {
        const text = [
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

        return text.includes(normalizedQuery);
      }),

      team: teamMembers.filter((member) => {
        const text = [
          member.name,
          member.email,
          member.role,
          member.department,
          member.status,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return text.includes(normalizedQuery);
      }),

      navigation: navigationItems.filter((item) => {
        const text = [item.title, item.description, item.keywords]
          .join(" ")
          .toLowerCase();

        return text.includes(normalizedQuery);
      }),
    };
  }, [query, projects, tasks, teamMembers]);

  const totalResults =
    results.projects.length +
    results.tasks.length +
    results.team.length +
    results.navigation.length;

  return (
    <AppLayout>
      <div className="mx-auto max-w-6xl space-y-6">
        <div>
          <p className="text-sm font-medium text-indigo-600">
            Workspace Search
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Search results
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Find projects, tasks, team members, and workspace pages from one
            place.
          </p>
        </div>

        {!query ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              <SearchIcon size={25} />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-900">
              Search your workspace
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Use the search field in the topbar to find projects, tasks, team
              members, or workspace pages.
            </p>
          </div>
        ) : (
          <>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">Search results for</p>

              <div className="mt-1 flex flex-wrap items-center gap-2">
                <span className="rounded-lg bg-indigo-50 px-2.5 py-1 text-sm font-semibold text-indigo-700">
                  "{query}"
                </span>

                <span className="text-sm text-slate-500">
                  {totalResults} {totalResults === 1 ? "result" : "results"}{" "}
                  found
                </span>
              </div>
            </div>

            {totalResults === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <SearchIcon size={24} />
                </div>

                <h2 className="mt-5 text-lg font-semibold text-slate-900">
                  No results found
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                  Try a different search term or search for a project, task,
                  team member, or workspace page.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-2">
                <ResultSection
                  title="Projects"
                  count={results.projects.length}
                  icon={FolderKanban}
                >
                  {results.projects.map((project) => (
                    <Link
                      key={project.id}
                      to={`/projects/${project.id}`}
                      className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-indigo-100 hover:bg-indigo-50/40"
                    >
                      <ResultIcon icon={FolderKanban} />

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {project.name}
                        </p>

                        <p className="mt-1 truncate text-xs text-slate-500">
                          {project.description || project.status || "Project"}
                        </p>
                      </div>
                    </Link>
                  ))}
                </ResultSection>

                <ResultSection
                  title="Tasks"
                  count={results.tasks.length}
                  icon={CheckSquare}
                >
                  {results.tasks.map((task) => (
                    <Link
                      key={task.id}
                      to="/tasks"
                      className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-indigo-100 hover:bg-indigo-50/40"
                    >
                      <ResultIcon icon={CheckSquare} />

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {task.title}
                        </p>

                        <p className="mt-1 truncate text-xs text-slate-500">
                          {task.status || "Task"}
                          {task.priority ? ` • ${task.priority}` : ""}
                        </p>
                      </div>
                    </Link>
                  ))}
                </ResultSection>

                <ResultSection
                  title="Team members"
                  count={results.team.length}
                  icon={Users}
                >
                  {results.team.map((member) => (
                    <Link
                      key={member.id}
                      to="/team"
                      className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-indigo-100 hover:bg-indigo-50/40"
                    >
                      <ResultIcon icon={Users} />

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {member.name}
                        </p>

                        <p className="mt-1 truncate text-xs text-slate-500">
                          {member.role || member.email || "Team member"}
                        </p>
                      </div>
                    </Link>
                  ))}
                </ResultSection>

                <ResultSection
                  title="Workspace pages"
                  count={results.navigation.length}
                  icon={BarChart3}
                >
                  {results.navigation.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-indigo-100 hover:bg-indigo-50/40"
                      >
                        <ResultIcon icon={Icon} />

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {item.title}
                          </p>

                          <p className="mt-1 truncate text-xs text-slate-500">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </ResultSection>
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  );
}

function ResultSection({ title, count, icon: Icon, children }) {
  if (count === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <Icon size={18} />
          </div>

          <h2 className="font-semibold text-slate-900">{title}</h2>
        </div>

        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
          {count}
        </span>
      </div>

      <div className="space-y-2">{children}</div>
    </section>
  );
}

function ResultIcon({ icon: Icon }) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
      <Icon size={18} />
    </div>
  );
}

export default Search;
