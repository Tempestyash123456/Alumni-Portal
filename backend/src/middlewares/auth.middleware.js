import jwt from "jsonwebtoken"
import { error } from "../utils/response.js"

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return error(res, "Not authorized", 401)
  }

  try {
    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decoded // { id, role }
    next()
  } catch (err) {
    return error(res, "Invalid token", 401)
  }
}
