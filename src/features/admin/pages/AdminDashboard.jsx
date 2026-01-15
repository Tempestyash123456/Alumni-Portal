import { useEffect, useState } from "react"
import AdminLayout from "@/components/layout/AdminLayout"
import api from "@/lib/api"
import useToast from "@/components/feedback/toast/useToast"
import RequestTable from "../components/RequestTable"

export default function AdminDashboard() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  const fetchRequests = async () => {
    try {
      const res = await api.get("/services")
      setRequests(res.data.data)
    } catch (err) {
      toast.error("Failed to load service requests")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">
        Service Requests
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <RequestTable
          requests={requests}
          refresh={fetchRequests}
        />
      )}
    </AdminLayout>
  )
}
