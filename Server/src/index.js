import dotenv from "dotenv";
dotenv.config({
    path: "./env"
});

import connectDB from "./db/index.js";
import app from "./app.js";
import { UserModal } from "./Models/Todo/user.model.js";

// app.use(express.json());

app.post("/api/v1/user/add", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = new UserModal({
            username,
            email,
            password
        })
        await user.save();
        res.send({ message: "User added successfully!" });

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
});
// 
app.get("/api/v1/users", async (req, res) => {
    try {
        const users = await UserModal.find();
        return res.json(users);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/v1/user/:id", async (req, res) => {
    try {
        const user = await UserModal.findById(req.params.id); 
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

app.delete("/api/v1/user/delete/:id", async (req, res) => {
    try {
        const user = await UserModal.findByIdAndDelete(req.params.id);
        return res.json(user);

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
})

app.patch("/api/v1/user/update/:id", async (req, res) => {
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

const port = process.env.PORT || 8001

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    }

    )
    .catch(err => console.log(err));



