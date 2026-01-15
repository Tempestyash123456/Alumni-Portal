import AppLayout from "@/components/layout/AppLayout"
import HeroSection from "./components/HeroSection"
import StatsSection from "./components/StatsSection"

export default function HomePage() {
  return (
    <AppLayout>
        <HeroSection />
        <StatsSection />
    </AppLayout>
  )
}