import User from "../models/User.js";
import { verifyPassword, hashPassword } from "../utils/hash.js";
import { signToken } from "../utils/jwt.js";

/**
 * LOGIN
 */
export async function login(req, res) {
  const { username, password } = req.body;

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

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
  });

  res.json({
    user: {
      username: user.username,
      role: user.role,
      exitSequence: user.exitSequence,
    },
  });
}

/**
 * LOGOUT
 */
export function logout(_, res) {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
}

/**
 * REGISTER NEW PARENT (ADMIN ONLY)
 */
export async function register(req, res) {
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

  res.json({
    message: "Parent created successfully",
    user: { username: user.username },
  });
}
