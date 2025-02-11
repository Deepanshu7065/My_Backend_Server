
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";

import jwt from "jsonwebtoken";
import { UserModal } from "./Models/Todo/user.model.js";
import { TodoModal } from "./Models/Todo/todo.model.js";
import authenticate from "./middlewares/authenticat.js";


dotenv.config({
    path: "./env"
});

app.get("/api/v1/users", authenticate, async (req, res) => {
    try {
        const users = await UserModal.find();
        return res.json(users)
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }

})

app.get("/api/v1/user/:id", authenticate, async (req, res) => {
    try {
        const user = await UserModal.findById(req.params.id);
        return res.json(user)
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.delete("/api/v1/user/delete/:id", authenticate, async (req, res) => {
    try {
        const user = await UserModal.findByIdAndDelete(req.params.id);
        return res.json(user)
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.patch("/api/v1/user/update/:id", authenticate, async (req, res) => {
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

app.post("/api/v1/user/add", authenticate, async (req, res) => {
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
        res.send({accessToken, user, message: "User added successfully!" })

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
})

app.get("/api/v1/items/", authenticate, async (req, res) => {
    try {
        const todos = await TodoModal.find().populate("createdBy",);
        return res.json(todos)
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.post("/api/v1/items/add", authenticate, async (req, res) => {
    try {
        const { product_name, description, createdBy, price, quantity } = req.body;
        const todo = new TodoModal({
            product_name,
            description,
            createdBy,
            price,
            quantity
        })
        await todo.save();
        const users = await TodoModal.findById(todo._id).populate("createdBy", "username email",);
        res.status(201).
            json(users)
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
})


app.patch("/api/v1/items/update/:id", authenticate, async (req, res) => {
    try {
        const itemUpdate = await TodoModal.findById(req.params.id);
        itemUpdate.product_name = req.body.product_name;
        itemUpdate.description = req.body.description;
        itemUpdate.createdBy = req.body.createdBy;
        itemUpdate.price = req.body.price;
        itemUpdate.quantity = req.body.quantity;
        await itemUpdate.save();
        return res.json(itemUpdate)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.delete("/api/v1/todo/delete/:id", authenticate, async (req, res) => {

    try {
        const todoDelete = await TodoModal.findByIdAndDelete(req.params.id)
        return res.json(todoDelete)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

})

app.post("/api/v1/login", authenticate, async (req, res) => {
    try {
        const { email, password } = req.body;


        const isUser = await UserModal.findOne({ email });
        if (!isUser) {
            console.log("User Not Found");
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
        res.status(500).json({ error: error.message });
    }
});

app.post("/api/v1/verify", authenticate, async (req, res) => {
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
});



const port = process.env.PORT || 8001

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        })
    })
    .catch((error) => {
        console.log(error.message);
        process.exit(1);
    })