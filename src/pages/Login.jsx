import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: "alex.morgan@example.com",
    password: "taskflow123",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    const result = login(form);

    if (!result.success) {
      setError(result.message);
      setIsSubmitting(false);
      return;
    }

    navigate(from, { replace: true });
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative hidden overflow-hidden lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-950" />

          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
            <Link
              to="/login"
              className="w-fit text-2xl font-bold tracking-tight text-white"
            >
              Task<span className="text-indigo-200">Flow</span>
            </Link>

            <div className="max-w-xl">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur">
                <ShieldCheck size={28} />
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-white xl:text-5xl">
                Manage your work.
                <span className="block text-indigo-200">
                  Move your team forward.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-indigo-100 xl:text-lg">
                TaskFlow brings projects, tasks, deadlines, analytics, and team
                collaboration into one focused workspace.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Organize projects and tasks",
                  "Collaborate with your team",
                  "Track deadlines and performance",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-indigo-100"
                  >
                    <CheckCircle2
                      size={19}
                      className="shrink-0 text-indigo-200"
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm text-indigo-200">TaskFlow workspace</p>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center bg-white px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <Link
                to="/login"
                className="text-2xl font-bold tracking-tight text-slate-900"
              >
                Task<span className="text-indigo-600">Flow</span>
              </Link>
            </div>

            <div className="mb-8">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <LockKeyhole size={23} />
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Welcome back
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Sign in to continue to your TaskFlow workspace.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                >
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
                {!isSubmitting && <ArrowRight size={18} />}
              </button>
            </form>

            <div className="mt-7 rounded-2xl border border-indigo-100 bg-indigo-50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                Demo account
              </p>

              <div className="mt-3 space-y-1 text-sm text-slate-600">
                <p>
                  <span className="font-semibold text-slate-700">Email:</span>{" "}
                  alex.morgan@example.com
                </p>

                <p>
                  <span className="font-semibold text-slate-700">
                    Password:
                  </span>{" "}
                  taskflow123
                </p>
              </div>
            </div>

            <p className="mt-8 text-center text-xs leading-5 text-slate-400">
              This portfolio demo uses frontend authentication. Real
              authentication will be connected to a backend in a later stage.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;
