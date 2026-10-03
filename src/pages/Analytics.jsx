import {
  CheckCircle2,
  CircleDot,
  FolderKanban,
  ListTodo,
  TrendingUp,
  Users,
} from "lucide-react";

import AnalyticsStatCard from "../components/analytics/AnalyticsStatCard";
import ProjectPerformance from "../components/analytics/ProjectPerformance";
import TaskPriorityChart from "../components/analytics/TaskPriorityChart";
import TaskStatusChart from "../components/analytics/TaskStatusChart";
import TeamProductivity from "../components/analytics/TeamProductivity";
import WeeklyTaskChart from "../components/analytics/WeeklyTaskChart";
import AppLayout from "../components/layout/AppLayout";
import { useProjects } from "../context/ProjectsContext";
import { useTasks } from "../context/TasksContext";
import { useTeam } from "../context/TeamContext";

function Analytics() {
  const { projects } = useProjects();
  const { tasks } = useTasks();
  const { teamMembers } = useTeam();

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.status === "Done").length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress",
  ).length;

  const activeProjects = projects.filter(
    (project) =>
      project.status === "Active" || project.status === "In Progress",
  ).length;

  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <p className="text-sm font-medium text-indigo-600">
            Workspace Insights
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Analytics
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
            Monitor project performance, task activity, and team productivity
            from one workspace.
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <AnalyticsStatCard
            title="Total Tasks"
            value={totalTasks}
            description="All tasks across projects"
            icon={ListTodo}
            iconClassName="bg-indigo-50 text-indigo-600"
          />

          <AnalyticsStatCard
            title="Completed Tasks"
            value={completedTasks}
            description={`${completionRate}% overall completion`}
            icon={CheckCircle2}
            iconClassName="bg-emerald-50 text-emerald-600"
          />

          <AnalyticsStatCard
            title="In Progress"
            value={inProgressTasks}
            description="Tasks currently being worked on"
            icon={CircleDot}
            iconClassName="bg-amber-50 text-amber-600"
          />

          <AnalyticsStatCard
            title="Active Projects"
            value={activeProjects}
            description={`${projects.length} total projects`}
            icon={FolderKanban}
            iconClassName="bg-blue-50 text-blue-600"
          />
        </div>

        {/* Main charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <TaskStatusChart tasks={tasks} />
          <TaskPriorityChart tasks={tasks} />
        </div>

        {/* Weekly trend */}
        <WeeklyTaskChart tasks={tasks} />

        {/* Productivity */}
        <div className="grid gap-6 xl:grid-cols-2">
          <TeamProductivity tasks={tasks} teamMembers={teamMembers} />

          <ProjectPerformance projects={projects} tasks={tasks} />
        </div>

        {/* Bottom insight */}
        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
              <TrendingUp size={21} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Workspace completion rate
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                {totalTasks > 0
                  ? `${completionRate}% of all tasks are currently completed. Keep tracking progress across projects and team members to maintain a clear view of your workspace.`
                  : "Start adding tasks to your projects to see meaningful analytics and productivity insights here."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default Analytics;
