import { Bell, CheckCheck, Inbox, Trash2 } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import NotificationItem from "../components/notifications/NotificationItem";
import { useNotifications } from "../context/NotificationContext";

function Notifications() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearNotifications,
  } = useNotifications();

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Bell size={21} />
              </div>

              <div>
                <p className="text-sm font-medium text-indigo-600">
                  Activity Center
                </p>

                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Notifications
                </h1>
              </div>
            </div>

            <p className="mt-3 max-w-2xl text-sm text-slate-500 sm:text-base">
              Keep track of important updates and activity across your TaskFlow
              workspace.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                <CheckCheck size={17} />
                Mark all read
              </button>
            )}

            {notifications.length > 0 && (
              <button
                type="button"
                onClick={clearNotifications}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 shadow-sm transition hover:bg-red-50"
              >
                <Trash2 size={17} />
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Total notifications</p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {notifications.length}
            </p>
          </div>

          <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
            <p className="text-sm text-indigo-600">Unread</p>

            <p className="mt-2 text-2xl font-bold text-indigo-700">
              {unreadCount}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
            <p className="text-sm text-emerald-600">Read</p>

            <p className="mt-2 text-2xl font-bold text-emerald-700">
              {notifications.length - unreadCount}
            </p>
          </div>
        </div>

        {/* Notification list */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <div>
              <h2 className="font-semibold text-slate-900">Recent activity</h2>

              <p className="mt-1 text-sm text-slate-500">
                Your latest workspace notifications.
              </p>
            </div>
          </div>

          {notifications.length > 0 ? (
            <div>
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onRead={markAsRead}
                  onDelete={deleteNotification}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Inbox size={25} />
              </div>

              <h3 className="mt-5 font-semibold text-slate-900">
                You're all caught up
              </h3>

              <p className="mt-1 max-w-sm text-sm text-slate-500">
                There are no notifications in your activity center right now.
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

export default Notifications;
