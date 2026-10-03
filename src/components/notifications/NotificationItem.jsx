import {
  Bell,
  CheckCircle2,
  FolderKanban,
  ListTodo,
  Users,
  X,
} from "lucide-react";

const iconMap = {
  task: ListTodo,
  project: FolderKanban,
  team: Users,
  success: CheckCircle2,
  system: Bell,
};

function formatNotificationTime(time) {
  const date = new Date(time);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  const now = new Date();
  const difference = now.getTime() - date.getTime();

  const minutes = Math.floor(difference / 60000);

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days}d ago`;
  }

  return date.toLocaleDateString();
}

function NotificationItem({ notification, onRead, onDelete }) {
  const Icon = iconMap[notification.type] || Bell;

  return (
    <div
      className={[
        "group relative flex gap-3 border-b border-slate-100 p-4 transition",
        notification.read ? "bg-white" : "bg-indigo-50/50",
      ].join(" ")}
    >
      <div
        className={[
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
          notification.read
            ? "bg-slate-100 text-slate-500"
            : "bg-indigo-100 text-indigo-600",
        ].join(" ")}
      >
        <Icon size={18} />
      </div>

      <div className="min-w-0 flex-1 pr-6">
        <div className="flex items-start gap-2">
          <h3
            className={[
              "text-sm",
              notification.read
                ? "font-medium text-slate-700"
                : "font-semibold text-slate-900",
            ].join(" ")}
          >
            {notification.title}
          </h3>

          {!notification.read && (
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-600" />
          )}
        </div>

        <p className="mt-1 text-sm leading-5 text-slate-500">
          {notification.message}
        </p>

        <p className="mt-2 text-xs text-slate-400">
          {formatNotificationTime(notification.time)}
        </p>

        {!notification.read && (
          <button
            type="button"
            onClick={() => onRead(notification.id)}
            className="mt-2 text-xs font-medium text-indigo-600 hover:text-indigo-700"
          >
            Mark as read
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={() => onDelete(notification.id)}
        aria-label="Delete notification"
        className="absolute right-3 top-3 rounded-lg p-1.5 text-slate-400 opacity-0 transition hover:bg-slate-100 hover:text-slate-600 group-hover:opacity-100"
      >
        <X size={16} />
      </button>
    </div>
  );
}

export default NotificationItem;
