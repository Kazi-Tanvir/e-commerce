import express from "express";
import cors from "cors";
import Clerk from '@clerk/express'

const app = express();
app.use(Clerk.clerkMiddleware())

app.use(cors({
    origin: ["http://localhost:3003", "http://localhost:3002"]
}));
app.post("/", (req, res) => {
    res.send("Product service received a request");
});
app.get("/test", (req, res) => {
    const auth = Clerk.getAuth(req)
    const userId = auth.userId
    
    if (!userId) {
        return res.status(401).json({ message: "You are not logged in" });
    }
    console.log("Auth info in product service:", auth);
    res.json({ message: "Product service test endpoint", userId });
});

app.listen(8000, () => {
    console.log("Product service is running on port 8000");
});