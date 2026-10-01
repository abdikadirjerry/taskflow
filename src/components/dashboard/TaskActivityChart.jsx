import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function TaskActivityChart({ data }) {
  const [period, setPeriod] = useState("week");

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Task Activity
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Completed and created tasks over time.
          </p>
        </div>

        <select
          value={period}
          onChange={(event) => setPeriod(event.target.value)}
          aria-label="Chart period"
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        >
          <option value="week">This week</option>
          <option value="month" disabled>
            This month (coming soon)
          </option>
        </select>
      </div>

      <div
        className="mt-6 h-72 w-full"
        role="img"
        aria-label="Bar chart comparing tasks created and completed throughout the week"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
            barGap={5}
          >
            <CartesianGrid
              stroke="#e2e8f0"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              dy={10}
            />

            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
            />

            <Tooltip
              cursor={{ fill: "#f8fafc" }}
              contentStyle={{
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
                fontSize: "12px",
              }}
            />

            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              iconSize={8}
              wrapperStyle={{
                fontSize: "12px",
                paddingBottom: "20px",
              }}
            />

            <Bar
              dataKey="completed"
              name="Completed"
              fill="#4f46e5"
              radius={[5, 5, 0, 0]}
              maxBarSize={28}
            />

            <Bar
              dataKey="created"
              name="Created"
              fill="#c7d2fe"
              radius={[5, 5, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default TaskActivityChart;
