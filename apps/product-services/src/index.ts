import express from "express";
import cors from "cors";
import { clerkMiddleware, getAuth } from '@clerk/express'
import { shouldBeUser } from "./middleware/authMiddleware";

const app = express();
app.use(clerkMiddleware())

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

app.listen(8000, () => {
    console.log("Product service is running on port 8000");
});