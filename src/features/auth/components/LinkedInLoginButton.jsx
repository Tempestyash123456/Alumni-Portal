export default function LinkedInLoginButton() {
  const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID
  const redirectUri = "http://localhost:5173/auth/linkedin/callback"
  const scope = "openid profile"

  const authUrl =
    "https://www.linkedin.com/oauth/v2/authorization" +
    `?response_type=code` +
    `&client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent(scope)}`

  return (
    <a
      href={authUrl}
      className="w-[320px] mx-auto flex justify-center border py-2 rounded-lg"
    >
      Continue with LinkedIn
    </a>
  )
}
