import express from "express";
import { getCategory, createCategory, getCategoryById, updateCategory, deleteCategory } from "../controllers/categoryControllers.js";
const router = express.Router();
router.get("/", getCategory);
router.post("/", createCategory);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
export default router;
//# sourceMappingURL=categoryRoutes.js.map