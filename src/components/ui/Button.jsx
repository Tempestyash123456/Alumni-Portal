export default function Button({
  children,
  loading,
  variant = "primary",
  ...props
}) {
  const styles = {
    primary: "bg-primary text-white hover:bg-blue-700",
    secondary: "bg-slate-200 hover:bg-slate-300",
    danger: "bg-danger text-white hover:bg-red-600",
  }

  return (
    <button
      {...props}
      disabled={loading}
      className={`w-full px-4 py-2 rounded-xl font-medium transition ${
        styles[variant]
      } ${loading && "opacity-60 cursor-not-allowed"}`}
    >
      {loading ? "Processing..." : children}
    </button>
  )
}