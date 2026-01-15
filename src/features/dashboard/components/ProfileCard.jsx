import { useAuth } from "@/features/auth/context/AuthContext"

export default function ProfileCard() {
  const { user } = useAuth()

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-2">Welcome</h2>
      <p className="text-xl font-bold">{user?.name}</p>
      <p className="text-sm text-gray-500 mt-2">
        Membership Status: <span className="text-green-600">Active</span>
      </p>
    </div>
  )
}
