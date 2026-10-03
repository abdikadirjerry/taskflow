import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function getLastSevenDays() {
  const days = [];

  for (let index = 6; index >= 0; index -= 1) {
    const date = new Date();

    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - index);

    days.push(date);
  }

  return days;
}

function WeeklyTaskChart({ tasks }) {
  const days = getLastSevenDays();

  const data = days.map((date) => {
    const dateKey = date.toISOString().split("T")[0];

    const created = tasks.filter((task) => {
      if (!task.createdAt) {
        return false;
      }

      return task.createdAt.startsWith(dateKey);
    }).length;

    const completed = tasks.filter((task) => {
      if (task.status !== "Done" || !task.updatedAt) {
        return false;
      }

      return task.updatedAt.startsWith(dateKey);
    }).length;

    return {
      day: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      created,
      completed,
    };
  });

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Weekly Task Activity
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Task creation and completion activity over the last 7 days.
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis dataKey="day" axisLine={false} tickLine={false} />

            <YAxis allowDecimals={false} axisLine={false} tickLine={false} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="created"
              name="Created"
              stroke="#6366f1"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="completed"
              name="Completed"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WeeklyTaskChart;
