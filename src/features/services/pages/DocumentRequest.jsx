import ServiceFormLayout from "../components/ServiceFormLayout"
import Button from "@/components/ui/Button"
import api from "@/lib/api"
import useToast from "@/components/feedback/toast/useToast"
import useFormState from "@/hooks/useFormState"

export default function DocumentRequest() {
  const toast = useToast()
  const form = useFormState()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const documentType = e.target.documentType.value
    const purpose = e.target.purpose.value.trim()

    if (!documentType || !purpose) {
      toast.error("All fields are required.")
      return
    }

    try {
      form.start()

      await api.post("/services", {
        serviceType: "document-request",
        payload: {
          documentType,
          purpose,
        },
      })

      toast.success("Document request submitted successfully.")
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
    <ServiceFormLayout title="Document Request">
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="documentType"
          className="w-full border p-2 rounded"
        >
          <option value="">Select Document</option>
          <option value="Transcript">Transcript</option>
          <option value="Degree Certificate">Degree Certificate</option>
          <option value="Bonafide">Bonafide</option>
        </select>

        <textarea
          name="purpose"
          placeholder="Purpose"
          className="w-full border p-2 rounded"
        />

        <Button type="submit" loading={form.loading}>
          Submit Request
        </Button>
      </form>
    </ServiceFormLayout>
  )
}
