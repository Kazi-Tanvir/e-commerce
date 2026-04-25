import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { clerkMiddleware, getAuth } from '@clerk/express'
import { shouldBeUser } from "./middleware/authMiddleware";
import productRoutes from "./routes/product.route";
import categoryRoutes from "./routes/category.route";

const app = express();
app.use(clerkMiddleware())
app.use(express.json());

app.use(cors({
    origin: ["http://localhost:3003", "http://localhost:3002"]
}));
app.post("/", (req, res) => {
    res.send("Product service received a request");
});
app.get("/test", shouldBeUser ,(req, res) => {

    console.log("Auth info in product service:", getAuth(req));
    res.json({ message: "Product service test endpoint", userId: req.userId });
});



app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use((err: any, req: Request, res: Response , next: NextFunction) => {
    console.error("Error in product service:", err);
    return res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
}
);


app.listen(8000, () => {
    console.log("Product service is running on port 8000");
});