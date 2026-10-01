import { CheckCircle2, Layers3, Users } from "lucide-react";

function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <Layers3 size={26} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              TaskFlow
            </h1>
            <p className="text-sm text-slate-500">
              Project management made simple
            </p>
          </div>
        </div>

        <div className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700">
            <CheckCircle2 size={16} />
            Project initialized
          </span>
        </div>

        <h2 className="mb-3 text-3xl font-bold tracking-tight text-slate-900">
          Welcome to TaskFlow
        </h2>

        <p className="mb-8 leading-7 text-slate-600">
          Organize projects, manage tasks, collaborate with your team, and track
          your progress in one place.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <Layers3 className="mb-3 text-indigo-600" size={22} />
            <h3 className="font-semibold text-slate-800">Manage projects</h3>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Keep your work organized.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <Users className="mb-3 text-indigo-600" size={22} />
            <h3 className="font-semibold text-slate-800">Work together</h3>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Collaborate with your team.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-5">
          <p className="text-sm text-slate-400">
            Your workspace is being prepared.
          </p>
        </div>
      </section>
    </main>
  );
}

export default App;
