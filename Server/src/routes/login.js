import express from "express";
import { UserModal } from "../Models/Todo/user.model.js";
import { authenticate } from "../middlewares/authenticat.js";

const router = express.Router();

router.post("/login", authenticate, async (req, res) => {
    try {
        const { email, password } = req.body;
        const isUser = await UserModal.findOne({ email });
        if (!isUser) {
            return res.status(401).json({ message: "User not found" })
        }
        const isPasswordMatched = await isUser.isPasswordMatched(password);
        if (!isPasswordMatched) {
            return res.status(401).json({ message: "Password is incorrect" })
        }
        const accessToken = isUser.generateAccessToken();
        const refreshToken = isUser.generateRefreshToken();
        return res.json({ accessToken, refreshToken })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

export default router