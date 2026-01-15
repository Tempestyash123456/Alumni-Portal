import { NavLink } from "react-router-dom"

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-surface">
      <aside className="w-64 bg-secondary text-white p-6">
        <h1 className="text-xl font-bold mb-8">Admin Panel</h1>

        <nav className="space-y-3">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive ? "bg-primary" : "hover:bg-slate-800"
              }`
            }
          >
            Service Requests
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}