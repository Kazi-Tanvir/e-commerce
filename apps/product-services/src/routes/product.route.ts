import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controller";

const router:Router = Router();

router.get("/test", (req, res) => {
    res.json({ message: "Welcome to the Product Services API!" });
});

router.post("/", createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct); 

export default router;