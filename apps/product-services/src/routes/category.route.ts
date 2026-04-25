import { Router } from "express";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../controllers/category.controller";

const router:Router = Router();

router.get("/test", (req, res) => {
    res.json({ message: "Welcome to the Category Services API!" });
});

router.post("/", createCategory);
router.get("/", getCategories);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;