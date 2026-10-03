import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function TaskPriorityChart({ tasks }) {
  const data = [
    {
      priority: "High",
      tasks: tasks.filter((task) => task.priority === "High").length,
    },
    {
      priority: "Medium",
      tasks: tasks.filter((task) => task.priority === "Medium").length,
    },
    {
      priority: "Low",
      tasks: tasks.filter((task) => task.priority === "Low").length,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">Task Priority</h2>

        <p className="mt-1 text-sm text-slate-500">
          Tasks grouped by priority level.
        </p>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis dataKey="priority" axisLine={false} tickLine={false} />

            <YAxis allowDecimals={false} axisLine={false} tickLine={false} />

            <Tooltip />

            <Bar
              dataKey="tasks"
              name="Tasks"
              fill="#6366f1"
              radius={[6, 6, 0, 0]}
              barSize={45}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default TaskPriorityChart;
