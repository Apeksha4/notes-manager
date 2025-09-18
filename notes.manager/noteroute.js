import express from "express";
import Note from "../models/Note.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all notes
router.get("/", protect, async (req, res) => {
  const notes = await Note.find({ user: req.user });
  res.json(notes);
});

// Add note
router.post("/", protect, async (req, res) => {
  const { title, description } = req.body;
  const note = await Note.create({ user: req.user, title, description });
  res.json(note);
});

// Edit note
router.put("/:id", protect, async (req, res) => {
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedNote);
});
// Delete note
router.delete("/:id", protect, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
});

export default router;
