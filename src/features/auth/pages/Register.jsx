import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import api from "@/lib/api"
import useToast from "@/components/feedback/toast/useToast"

export default function Register() {
  const location = useLocation()
  const navigate = useNavigate()
  const toast = useToast()

  const isOAuth = location.state?.oauth === true

  const [form, setForm] = useState({
    name: "",
    email: location.state?.email || "",
    password: "",
    batch: "",
    department: "",
  })

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await api.post("/auth/complete-profile", form)
      toast.success("Registration complete")
      navigate("/login", { replace: true })
    } catch {
      toast.error("Registration failed")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-16 space-y-4"
    >
      <input
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        name="email"
        value={form.email}
        disabled={isOAuth}
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded bg-slate-100"
      />

      {!isOAuth && (
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      )}

      <input
        name="batch"
        placeholder="Graduation Batch"
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />

      <input
        name="department"
        placeholder="Department"
        onChange={handleChange}
        className="w-full border px-3 py-2 rounded"
      />

      <button className="w-full bg-indigo-600 text-white py-2 rounded">
        Complete Registration
      </button>
    </form>
  )
}