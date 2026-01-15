import AppLayout from "@/components/layout/AppLayout"
import Card from "@/components/ui/Card"

export default function ServiceFormLayout({ title, children }) {
  return (
    <AppLayout>
      <div className="max-w-xl mx-auto">
        <Card>
          <h1 className="text-xl font-bold mb-4">{title}</h1>
          {children}
        </Card>
      </div>
    </AppLayout>
  )
}