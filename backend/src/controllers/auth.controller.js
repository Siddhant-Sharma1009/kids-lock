import User from "../models/User.js";
import { verifyPassword, hashPassword } from "../utils/hash.js";
import { signToken } from "../utils/jwt.js";

/**
 * LOGIN
 */
export async function login(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = signToken({
      id: user._id,
      role: user.role,
    });

    // 🔥 CORRECT COOKIE CONFIG FOR RENDER + VERCEL
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,      // REQUIRED (HTTPS)
      sameSite: "none",  // REQUIRED (cross-site)
    });

    res.json({
      user: {
        username: user.username,
        role: user.role,
        exitSequence: user.exitSequence,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
}

/**
 * LOGOUT
 */
export function logout(_, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.json({ message: "Logged out" });
}

/**
 * REGISTER
 */
export async function register(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const exists = await User.findOne({ username });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      username,
      passwordHash: await hashPassword(password),
      role: "PARENT",
      exitSequence: ["e", "x", "i", "t"],
    });

    res.status(201).json({
      message: "Parent created successfully",
      user: { username: user.username },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
}
