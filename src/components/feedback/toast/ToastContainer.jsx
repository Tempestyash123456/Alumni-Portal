import Toast from "./Toast"

export default function ToastContainer({ toasts }) {
  return (
    <div className="fixed top-5 right-5 z-50 space-y-3">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  )
}
