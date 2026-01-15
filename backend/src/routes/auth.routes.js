import { Router } from "express"
import {
  register,
  login,
  createAdmin,
} from "../controllers/auth.controller.js"
import { protect } from "../middlewares/auth.middleware.js"
import { allowRoles } from "../middlewares/role.middleware.js"
import { bootstrapAdmin } from "../controllers/auth.controller.js"

const router = Router()

router.post("/register", register)
router.post("/login", login)

/**
 * Admin-only route
 */
router.post(
  "/create-admin",
  protect,
  allowRoles("admin"),
  createAdmin
)

export default router
