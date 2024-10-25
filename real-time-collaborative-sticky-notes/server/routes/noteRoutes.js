const express = require("express");
const Note = require("../models/noteModel");
const router = express.Router();

// Get all notes
router.get("/", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

// Add a new note
router.post("/", async (req, res) => {
  const { content, position } = req.body;
  const note = await Note.create({ content, position });
  res.status(201).json(note);
});

// Update note position
router.put("/:id", async (req, res) => {
  const { position } = req.body;
  const note = await Note.findByIdAndUpdate(req.params.id, { position }, { new: true });
  res.json(note);
});

// Delete a note
router.delete("/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
});

module.exports = router;
