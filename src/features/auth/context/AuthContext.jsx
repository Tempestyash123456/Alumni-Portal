import { createContext, useContext } from "react"
import api from "@/lib/api"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  /* ===== EMAIL / PASSWORD LOGIN ===== */
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password })

    const { token, user } = res.data.data
    localStorage.setItem("token", token)
    localStorage.setItem("user", JSON.stringify(user))

    return user
  }

  /* ===== OAUTH (NO AUTO LOGIN) ===== */
  const oauthLogin = async (provider, payload) => {
    const res = await api.post(`/oauth/${provider}`, payload)
    return res.data.data // { isNewUser, email, provider }
  }

  const logout = () => {
    localStorage.clear()
    window.location.href = "/"
  }

  return (
    <AuthContext.Provider value={{ login, oauthLogin, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)