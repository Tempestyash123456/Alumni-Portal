import { Link } from "react-router-dom"

export default function AlumniDashboard() {
  return (
    <div className="p-6">
      <div className="flex justify-end gap-4">
        <Link to="/login" className="border px-4 py-2 rounded">
          Login
        </Link>
        <Link
          to="/register"
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Register
        </Link>
      </div>

      <h1 className="text-2xl font-bold mt-8">
        Welcome to Alumni Portal
      </h1>
    </div>
  )
}