import express from "express";
import { UserModal } from "../Models/Todo/user.model.js";

const router = express.Router();

router.post("/user/add", async (req, res) => {
    try {
        const { userName, email, password, phone, userType } = req.body;
        if (!userName || userName.trim() === '') {
            return res.status(400).json({ error: "User Name is required" });
        }
        const user = new UserModal({
            userName,
            email,
            password,
            phone,
            userType
        })
        console.log(user)
        await user.save();

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        res.send({ accessToken, user, message: "User added successfully!" })

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
})


export default router