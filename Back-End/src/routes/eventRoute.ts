import { Router } from "express";
import {
  getAllEvents,
  createEvent,
  getEventById,
  updateEventById,
  deleteEventById
} from "../controllers/eventController.js";
import { upload } from "../middleware/upload.js";

const router = Router();

router.get("/", getAllEvents);
router.post("/", upload.single("image"), createEvent);
router.get("/:id", getEventById);
router.put("/:id", upload.single("image"), updateEventById);
router.delete("/:id", deleteEventById);

export default router;