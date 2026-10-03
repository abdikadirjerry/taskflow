import { ChevronLeft, ChevronRight } from "lucide-react";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const statusDotStyles = {
  Todo: "bg-slate-400",
  "In Progress": "bg-indigo-500",
  Done: "bg-emerald-500",
};

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1);
  const startDay = firstDay.getDay();

  const days = [];

  for (let index = 0; index < 42; index += 1) {
    const date = new Date(year, month, 1 - startDay + index);

    days.push(date);
  }

  return days;
}

function CalendarGrid({
  currentDate,
  tasks,
  selectedDate,
  onDateSelect,
  onPreviousMonth,
  onNextMonth,
  onToday,
}) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const calendarDays = getCalendarDays(year, month);

  const monthLabel = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const todayKey = formatDateKey(new Date());

  const tasksByDate = tasks.reduce((result, task) => {
    if (!task.dueDate) {
      return result;
    }

    const dateKey = task.dueDate.slice(0, 10);

    if (!result[dateKey]) {
      result[dateKey] = [];
    }

    result[dateKey].push(task);

    return result;
  }, {});

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div>
          <h2 className="text-base font-bold text-slate-900">Calendar</h2>

          <p className="mt-1 text-xs text-slate-500">
            Track deadlines and scheduled work.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToday}
            className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Today
          </button>

          <button
            type="button"
            onClick={onPreviousMonth}
            className="flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
            aria-label="Previous month"
          >
            <ChevronLeft size={17} />
          </button>

          <button
            type="button"
            onClick={onNextMonth}
            className="flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
            aria-label="Next month"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>

      <div className="border-b border-slate-100 px-4 py-4 sm:px-5">
        <h3 className="text-lg font-bold text-slate-900">{monthLabel}</h3>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[680px]">
          <div className="grid grid-cols-7 border-b border-slate-100">
            {weekDays.map((day) => (
              <div
                key={day}
                className="px-2 py-3 text-center text-[10px] font-bold uppercase tracking-wide text-slate-400 sm:text-xs"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {calendarDays.map((date) => {
              const dateKey = formatDateKey(date);
              const dayTasks = tasksByDate[dateKey] ?? [];

              const isCurrentMonth = date.getMonth() === month;

              const isToday = dateKey === todayKey;
              const isSelected = dateKey === selectedDate;

              return (
                <button
                  type="button"
                  key={dateKey}
                  onClick={() => onDateSelect(dateKey)}
                  className={`relative min-h-24 border-b border-r border-slate-100 p-2 text-left transition sm:min-h-28 ${
                    isSelected ? "bg-indigo-50/70" : "hover:bg-slate-50"
                  } ${!isCurrentMonth ? "bg-slate-50/60" : "bg-white"}`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex size-7 items-center justify-center rounded-full text-xs font-semibold ${
                        isToday
                          ? "bg-indigo-600 text-white"
                          : isCurrentMonth
                            ? "text-slate-700"
                            : "text-slate-300"
                      }`}
                    >
                      {date.getDate()}
                    </span>

                    {dayTasks.length > 0 && (
                      <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-500">
                        {dayTasks.length}
                      </span>
                    )}
                  </div>

                  <div className="mt-2 space-y-1">
                    {dayTasks.slice(0, 3).map((task) => (
                      <div
                        key={task.id}
                        className="flex min-w-0 items-center gap-1.5"
                      >
                        <span
                          className={`size-1.5 shrink-0 rounded-full ${
                            statusDotStyles[task.status] ?? "bg-slate-400"
                          }`}
                        />

                        <span
                          className={`truncate text-[9px] font-medium sm:text-[10px] ${
                            task.status === "Done"
                              ? "text-slate-400 line-through"
                              : "text-slate-600"
                          }`}
                        >
                          {task.title}
                        </span>
                      </div>
                    ))}

                    {dayTasks.length > 3 && (
                      <p className="pl-3 text-[9px] font-semibold text-indigo-600">
                        +{dayTasks.length - 3} more
                      </p>
                    )}
                  </div>

                  {isSelected && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CalendarGrid;
