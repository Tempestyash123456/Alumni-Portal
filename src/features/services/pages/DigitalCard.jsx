import ServiceFormLayout from "../components/ServiceFormLayout"
import Button from "@/components/ui/Button"
import useToast from "@/components/feedback/toast/useToast"

export default function DigitalCard() {
  const toast = useToast()

  const handleDownload = () => {
    toast.info("Digital card generation will be available soon.")
  }

  return (
    <ServiceFormLayout title="Digital Alumni Card">
      <p className="mb-4 text-gray-600">
        Download your official digital alumni ID card.
      </p>

      <Button onClick={handleDownload}>
        Download Card
      </Button>
    </ServiceFormLayout>
  )
}
