import express from "express";
import { getEvents, createEvent, getEventById, UpdateEvent, deleteEvent, } from "../controllers/EventControllers.js";
const router = express.Router();
router.get("/", getEvents);
router.post("/", createEvent);
router.get("/:id", getEventById);
router.put("/:id", UpdateEvent);
router.delete("/:id", deleteEvent);
export default router;
//# sourceMappingURL=eventRoutes.js.map