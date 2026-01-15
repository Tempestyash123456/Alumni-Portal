import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import rateLimit from "express-rate-limit"
import oauthRoutes from "./routes/oauth.routes.js"
import healthRoutes from "./routes/health.routes.js"
import authRoutes from "./routes/auth.routes.js"
import serviceRoutes from "./routes/service.routes.js"

const app = express()

// Security
app.use(helmet())
app.use(cors({ origin: "http://localhost:5173", credentials: true }))

// Rate limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
)

// Logging
app.use(morgan("dev"))

// Body parser
app.use(express.json())

// Routes
app.use("/api/health", healthRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/services", serviceRoutes)
app.use("/api/oauth", oauthRoutes)

export default app