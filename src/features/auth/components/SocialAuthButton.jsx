export default function SocialAuthButton({ provider, onClick }) {
  const styles = {
    google: "bg-white text-gray-800 border hover:bg-gray-50",
    linkedin: "bg-[#0A66C2] text-white hover:bg-[#004182]",
  }

  const labels = {
    google: "Continue with Google",
    linkedin: "Continue with LinkedIn",
  }

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-center gap-3 px-4 py-2 rounded-lg border transition ${styles[provider]}`}
    >
      {labels[provider]}
    </button>
  )
}
