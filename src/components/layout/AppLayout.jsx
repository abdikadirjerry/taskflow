import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function AppLayout({ children, pageTitle = "Dashboard" }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function closeMobileMenu() {
    setMobileOpen(false);
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={closeMobileMenu}
        activePage={pageTitle}
      />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Topbar pageTitle={pageTitle} onMenuClick={() => setMobileOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px]">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
