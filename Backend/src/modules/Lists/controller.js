import { ListModel } from "./schema.js";
import { resSuccess, resFail } from "../../config/utils/response.js";
import { v4 as uuidv4 } from "uuid";
import argon2 from "argon2";
import { io } from "../../app.js";

// Create a new list
export const createList = async (req, res) => {
  const { name, adminPassword, isPrivate } = req.body;
  const hashedPassword = await argon2.hash(adminPassword);
  const code = uuidv4().slice(0, 8); // Generate a unique 8-character code

  const newList = new ListModel({
    name,
    adminPassword: hashedPassword,
    isPrivate,
    code,
  });

  try {
    await newList.save();
    return resSuccess(res, 201, "List created successfully", { code });
  } catch (error) {
    return resFail(res, 500, "Failed to create list", error.message);
  }
};

// Join a list
export const joinList = async (req, res) => {
  const { code, username } = req.body;

  try {
    const list = await ListModel.findOne({ code });
    if (!list) {
      return resFail(res, 404, "List not found");
    }

    if (list.isPrivate && !list.users.includes(username)) {
      return resSuccess(res, 200, "Request sent to admin for approval");
    } else {
      list.users.push(username);
      await list.save();
      return resSuccess(res, 200, "Joined list successfully", { list });
    }
  } catch (error) {
    return resFail(res, 500, "Failed to join list", error.message);
  }
};

// Add a song to the list
export const addSong = async (req, res) => {
  const { code, title, artist, url, addedBy } = req.body;

  try {
    const list = await ListModel.findOne({ code });
    if (!list) {
      return resFail(res, 404, "List not found");
    }

    const newSong = { title, artist, url, addedBy };
    list.songs.push(newSong);
    await list.save();
    
    // Emit the updated playlist to all clients in the room
    io.to(code).emit("playlistUpdated", list);
    
    return resSuccess(res, 200, "Song added successfully", { list });
  } catch (error) {
    return resFail(res, 500, "Failed to add song", error.message);
  }
};

// Delete a song (admin only)
export const deleteSong = async (req, res) => {
  const { code, songId, adminPassword } = req.body;

  try {
    const list = await ListModel.findOne({ code });
    if (!list) {
      return resFail(res, 404, "List not found");
    }

    const isPasswordValid = await argon2.verify(list.adminPassword, adminPassword);
    if (!isPasswordValid) {
      return resFail(res, 403, "Invalid admin password");
    }

    list.songs.pull({ _id: songId });
    await list.save();
    
    // Emit the updated playlist to all clients in the room
    io.to(code).emit("playlistUpdated", list);
    
    return resSuccess(res, 200, "Song deleted successfully", { list });
  } catch (error) {
    return resFail(res, 500, "Failed to delete song", error.message);
  }
};

export const getList = async (req, res) => {
  const code = req.params.code
  const username = req.query.username
  console.log(code)
  console.log(username)
  try {
    const list = await ListModel.findOne({ code });
    if (!list) {
      return resFail(res, 404, "List not found");
    }
    if (list.isPrivate && !list.users.includes(username)) {
      return resFail(res, 403, "User is not on the list");
    }
    return resSuccess(res, 200, "List found", { list });
  } catch (error) {
    return resFail(res, 400, "List not found", error.message);
  }
};

export const playNextSong = async (req, res) => {
  const { code, songId } = req.body;

  try {
    const list = await ListModel.findOne({ code });
    if (!list) {
      return resFail(res, 404, "List not found");
    }

    const song = list.songs.id(songId);
    if (!song) {
      return resFail(res, 404, "Song not found");
    }

    list.currentSong = song;
    list.songs.pull(songId);
    await list.save();
    
    // Emit the updated playlist to all clients in the room
    io.to(code).emit("playlistUpdated", list);
    
    return resSuccess(res, 200, "Current song updated successfully", { list });
  } catch (error) {
    return resFail(res, 500, "Failed to update current song", error.message);
  }
};