import ServiceFormLayout from "../components/ServiceFormLayout"
import Button from "@/components/ui/Button"
import api from "@/lib/api"
import useToast from "@/components/feedback/toast/useToast"
import useFormState from "@/hooks/useFormState"

export default function LibraryAccess() {
  const toast = useToast()
  const form = useFormState()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const library = e.target.library.value.trim()

    if (!library) {
      toast.error("Library name is required.")
      return
    }

    try {
      form.start()

      await api.post("/services", {
        serviceType: "library-access",
        payload: {
          library,
        },
      })

      toast.success("Library access request submitted.")
      e.target.reset()
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to submit request"
      )
    } finally {
      form.succeed()
    }
  }

  return (
    <ServiceFormLayout title="Library Access">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="library"
          placeholder="Preferred Library"
          className="w-full border p-2 rounded"
        />

        <Button type="submit" loading={form.loading}>
          Request Access
        </Button>
      </form>
    </ServiceFormLayout>
  )
}
