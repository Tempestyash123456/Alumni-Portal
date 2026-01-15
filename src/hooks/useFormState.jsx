import { useState } from "react"

export default function useFormState() {
  const [loading, setLoading] = useState(false)

  const start = () => setLoading(true)
  const succeed = () => setLoading(false)
  const fail = () => setLoading(false)

  return {
    loading,
    start,
    succeed,
    fail,
  }
}
