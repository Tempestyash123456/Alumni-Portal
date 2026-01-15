import ServiceRequest from "../models/ServiceRequest.js"
import { success, error } from "../utils/response.js"

/**
 * CREATE SERVICE REQUEST (ALUMNI)
 */
export const createServiceRequest = async (req, res) => {
  try {
    const { serviceType, payload } = req.body

    if (!serviceType || !payload) {
      return error(res, "Service type and payload are required")
    }

    const request = await ServiceRequest.create({
      user: req.user.id,
      serviceType,
      payload,
    })

    return success(res, request, "Service request submitted")
  } catch (err) {
    console.error(err)
    return error(res, "Failed to create service request", 500)
  }
}

/**
 * GET MY SERVICE REQUESTS (ALUMNI)
 */
export const getMyServiceRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find({
      user: req.user.id,
    }).sort({ createdAt: -1 })

    return success(res, requests)
  } catch (err) {
    console.error(err)
    return error(res, "Failed to fetch requests", 500)
  }
}

/**
 * GET ALL SERVICE REQUESTS (ADMIN)
 */
export const getAllServiceRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 })

    return success(res, requests)
  } catch (err) {
    console.error(err)
    return error(res, "Failed to fetch all requests", 500)
  }
}

/**
 * UPDATE SERVICE REQUEST STATUS (ADMIN)
 */
export const updateServiceRequestStatus = async (req, res) => {
  try {
    const { status, adminRemarks } = req.body

    const request = await ServiceRequest.findById(req.params.id)
    if (!request) {
      return error(res, "Service request not found", 404)
    }

    if (status) request.status = status
    if (adminRemarks) request.adminRemarks = adminRemarks

    await request.save()

    return success(res, request, "Service request updated")
  } catch (err) {
    console.error(err)
    return error(res, "Failed to update request", 500)
  }
}
