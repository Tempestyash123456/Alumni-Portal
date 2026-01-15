import ServiceFormLayout from "../components/ServiceFormLayout"
import Button from "@/components/ui/Button"
import api from "@/lib/api"
import useToast from "@/components/feedback/toast/useToast"
import useFormState from "@/hooks/useFormState"

export default function CareerSupport() {
  const toast = useToast()
  const form = useFormState()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const message = e.target.message.value.trim()

    if (!message) {
      toast.error("Please describe your career requirement.")
      return
    }

    try {
      form.start()

      await api.post("/services", {
        serviceType: "career-support",
        payload: {
          message,
        },
      })

      toast.success("Career support request submitted.")
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
    <ServiceFormLayout title="Career Support">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          name="message"
          placeholder="Describe your career requirement"
          className="w-full border p-2 rounded"
        />

        <Button type="submit" loading={form.loading}>
          Request Support
        </Button>
      </form>
    </ServiceFormLayout>
  )
}
