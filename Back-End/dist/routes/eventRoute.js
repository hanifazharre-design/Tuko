import { Router } from "express";
import { getAllEvents, createEvent, getEventById, updateEventById, deleteEventById } from "../controllers/eventController.js";
const router = Router();
router.get("/", getAllEvents);
router.post("/", createEvent);
router.get("/:id", getEventById);
router.put("/:id", updateEventById);
router.delete("/:id", deleteEventById);
export default router;
//# sourceMappingURL=eventRoute.js.map