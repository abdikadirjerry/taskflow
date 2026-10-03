import {
  BriefcaseBusiness,
  Building2,
  Check,
  Mail,
  Save,
  User,
} from "lucide-react";
import { useState } from "react";

import AppLayout from "../components/layout/AppLayout";
import { useSettings } from "../context/SettingsContext";

function Profile() {
  const { settings, updateProfile } = useSettings();

  const [formData, setFormData] = useState(settings.profile);

  const [saved, setSaved] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setSaved(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    updateProfile(formData);
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  const initials = formData.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div>
          <p className="text-sm font-medium text-indigo-600">Account</p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Your Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Manage your personal information and workspace identity.
          </p>
        </div>

        {/* Profile card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-8 sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-2xl font-bold text-indigo-600 shadow-lg">
                {initials || "AM"}
              </div>

              <div className="text-white">
                <h2 className="text-xl font-bold">
                  {formData.name || "Your Name"}
                </h2>

                <p className="mt-1 text-sm text-indigo-100">
                  {formData.role || "Workspace member"}
                </p>

                <p className="mt-1 text-sm text-indigo-100">{formData.email}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Personal information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Keep your account information up to date.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <InputField
                label="Full name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                icon={User}
                placeholder="Enter your name"
              />

              <InputField
                label="Email address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                icon={Mail}
                placeholder="Enter your email"
              />

              <InputField
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                icon={BriefcaseBusiness}
                placeholder="e.g. Administrator"
              />

              <InputField
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                icon={Building2}
                placeholder="e.g. Engineering"
              />
            </div>

            <div>
              <label
                htmlFor="bio"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Bio
              </label>

              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                placeholder="Tell your team a little about yourself..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                {saved && (
                  <>
                    <Check size={17} className="text-emerald-600" />

                    <span className="text-sm font-medium text-emerald-600">
                      Profile saved successfully
                    </span>
                  </>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                <Save size={17} />
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  icon: Icon,
  placeholder,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <Icon
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
        />
      </div>
    </div>
  );
}

export default Profile;
