import { useNavigate } from "react-router-dom"
import { SERVICES } from "@/features/services/config/servicesConfig"

export default function ServicesWidget() {
  const navigate = useNavigate()

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Quick Services</h2>

      <ul className="space-y-2">
        {SERVICES.map((service) => (
          <li
            key={service.key}
            onClick={() => navigate(service.route)}
            className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer text-sm"
          >
            {service.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
