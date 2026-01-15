import Card from "@/components/ui/Card"

export default function AuthCard({ title, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card>
          <h1 className="text-xl font-bold mb-6 text-center">
            {title}
          </h1>
          {children}
        </Card>
      </div>
    </div>
  )
}