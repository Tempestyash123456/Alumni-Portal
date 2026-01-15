import UpdateStatusModal from "./UpdateStatusModal"
import { useState } from "react"

export default function RequestTable({ requests, refresh }) {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <table className="w-full bg-white shadow rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Alumni</th>
            <th className="p-3">Service</th>
            <th className="p-3">Status</th>
            <th className="p-3">Created</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((r) => (
            <tr key={r._id} className="border-t">
              <td className="p-3">
                <p className="font-medium">{r.user.name}</p>
                <p className="text-sm text-gray-500">
                  {r.user.email}
                </p>
              </td>

              <td className="p-3 capitalize">
                {r.serviceType.replace("-", " ")}
              </td>

              <td className="p-3">
                <span className="px-2 py-1 rounded text-sm bg-gray-200">
                  {r.status}
                </span>
              </td>

              <td className="p-3">
                {new Date(r.createdAt).toLocaleDateString()}
              </td>

              <td className="p-3">
                <button
                  className="text-blue-600 text-sm"
                  onClick={() => setSelected(r)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <UpdateStatusModal
          request={selected}
          close={() => setSelected(null)}
          refresh={refresh}
        />
      )}
    </>
  )
}
