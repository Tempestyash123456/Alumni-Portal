import { useToast as useToastContext } from "./ToastProvider"

export default function useToast() {
  const { addToast } = useToastContext()

  return {
    success: (msg) => addToast({ type: "success", message: msg }),
    error: (msg) => addToast({ type: "error", message: msg }),
    info: (msg) => addToast({ type: "info", message: msg }),
  }
}
