import { createContext, useContext, useEffect, useMemo, useState } from "react";

const NotificationContext = createContext(null);

const STORAGE_KEY = "taskflow-notifications";

const defaultNotifications = [
  {
    id: "notification-1",
    type: "task",
    title: "Welcome to TaskFlow",
    message:
      "Your notification center is ready. Important workspace activity will appear here.",
    time: new Date().toISOString(),
    read: false,
  },
];

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    try {
      const storedNotifications = localStorage.getItem(STORAGE_KEY);

      return storedNotifications
        ? JSON.parse(storedNotifications)
        : defaultNotifications;
    } catch {
      return defaultNotifications;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  }, [notifications]);

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  const addNotification = (notification) => {
    setNotifications((current) => [
      {
        id:
          notification.id ||
          `notification-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 8)}`,
        type: notification.type || "system",
        title: notification.title || "New notification",
        message: notification.message || "",
        time: notification.time || new Date().toISOString(),
        read: false,
      },
      ...current,
    ]);
  };

  const markAsRead = (notificationId) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      })),
    );
  };

  const deleteNotification = (notificationId) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== notificationId),
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const value = useMemo(
    () => ({
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      clearNotifications,
    }),
    [notifications, unreadCount],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotifications must be used inside NotificationProvider",
    );
  }

  return context;
}
