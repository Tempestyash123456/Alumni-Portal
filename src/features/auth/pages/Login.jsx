import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import useToast from "@/components/feedback/toast/useToast"

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()
  const location = useLocation()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate("/dashboard", { replace: true })
    } catch {
      toast.error("Invalid credentials")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 space-y-4"
    >
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full border px-3 py-2 rounded"
      />
      <button className="w-full bg-indigo-600 text-white py-2 rounded">
        Login
      </button>
    </form>
  )
}
