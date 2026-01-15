import { useEffect, useRef } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import useToast from "@/components/feedback/toast/useToast"

export default function LinkedInCallback() {
  const [params] = useSearchParams()
  const code = params.get("code")
  const hasRun = useRef(false)

  const { oauthLogin } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    if (!code || hasRun.current) return
    hasRun.current = true

    const exchange = async () => {
      try {
        const { isNewUser, email } = await oauthLogin("linkedin", {
          code,
          redirectUri:
            "http://localhost:5173/auth/linkedin/callback",
        })

        navigate(isNewUser ? "/register" : "/login", {
          replace: true,
          state: { email, oauth: true },
        })
      } catch {
        toast.error("LinkedIn login failed")
        navigate("/login", { replace: true })
      }
    }

    exchange()
  }, [code])

  return <p className="text-center mt-10">Signing you in…</p>
}
