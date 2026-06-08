import { Router } from "express";
import { buyTicket, getUserTickets } from "../controllers/ticketController.js";

const router = Router();

router.post("/", buyTicket);
router.get("/user/:userId", getUserTickets);

export default router;
