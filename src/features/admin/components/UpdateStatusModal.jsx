import { useState } from "react"
import api from "@/lib/api"
import useToast from "@/components/feedback/toast/useToast"

export default function UpdateStatusModal({ request, close, refresh }) {
  const toast = useToast()
  const [status, setStatus] = useState(request.status)
  const [remarks, setRemarks] = useState(request.adminRemarks || "")
  const [loading, setLoading] = useState(false)

  const handleUpdate = async () => {
    try {
      setLoading(true)

      await api.patch(`/services/${request._id}`, {
        status,
        adminRemarks: remarks,
      })

      toast.success("Request updated")
      close()
      refresh()
    } catch (err) {
      toast.error("Failed to update request")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">
          Update Request
        </h2>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="completed">Completed</option>
        </select>

        <textarea
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Admin remarks"
          className="w-full border p-2 rounded mb-4"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={close}
            className="px-4 py-2 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  )
}
