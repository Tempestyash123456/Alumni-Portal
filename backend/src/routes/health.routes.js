import { Router } from "express"

const router = Router()

router.get("/", (req, res) => {
  res.json({ status: "OK", message: "Backend running" })
})

export default router