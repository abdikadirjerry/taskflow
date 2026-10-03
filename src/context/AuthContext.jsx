import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "taskflow-auth";

const demoUser = {
  id: "user-1",
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  role: "Administrator",
};

const DEMO_EMAIL = "alex.morgan@example.com";
const DEMO_PASSWORD = "taskflow123";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEY);

      if (!storedUser) {
        return null;
      }

      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  });

  const login = ({ email, password }) => {
    if (
      email.trim().toLowerCase() !== DEMO_EMAIL ||
      password !== DEMO_PASSWORD
    ) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));

    setUser(demoUser);

    return {
      success: true,
      user: demoUser,
    };
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
