import { CalendarDays, ListTodo } from "lucide-react";
import { useMemo, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import CalendarGrid from "../components/calendar/CalendarGrid";
import DeadlineList from "../components/calendar/DeadlineList";
import { useTasks } from "../context/TasksContext";
import { useProjects } from "../context/ProjectsContext";

function getDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function Calendar() {
  const { tasks = [] } = useTasks();
  const { projects = [] } = useProjects();

  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  const [selectedDate, setSelectedDate] = useState(getDateKey(today));

  const taskStats = useMemo(() => {
    const tasksWithDueDates = tasks.filter((task) => task.dueDate);

    const completed = tasksWithDueDates.filter(
      (task) => task.status === "Done",
    ).length;

    const active = tasksWithDueDates.filter(
      (task) => task.status !== "Done",
    ).length;

    const highPriority = tasksWithDueDates.filter(
      (task) => task.priority === "High" && task.status !== "Done",
    ).length;

    return {
      total: tasksWithDueDates.length,
      completed,
      active,
      highPriority,
    };
  }, [tasks]);

  const handlePreviousMonth = () => {
    setCurrentDate(
      (date) => new Date(date.getFullYear(), date.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (date) => new Date(date.getFullYear(), date.getMonth() + 1, 1),
    );
  };

  const handleToday = () => {
    const now = new Date();

    setCurrentDate(new Date(now.getFullYear(), now.getMonth(), 1));

    setSelectedDate(getDateKey(now));
  };

  return (
    <AppLayout>
      <main className="min-w-0 space-y-6 pb-8">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-indigo-600">
              Schedule workspace
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Calendar
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-slate-500">
              See your task deadlines, upcoming work, and important dates in one
              place.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <CalendarDays size={16} />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Scheduled
              </span>
            </div>

            <p className="mt-3 text-xl font-bold text-slate-900">
              {taskStats.total}
            </p>

            <p className="mt-1 text-[10px] text-slate-500">
              Tasks with due dates
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <ListTodo size={16} />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Active
              </span>
            </div>

            <p className="mt-3 text-xl font-bold text-slate-900">
              {taskStats.active}
            </p>

            <p className="mt-1 text-[10px] text-slate-500">Remaining tasks</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <ListTodo size={16} />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                Completed
              </span>
            </div>

            <p className="mt-3 text-xl font-bold text-slate-900">
              {taskStats.completed}
            </p>

            <p className="mt-1 text-[10px] text-slate-500">
              Finished scheduled tasks
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                <CalendarDays size={16} />
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                High priority
              </span>
            </div>

            <p className="mt-3 text-xl font-bold text-slate-900">
              {taskStats.highPriority}
            </p>

            <p className="mt-1 text-[10px] text-slate-500">
              Active high-priority tasks
            </p>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.75fr)]">
          <CalendarGrid
            currentDate={currentDate}
            tasks={tasks}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            onPreviousMonth={handlePreviousMonth}
            onNextMonth={handleNextMonth}
            onToday={handleToday}
          />

          <DeadlineList
            tasks={tasks}
            projects={projects}
            selectedDate={selectedDate}
          />
        </section>
      </main>
    </AppLayout>
  );
}

export default Calendar;
