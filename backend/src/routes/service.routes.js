import { Router } from "express"
import {
  createServiceRequest,
  getMyServiceRequests,
  getAllServiceRequests,
  updateServiceRequestStatus,
} from "../controllers/service.controller.js"

import { protect } from "../middlewares/auth.middleware.js"
import { allowRoles } from "../middlewares/role.middleware.js"

const router = Router()

// All routes below are protected
router.use(protect)

/**
 * Alumni routes
 */
router.post("/", allowRoles("alumni"), createServiceRequest)
router.get("/me", allowRoles("alumni"), getMyServiceRequests)

/**
 * Admin routes
 */
router.get("/", allowRoles("admin"), getAllServiceRequests)
router.patch("/:id", allowRoles("admin"), updateServiceRequestStatus)

export default router
