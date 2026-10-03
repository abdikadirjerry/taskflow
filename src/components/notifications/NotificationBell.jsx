import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNotifications } from "../../context/NotificationContext";
import NotificationDropdown from "./NotificationDropdown";

function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const { unreadCount } = useNotifications();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label="Open notifications"
        aria-expanded={isOpen}
        className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
      >
        <Bell size={20} />

        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold leading-none text-white ring-2 ring-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && <NotificationDropdown onClose={() => setIsOpen(false)} />}
    </div>
  );
}

export default NotificationBell;
