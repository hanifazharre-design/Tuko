import { Router } from "express";
import {
    getAllPembicara,
    createPembicara,
    getPembicaraById,
    updatePembicaraById,
    deletePembicaraById
} from "../controllers/pembicaraController.js";

const router = Router();

router.get("/", getAllPembicara);
router.post("/", createPembicara);
router.get("/:id", getPembicaraById);
router.put("/:id", updatePembicaraById);
router.delete("/:id", deletePembicaraById);

export default router;