import express from "express";
import { UserModal } from "../Models/Todo/user.model.js";

const router = express.Router();


router.get("/users", async (req, res) => {
    try {
        const users = await UserModal.find();
        return res.json(users)
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }

})

router.get("/user/:id", async (req, res) => {
    try {
        const user = await UserModal.findById(req.params.id);
        return res.json(user)
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.delete("/user/delete/:id", async (req, res) => {
    try {
        const user = await UserModal.findByIdAndDelete(req.params.id);
        return res.json(user)
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.patch("/user/update/:id", async (req, res) => {
    try {
        const user = await UserModal.findById(req.params.id);
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;
        await user.save();
        return res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
})


router.post("/user/add", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new UserModal({
            username,
            email,
            password
        })
        await user.save();
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        res.send({ accessToken, user, message: "User added successfully!" })

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
})


export default router