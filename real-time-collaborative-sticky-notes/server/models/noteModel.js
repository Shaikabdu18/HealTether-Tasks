const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  content: { type: String, required: true },
  position: {
    x: { type: Number, default: 0 },
    y: { type: Number, default: 0 },
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Note", NoteSchema);
