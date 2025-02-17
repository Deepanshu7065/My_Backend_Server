import express from "express";
import { UserModal } from "../Models/Todo/user.model.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {


    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password are required" });
        }

        const isUser = await UserModal.findOne({ email });
        if (!isUser) {
            return res.status(401).json({ message: "User not found" });
        }

        const isPasswordMatched = await isUser.isPasswordMatched(password);
        if (!isPasswordMatched) {
            return res.status(401).json({ message: "Password is incorrect" });
        }

        const accessToken = isUser.generateAccessToken();
        const refreshToken = isUser.generateRefreshToken();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        });


        return res.json({ accessToken, user: { username: isUser.username, email: isUser.email } });

    } catch (error) {
        console.error("🚨 Login Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

export default router;
