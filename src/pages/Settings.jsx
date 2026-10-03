import {
  Bell,
  Check,
  Mail,
  Monitor,
  Moon,
  RotateCcw,
  Save,
  Sun,
} from "lucide-react";
import { useState } from "react";

import AppLayout from "../components/layout/AppLayout";
import { useSettings } from "../context/SettingsContext";

function Settings() {
  const { settings, updatePreferences, resetSettings } = useSettings();

  const [preferences, setPreferences] = useState(settings.preferences);

  const [saved, setSaved] = useState(false);

  function updatePreference(name, value) {
    setPreferences((current) => ({
      ...current,
      [name]: value,
    }));

    setSaved(false);
  }

  function handleSave(event) {
    event.preventDefault();

    updatePreferences(preferences);
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  function handleReset() {
    resetSettings();

    setPreferences({
      theme: "light",
      compactMode: false,
      emailNotifications: true,
      taskNotifications: true,
      projectNotifications: true,
      teamNotifications: true,
    });

    setSaved(false);
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div>
          <p className="text-sm font-medium text-indigo-600">Workspace</p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Settings
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Customize how TaskFlow looks and how you receive workspace updates.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Appearance */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Monitor size={20} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Appearance
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Choose how TaskFlow should look for you.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <ThemeOption
                value="light"
                currentValue={preferences.theme}
                label="Light"
                description="Clean and bright"
                icon={Sun}
                onChange={(value) => updatePreference("theme", value)}
              />

              <ThemeOption
                value="dark"
                currentValue={preferences.theme}
                label="Dark"
                description="Easy on the eyes"
                icon={Moon}
                onChange={(value) => updatePreference("theme", value)}
              />

              <ThemeOption
                value="system"
                currentValue={preferences.theme}
                label="System"
                description="Follow your device"
                icon={Monitor}
                onChange={(value) => updatePreference("theme", value)}
              />
            </div>

            <div className="mt-6">
              <ToggleRow
                title="Compact mode"
                description="Use tighter spacing throughout the workspace."
                checked={preferences.compactMode}
                onChange={(value) => updatePreference("compactMode", value)}
              />
            </div>
          </section>

          {/* Notifications */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Bell size={20} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Notifications
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Choose which workspace updates you want to receive.
                </p>
              </div>
            </div>

            <div className="mt-6 divide-y divide-slate-100">
              <ToggleRow
                title="Email notifications"
                description="Receive important TaskFlow updates by email."
                checked={preferences.emailNotifications}
                onChange={(value) =>
                  updatePreference("emailNotifications", value)
                }
              />

              <ToggleRow
                title="Task notifications"
                description="Get notified about task assignments and updates."
                checked={preferences.taskNotifications}
                onChange={(value) =>
                  updatePreference("taskNotifications", value)
                }
              />

              <ToggleRow
                title="Project notifications"
                description="Receive updates about project activity."
                checked={preferences.projectNotifications}
                onChange={(value) =>
                  updatePreference("projectNotifications", value)
                }
              />

              <ToggleRow
                title="Team notifications"
                description="Receive updates about team activity."
                checked={preferences.teamNotifications}
                onChange={(value) =>
                  updatePreference("teamNotifications", value)
                }
              />
            </div>
          </section>

          {/* Actions */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Settings actions
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Save your preferences or restore the default TaskFlow
                  settings.
                </p>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <RotateCcw size={17} />
                Reset defaults
              </button>
            </div>
          </section>

          {/* Save bar */}
          <div className="flex flex-col gap-3 rounded-2xl border border-indigo-100 bg-indigo-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              {saved ? (
                <>
                  <Check size={18} className="text-emerald-600" />

                  <span className="text-sm font-medium text-emerald-700">
                    Settings saved successfully
                  </span>
                </>
              ) : (
                <>
                  <Mail size={18} className="text-indigo-600" />

                  <span className="text-sm text-slate-600">
                    Your settings are stored locally on this device.
                  </span>
                </>
              )}
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              <Save size={17} />
              Save settings
            </button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}

function ThemeOption({
  value,
  currentValue,
  label,
  description,
  icon: Icon,
  onChange,
}) {
  const isSelected = value === currentValue;

  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={[
        "relative rounded-xl border p-4 text-left transition",
        isSelected
          ? "border-indigo-300 bg-indigo-50 ring-2 ring-indigo-100"
          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50",
      ].join(" ")}
    >
      {isSelected && (
        <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white">
          <Check size={12} />
        </span>
      )}

      <Icon
        size={20}
        className={isSelected ? "text-indigo-600" : "text-slate-500"}
      />

      <p className="mt-3 text-sm font-semibold text-slate-900">{label}</p>

      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </button>
  );
}

function ToggleRow({ title, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-5 py-4 first:pt-0 last:pb-0">
      <div className="min-w-0">
        <p className="text-sm font-medium text-slate-900">{title}</p>

        <p className="mt-1 text-sm leading-5 text-slate-500">{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={[
          "relative h-6 w-11 shrink-0 rounded-full transition",
          checked ? "bg-indigo-600" : "bg-slate-200",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition",
            checked ? "left-6" : "left-1",
          ].join(" ")}
        />
      </button>
    </div>
  );
}

export default Settings;
