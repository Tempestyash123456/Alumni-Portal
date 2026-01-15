import { Link } from "react-router-dom"
import { useAuth } from "@/features/auth/context/AuthContext"

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="sticky top-0 z-40 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="font-bold text-primary">
          Alumni Portal
        </Link>

        <div className="flex gap-4 items-center text-sm">
          {!user && <Link to="/login">Login</Link>}

          {user && (
            <>
              {user.role === "alumni" && (
                <Link to="/dashboard">Dashboard</Link>
              )}
              {user.role === "admin" && (
                <Link to="/admin">Admin</Link>
              )}
              <button
                onClick={logout}
                className="text-danger"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}