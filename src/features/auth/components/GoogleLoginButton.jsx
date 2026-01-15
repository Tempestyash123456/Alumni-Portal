import { GoogleLogin } from "@react-oauth/google"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import useToast from "@/components/feedback/toast/useToast"

export default function GoogleLoginButton() {
  const { oauthLogin } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  const handleSuccess = async (res) => {
    try {
      const { isNewUser, email } = await oauthLogin("google", {
        idToken: res.credential,
      })

      navigate(isNewUser ? "/register" : "/login", {
        replace: true,
        state: { email, oauth: true },
      })
    } catch {
      toast.error("Google login failed")
    }
  }

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => toast.error("Google login failed")}
      width="320"
    />
  )
}
