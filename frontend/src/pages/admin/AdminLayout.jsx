import { useState } from "react";
import { NavLink, Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";

const links = [
  {
    to: "/admin/dashboard",
    label: "Dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    to: "/admin/products",
    label: "Products",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    to: "/admin/repairs",
    label: "Repairs",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
  },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const token = localStorage.getItem("dcs_admin_token");
  const name = localStorage.getItem("dcs_admin_name") || "Owner";

  if (!token) return <Navigate to="/admin/login" replace />;

  const logout = () => {
    localStorage.removeItem("dcs_admin_token");
    localStorage.removeItem("dcs_admin_name");
    navigate("/admin/login");
  };

  const currentTab = links.find((l) => location.pathname.startsWith(l.to))?.label || "Admin";

  return (
    <div className="h-screen max-h-screen w-full max-w-full overflow-hidden bg-base-bg text-ink flex flex-col md:flex-row">
      {/* Mobile Sticky Header */}
      <header className="md:hidden shrink-0 bg-surface/90 backdrop-blur-md border-b border-border px-4 py-3 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber/15 border border-amber/30 flex items-center justify-center text-amber font-bold text-sm">
            DCS
          </div>
          <div>
            <h1 className="font-display font-semibold text-sm leading-none text-ink">{currentTab}</h1>
            <span className="text-[11px] text-muted font-mono">{name}</span>
          </div>
        </div>

        <button
          onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
          className="p-2 rounded-lg bg-surfacealt border border-border text-muted hover:text-ink transition-colors flex items-center gap-1.5 text-xs font-medium"
        >
          {mobileDrawerOpen ? (
            <svg className="w-5 h-5 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </header>

      {/* Mobile Slide-Out Drawer Overlay */}
      {mobileDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative ml-auto w-64 max-w-[80vw] bg-surface border-l border-border h-full p-5 flex flex-col z-50 shadow-2xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
              <div>
                <p className="font-display font-semibold text-sm text-ink">Deep Computer Admin</p>
                <p className="text-xs text-amber font-mono mt-0.5">{name}</p>
              </div>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="text-muted hover:text-ink p-1"
              >
                ✕
              </button>
            </div>

            <nav className="flex flex-col gap-1.5">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setMobileDrawerOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 text-sm px-3.5 py-2.5 rounded-lg transition-all ${
                      isActive
                        ? "bg-amber/15 text-amber font-semibold border border-amber/30"
                        : "text-muted hover:text-ink hover:bg-surfacealt"
                    }`
                  }
                >
                  {l.icon}
                  <span>{l.label}</span>
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto pt-4 border-t border-border">
              <button
                onClick={() => {
                  setMobileDrawerOpen(false);
                  logout();
                }}
                className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 text-sm font-semibold text-alert hover:bg-alert/10 rounded-lg transition-colors border border-alert/20"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="w-60 shrink-0 bg-surface border-r border-border p-6 hidden md:flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-xl bg-amber/15 border border-amber/30 flex items-center justify-center text-amber font-bold text-base">
            DCS
          </div>
          <div>
            <p className="font-display font-semibold text-sm leading-none">Admin Panel</p>
            <p className="text-xs text-amber font-mono mt-1">{name}</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1.5">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `flex items-center gap-3 text-sm px-3.5 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? "bg-amber/15 text-amber font-semibold border border-amber/30"
                    : "text-muted hover:text-ink hover:bg-surfacealt"
                }`
              }
            >
              {l.icon}
              <span>{l.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-border">
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted hover:text-alert hover:bg-alert/10 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 max-w-full overflow-y-auto overflow-x-hidden p-4 sm:p-6 md:p-10 pb-20 md:pb-10">
        <Outlet />
      </main>

      {/* Mobile Fixed Bottom Navigation Bar (1-Tap Switching) */}
      <nav className="md:hidden shrink-0 bg-surface/95 backdrop-blur-lg border-t border-border px-2 py-1.5 flex justify-around items-center z-30">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                isActive ? "text-amber" : "text-muted hover:text-ink"
              }`
            }
          >
            {l.icon}
            <span>{l.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
