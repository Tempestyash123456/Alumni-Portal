import ServiceFormLayout from "../components/ServiceFormLayout"
import Button from "@/components/ui/Button"
import api from "@/lib/api"
import useToast from "@/components/feedback/toast/useToast"
import useFormState from "@/hooks/useFormState"

export default function GatePass() {
  const toast = useToast()
  const form = useFormState()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const date = e.target.date.value

    if (!date) {
      toast.error("Please select a date.")
      return
    }

    try {
      form.start()

      await api.post("/services", {
        serviceType: "gate-pass",
        payload: {
          date,
        },
      })

      toast.success("Gate pass request submitted.")
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
    <ServiceFormLayout title="Gate Pass">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          name="date"
          className="w-full border p-2 rounded"
        />

        <Button type="submit" loading={form.loading}>
          Generate Gate Pass
        </Button>
      </form>
    </ServiceFormLayout>
  )
}
