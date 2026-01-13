import User from "../models/User.js";

export async function getExitSequence(req, res) {
  const user = await User.findById(req.user.id);
  res.json({ exitSequence: user.exitSequence });
}

export async function updateExitSequence(req, res) {
  const { exitSequence } = req.body;

  if (!Array.isArray(exitSequence) || exitSequence.length < 3) {
    return res.status(400).json({ message: "Invalid sequence" });
  }

  await User.findByIdAndUpdate(req.user.id, {
    exitSequence: exitSequence.map((k) => k.toLowerCase())
  });

  res.json({ message: "Exit sequence updated" });
}
