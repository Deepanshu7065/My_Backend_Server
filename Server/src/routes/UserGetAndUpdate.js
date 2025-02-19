import express from "express";
import { UserModal } from "../Models/Todo/user.model.js";

const router = express.Router();


router.get("/users", async (req, res) => {
    try {
        const { search, filter } = req.query;
        let query = {};

        if (search) {
            if (!isNaN(Number(search))) {
                query = {
                    $expr: {
                        $regexMatch: {
                            input: { $toString: "$phone" },
                            regex: search,
                            options: "i"
                        }
                    }
                }
            } else {
                query.$or = [
                    { userName: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } }
                ];
            }
        }

        if (filter && filter !== "All") {
            query.userType = filter;
        }
        const totalUser = await UserModal.countDocuments(query);
        const users = await UserModal.find(query);
        return res.json({
            totalUser,
            users
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


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
        user.userName = req.body.userName;
        user.email = req.body.email;
        // user.password = req.body.password;
        user.phone = req.body.phone;
        await user.save();
        return res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
})



export default router