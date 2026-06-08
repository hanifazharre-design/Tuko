import express from "express";
import { getSpeakers, createSpeaker, getSpeakerById, updateSpeaker, deleteSpeaker } from "../controllers/speakersControllers.js";
const router = express.Router();
router.get("/", getSpeakers);
router.get("/:id", getSpeakerById);
router.post("/", createSpeaker);
router.put("/:id", updateSpeaker);
router.delete("/:id", deleteSpeaker);
export default router;
//# sourceMappingURL=speakerRoutes.js.map