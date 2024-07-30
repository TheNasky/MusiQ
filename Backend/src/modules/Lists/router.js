import express from "express";
import { createList, joinList, addSong, deleteSong, getList, playNextSong, playSpecificSong } from "./controller.js";

const router = express.Router();

router.get("/:code", getList);
router.post("/create", createList);
router.post("/join", joinList);
router.post("/addSong", addSong);
router.delete("/deleteSong", deleteSong);
router.post("/playNext", playNextSong);
router.post("/playSpecific", playSpecificSong);
export default router;