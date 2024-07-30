import { ListModel } from "./schema.js";
import { resSuccess, resFail } from "../../config/utils/response.js";
import { v4 as uuidv4 } from "uuid";
import argon2 from "argon2";

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

    if (list.isPrivate) {
      // Notify admin for approval (implementation depends on your notification system)
      // For now, we'll just return a message
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
    return resSuccess(res, 200, "Song deleted successfully", { list });
  } catch (error) {
    return resFail(res, 500, "Failed to delete song", error.message);
  }
};

export const findList = async (req, res) => {
  const {code} = req.body;

  try {
    const list = await ListModel.findOne({ code })
    if (!list) {
      return resFail(res, 404, "List not found");
    } else {
      res.send(list);
    }

  } catch (error) {
    return resFail(res, 400, "List not found", error.message);
  }
}