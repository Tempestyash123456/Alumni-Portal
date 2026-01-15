const stats = [
  { label: "Registered Alumni", value: "25,000+" },
  { label: "Countries", value: "40+" },
  { label: "Chapters", value: "120+" },
  { label: "Events Hosted", value: "300+" },
]

export default function StatsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
