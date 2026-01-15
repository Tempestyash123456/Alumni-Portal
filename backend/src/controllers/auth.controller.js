import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { success, error } from "../utils/response.js"

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  )
}

/**
 * REGISTER
 */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return error(res, "All fields are required")
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return error(res, "User already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    const token = generateToken(user)

    return success(res, {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }, "Registration successful")
  } catch (err) {
    console.error(err)
    return error(res, "Registration failed", 500)
  }
}

/**
 * LOGIN
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return error(res, "Email and password required")
    }

    const user = await User.findOne({ email }).select("+password")
    if (!user) {
      return error(res, "Invalid credentials", 401)
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return error(res, "Invalid credentials", 401)
    }

    const token = generateToken(user)

    return success(res, {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    }, "Login successful")
  } catch (err) {
    console.error(err)
    return error(res, "Login failed", 500)
  }
}

/**
 * CREATE ADMIN (ADMIN ONLY)
 */
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return error(res, "All fields are required")
    }

    const existing = await User.findOne({ email })
    if (existing) {
      return error(res, "User already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    })

    return success(
      res,
      {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
      "Admin created successfully"
    )
  } catch (err) {
    console.error(err)
    return error(res, "Failed to create admin", 500)
  }
}

/**
 * BOOTSTRAP ADMIN (ONE-TIME ONLY)
 */
export const bootstrapAdmin = async (req, res) => {
  try {
    const secret = req.headers["x-bootstrap-secret"]

    if (!secret || secret !== process.env.BOOTSTRAP_SECRET) {
      return error(res, "Invalid bootstrap secret", 403)
    }

    const adminExists = await User.findOne({ role: "admin" })
    if (adminExists) {
      return error(res, "Admin already exists", 400)
    }

    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return error(res, "All fields are required")
    }

    const existing = await User.findOne({ email })
    if (existing) {
      return error(res, "User already exists")
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const admin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    })

    return success(
      res,
      {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
      "Bootstrap admin created successfully"
    )
  } catch (err) {
    console.error(err)
    return error(res, "Bootstrap failed", 500)
  }
}
