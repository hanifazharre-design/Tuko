import { Router } from "express";
import { getAllCategories, createCategory, getCategoryById, updateCategoryById, deleteCategoryById, } from "../controllers/categoryController.js";
const router = Router();
router.get("/", getAllCategories);
router.post("/", createCategory); // ← Untuk handle tambah data
router.get("/:id", getCategoryById); // ← Untuk handle ambil detail sebelum edit
router.put("/:id", updateCategoryById); // ← Untuk handle update data
router.delete("/:id", deleteCategoryById);
export default router;
//# sourceMappingURL=categoryRoute.js.map