export default function Toast({ type, message }) {
  const colors = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
  }

  return (
    <div
      className={`${colors[type]} text-white px-4 py-3 rounded-lg shadow`}
    >
      {message}
    </div>
  )
}
