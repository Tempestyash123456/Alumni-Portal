import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import useToast from "@/components/feedback/toast/useToast"
import api from "@/lib/api"

export default function Register() {
  const navigate = useNavigate()
  const toast = useToast()
  const { user } = useAuth()
  const location = useLocation()

  const isOAuth = location.state?.oauth === true

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    batch: "",
    department: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.name || !form.email || !form.batch || !form.department) {
      toast.error("Please complete all required fields")
      return
    }

    try {
      await api.post("/auth/complete-profile", form)
      toast.success("Profile completed successfully")
      navigate("/dashboard", { replace: true })
    } catch (err) {
      console.error(err)
      toast.error("Failed to complete registration")
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-indigo-600">
            Alumni Portal
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Complete your profile to continue
          </p>
        </div>

        {/* Progress */}
        <div className="text-xs text-slate-500 mb-4 text-center">
          Step 1 of 2 – Basic Profile
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            disabled={isOAuth}
          />

          {!isOAuth && (
            <Input
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          )}

          <Input
            label="Graduation Batch"
            name="batch"
            placeholder="e.g. 2022"
            value={form.batch}
            onChange={handleChange}
          />

          <Input
            label="Department / Program"
            name="department"
            placeholder="e.g. Computer Science"
            value={form.department}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="
              w-full bg-indigo-600 text-white
              py-2 rounded-lg font-medium
              hover:bg-indigo-700 transition
            "
          >
            Complete Registration
          </button>
        </form>
      </div>
    </div>
  )
}

/* ---------- Reusable Input ---------- */

function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  disabled = false,
}) {
  return (
    <div>
      <label className="block text-sm text-slate-600 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          w-full px-3 py-2 border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          ${
            disabled
              ? "bg-slate-100 cursor-not-allowed"
              : "border-slate-300"
          }
        `}
      />
    </div>
  )
}