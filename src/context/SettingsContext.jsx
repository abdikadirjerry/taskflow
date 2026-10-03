import { createContext, useContext, useEffect, useMemo, useState } from "react";

const SettingsContext = createContext(null);

const STORAGE_KEY = "taskflow-settings";

const defaultSettings = {
  profile: {
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    role: "Administrator",
    department: "Product & Engineering",
    bio: "Building better workflows and helping teams stay productive.",
  },

  preferences: {
    theme: "light",
    compactMode: false,
    emailNotifications: true,
    taskNotifications: true,
    projectNotifications: true,
    teamNotifications: true,
  },
};

function getInitialSettings() {
  try {
    const storedSettings = localStorage.getItem(STORAGE_KEY);

    if (!storedSettings) {
      return defaultSettings;
    }

    const parsedSettings = JSON.parse(storedSettings);

    return {
      ...defaultSettings,
      ...parsedSettings,
      profile: {
        ...defaultSettings.profile,
        ...parsedSettings.profile,
      },
      preferences: {
        ...defaultSettings.preferences,
        ...parsedSettings.preferences,
      },
    };
  } catch {
    return defaultSettings;
  }
}

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(getInitialSettings);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const root = document.documentElement;

    function applyTheme() {
      const theme = settings.preferences.theme;

      const shouldUseDark =
        theme === "dark" ||
        (theme === "system" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);

      root.classList.toggle("theme-dark", shouldUseDark);
      root.classList.toggle("theme-light", !shouldUseDark);
    }

    applyTheme();

    if (settings.preferences.theme !== "system") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = () => {
      applyTheme();
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [settings.preferences.theme]);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "compact-mode",
      settings.preferences.compactMode,
    );
  }, [settings.preferences.compactMode]);

  const updateProfile = (profileUpdates) => {
    setSettings((current) => ({
      ...current,
      profile: {
        ...current.profile,
        ...profileUpdates,
      },
    }));
  };

  const updatePreferences = (preferenceUpdates) => {
    setSettings((current) => ({
      ...current,
      preferences: {
        ...current.preferences,
        ...preferenceUpdates,
      },
    }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const value = useMemo(
    () => ({
      settings,
      updateProfile,
      updatePreferences,
      resetSettings,
    }),
    [settings],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error("useSettings must be used inside SettingsProvider");
  }

  return context;
}
