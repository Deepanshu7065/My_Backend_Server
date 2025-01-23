
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";
import { UserModal } from "./Models/Todo/user.model.js";
import { TodoModal } from "./Models/Todo/todo.model.js";

dotenv.config({
    path: "./env"
})





app.get("/api/v1/users", async (req, res) => {
    try {
        const users = await UserModal.find();
        return res.json(users)
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }

})

app.get("/api/v1/user/:id", async (req, res) => {
    try {
        const user = await UserModal.findById(req.params.id);
        return res.json(user)
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.delete("/api/v1/user/delete/:id", async (req, res) => {
    try {
        const user = await UserModal.findByIdAndDelete(req.params.id);
        return res.json(user)
    }
    catch (error) {
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

app.post("/api/v1/user/add", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new UserModal({
            username,
            email,
            password
        })
        await user.save();
        res.send({ message: "User added successfully!" })

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
})

app.get("/api/v1/todo/", async (req, res) => {
    try {
        const todos = await TodoModal.find().populate("createdBy",);
        return res.json(todos)
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.post("/api/v1/todo/add", async (req, res) => {
    try {
        const {title, description, createdBy, subTodo } = req.body;
        const todo = new TodoModal({
            title,
            description,
            createdBy,
            subTodo
        })
        await todo.save();
        res.send({ message: "Todo added successfully!" })
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.delete("/api/v1/todo/delete/:id", async (req, res) => {

    try{
        const todoDelete = await TodoModal.findByIdAndDelete(req.params.id)
        return res.json(todoDelete)
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
    
})


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