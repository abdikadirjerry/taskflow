import { ArrowUpRight, Plus } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/ui/PageHeader";
import Button from "../components/ui/Button";
import StatCard from "../components/dashboard/StatCard";
import ProjectProgress from "../components/dashboard/ProjectProgress";
import TaskActivityChart from "../components/dashboard/TaskActivityChart";
import ActivityFeed from "../components/dashboard/ActivityFeed";
import UpcomingTasks from "../components/dashboard/UpcomingTasks";
import {
  activities,
  dashboardStats,
  projects,
  upcomingTasks,
  weeklyTaskData,
} from "../data/dashboardData";

function Dashboard() {
  return (
    <AppLayout pageTitle="Dashboard">
      <div className="space-y-8">
        <PageHeader
          eyebrow="Thursday, October 1, 2026"
          title="Good evening, Abdi 👋"
          description="Here's what's happening with your projects today."
          action={<Button icon={Plus}>Create project</Button>}
        />

        <section
          aria-label="Workspace statistics"
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {dashboardStats.map((stat) => (
            <StatCard key={stat.title} stat={stat} />
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <ProjectProgress projects={projects} />
          <TaskActivityChart data={weeklyTaskData} />
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <ActivityFeed activities={activities} />
          <UpcomingTasks tasks={upcomingTasks} />
        </section>

        <footer className="flex flex-col items-center justify-between gap-2 border-t border-slate-200 py-5 text-xs text-slate-400 sm:flex-row">
          <p>© 2026 TaskFlow. Organize work. Achieve more.</p>
          <a
            href="#"
            className="inline-flex items-center gap-1 font-medium text-slate-500 transition hover:text-indigo-600"
          >
            Dashboard overview
            <ArrowUpRight size={13} />
          </a>
        </footer>
      </div>
    </AppLayout>
  );
}

export default Dashboard;
