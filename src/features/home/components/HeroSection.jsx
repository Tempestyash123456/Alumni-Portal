import { motion } from "framer-motion"
import Button from "@/components/ui/Button"

export default function HeroSection() {
  return (
    <section className="py-24 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold mb-6"
      >
        Alumni Portal
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 max-w-2xl mx-auto mb-8"
      >
        Stay connected with your university, network with alumni, and access exclusive services.
      </motion.p>

      <Button>Join the Network</Button>
    </section>
  )
}
