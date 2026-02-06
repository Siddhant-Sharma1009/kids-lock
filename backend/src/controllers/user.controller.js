import User from "../models/User.js";

export async function getExitSequence(req, res) {
  const user = await User.findById(req.user.id);
  res.json({ exitSequence: user.exitSequence });
}

export async function updateExitSequence(req, res) {
  try {
    const { exitSequence } = req.body;
    if (
      !Array.isArray(exitSequence) ||
      exitSequence.length < 3 ||
      !exitSequence.every(k => typeof k === "string")
    ) {
      return res.status(400).json({ message: "Invalid exit sequence" });
    }

    if (!req.user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        exitSequence: exitSequence.map(k => k.toLowerCase().trim())
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Exit sequence updated successfully" });
  } catch (error) {
    console.error("Update exit sequence error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

