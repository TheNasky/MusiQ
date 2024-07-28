import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  url: { type: String, required: true },
  addedBy: { type: String, required: true },
  addedAt: { type: Date, default: Date.now },
});

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  adminPassword: { type: String, required: true },
  isPrivate: { type: Boolean, default: true },
  code: { type: String, required: true, unique: true },
  songs: [songSchema],
  currentSong: { type: songSchema, default: null },
  users: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

export const ListModel = mongoose.model("List", listSchema);
