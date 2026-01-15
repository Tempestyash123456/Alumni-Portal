import { error } from "../utils/response.js"

export const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return error(res, "Access denied", 403)
    }
    next()
  }
}
