import dns from "dns"
import https from "https"
import axios from "axios"
dns.setDefaultResultOrder("ipv4first");
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { success, error } from "../utils/response.js";

const ipv4Agent = new https.Agent({
  family: 4, // force IPv4
  keepAlive: true,
});

const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

/* ================= GOOGLE OAUTH ================= */
export const googleOAuth = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return error(res, "ID token required", 400);

    // ✅ Verify ID token with Google
    const googleRes = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`
    );

    const { sub, name, email } = googleRes.data;

    let user = await User.findOne({ email, provider: "google" });
    let isNewUser = false;

    if (!user) {
      user = await User.create({
        name,
        email,
        provider: "google",
        providerId: sub,
        role: "alumni",
        isProfileComplete: false,
      });
      isNewUser = true;
    }

    const token = generateToken(user);

    return success(res, {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      isNewUser,
    });
  } catch (err) {
    console.error(err.response?.data || err);
    return error(res, "Google OAuth failed", 400);
  }
};

/* ================= LINKEDIN OAUTH ================= */
export const linkedinOAuth = async (req, res) => {
  try {
    const { code, redirectUri } = req.body;
    if (!code || !redirectUri)
      return error(res, "Missing OAuth parameters", 400);

    // ✅ CONFIDENTIAL CLIENT FLOW (REQUIRED)
    const tokenRes = await axios.post(
  "https://www.linkedin.com/oauth/v2/accessToken",
  null,
  {
    params: {
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      client_id: process.env.LINKEDIN_CLIENT_ID,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    httpsAgent: ipv4Agent, // 🔥 FORCE IPV4 HERE
    timeout: 10000,
  }
)


    const accessToken = tokenRes.data.access_token;

    const profileRes = await axios.get("https://api.linkedin.com/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      httpsAgent: ipv4Agent, // 🔥 force IPv4
      timeout: 10000, // avoid infinite hang
    });

    const { sub, name, email } = profileRes.data;

    let user = email
      ? await User.findOne({ email, provider: "linkedin" })
      : await User.findOne({ providerId: sub, provider: "linkedin" });

    let isNewUser = false;

    if (!user) {
      user = await User.create({
        name,
        email: email || null,
        provider: "linkedin",
        providerId: sub,
        role: "alumni",
        isProfileComplete: false,
      });
      isNewUser = true;
    }

    const token = generateToken(user);

    return success(res, {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      isNewUser,
    });
  } catch (err) {
    console.error("LinkedIn OAuth error:", err.response?.data || err);
    return error(res, "LinkedIn login failed", 400);
  }
};
