import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#64748b", "#f59e0b", "#22c55e"];

function TaskStatusChart({ tasks }) {
  const statusData = [
    {
      name: "Todo",
      value: tasks.filter((task) => task.status === "Todo").length,
    },
    {
      name: "In Progress",
      value: tasks.filter((task) => task.status === "In Progress").length,
    },
    {
      name: "Done",
      value: tasks.filter((task) => task.status === "Done").length,
    },
  ];

  const hasData = statusData.some((item) => item.value > 0);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">Task Status</h2>
        <p className="mt-1 text-sm text-slate-500">
          Current distribution of your tasks.
        </p>
      </div>

      {hasData ? (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={4}
              >
                {statusData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index]} />
                ))}
              </Pie>

              <Tooltip formatter={(value, name) => [value, name]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex h-72 items-center justify-center text-sm text-slate-500">
          No task data available.
        </div>
      )}

      <div className="mt-2 grid grid-cols-3 gap-3">
        {statusData.map((item, index) => (
          <div key={item.name} className="text-center">
            <div className="flex items-center justify-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: COLORS[index] }}
              />

              <span className="text-xs font-medium text-slate-600">
                {item.name}
              </span>
            </div>

            <p className="mt-1 text-lg font-bold text-slate-900">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskStatusChart;
