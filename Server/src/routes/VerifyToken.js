import express from "express";
import { UserModal } from "../Models/Todo/user.model.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/verify", async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ message: "Token is missing" });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Token is missing" });
        }
        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const user = await UserModal.findById(decoded._id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json({ user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

export default router