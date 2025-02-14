import multer from "multer";
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { TodoModal } from "../Models/Todo/todo.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const safeFilename = file.originalname.replace(/\s+/g, "_").replace(/[()]/g, "");
        cb(null, Date.now() + "-" + safeFilename);
    }
});

const upload = multer({ storage: storage });

router.post("/items/add", upload.single("image"), async (req, res) => {
    try {
        const { product_name, description, createdBy, price, quantity } = req.body;
        if (!req.file) {
            return res.status(400).json({ error: "Image is required" });
        }
        const todo = new TodoModal({
            product_name,
            description,
            createdBy,
            price,
            quantity,
            path: `/uploads/${req.file.filename}`,
            fileName: req.file.filename,
            image: `/uploads/${req.file.filename}`
        });

        await todo.save();
        const users = await TodoModal.findById(todo._id).populate("createdBy", "username email");

        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Update API
router.patch("/items/update/:id", upload.single("image"), async (req, res) => {
    try {
        const itemUpdate = await TodoModal.findById(req.params.id);
        if (!itemUpdate) {
            return res.status(404).json({ error: "Item not found" });
        }

        itemUpdate.product_name = req.body.product_name || itemUpdate.product_name;
        itemUpdate.description = req.body.description || itemUpdate.description;
        itemUpdate.createdBy = req.body.createdBy || itemUpdate.createdBy;
        itemUpdate.price = req.body.price || itemUpdate.price;
        itemUpdate.quantity = req.body.quantity || itemUpdate.quantity;

        if (req.file) {
            itemUpdate.image = `/uploads/${req.file.filename}`;
        }

        await itemUpdate.save();
        return res.json(itemUpdate);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
