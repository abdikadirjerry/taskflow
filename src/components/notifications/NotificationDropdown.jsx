import { Bell, CheckCheck, Inbox } from "lucide-react";
import { Link } from "react-router-dom";
import NotificationItem from "./NotificationItem";
import { useNotifications } from "../../context/NotificationContext";

function NotificationDropdown({ onClose }) {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  const recentNotifications = notifications.slice(0, 5);

  return (
    <div className="absolute right-0 top-14 z-50 w-[calc(100vw-2rem)] max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <div>
          <h2 className="font-semibold text-slate-900">Notifications</h2>

          <p className="text-xs text-slate-500">
            {unreadCount > 0
              ? `${unreadCount} unread notification${
                  unreadCount === 1 ? "" : "s"
                }`
              : "You're all caught up"}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700"
          >
            <CheckCheck size={15} />
            Mark all read
          </button>
        )}
      </div>

      {recentNotifications.length > 0 ? (
        <div className="max-h-[420px] overflow-y-auto">
          {recentNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onRead={markAsRead}
              onDelete={deleteNotification}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
            <Inbox size={22} />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-slate-900">
            No notifications
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            New workspace activity will appear here.
          </p>
        </div>
      )}

      <div className="border-t border-slate-200 p-3">
        <Link
          to="/notifications"
          onClick={onClose}
          className="flex items-center justify-center rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
        >
          View all notifications
        </Link>
      </div>
    </div>
  );
}

export default NotificationDropdown;
