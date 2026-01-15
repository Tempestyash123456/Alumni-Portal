import express from "express"
import {
  googleOAuth,
  linkedinOAuth,
} from "../controllers/oauth.controller.js"

const router = express.Router()

router.post("/google", googleOAuth)
router.post("/linkedin", linkedinOAuth)

export default router