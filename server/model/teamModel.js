const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // The team creator is the admin
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // Team members
});

module.exports = mongoose.model("Team", TeamSchema);