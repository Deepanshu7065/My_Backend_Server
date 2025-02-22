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
        const {
            product_name,
            description,
            createdBy,
            price,
            quantity,
            size,
            brand,
            more_details,
            weight
        } = req.body;
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
            image: `/uploads/${req.file.filename}`,
            size,
            brand,
            more_details,
            weight
        });

        await todo.save();
        const users = await TodoModal.findById(todo._id).populate("createdBy", "userName email");

        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.patch("/items/update/:id", upload.single("image"), async (req, res) => {
    try {
        const itemUpdate = await TodoModal.findById(req.params.id);
        if (!itemUpdate) {
            return res.status(404).json({ error: "Item not found" });
        }
        if (req.file && itemUpdate.image) {
            const imagePath = path.join(uploadDir, path.basename(itemUpdate.image));
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        itemUpdate.product_name = req.body.product_name || itemUpdate.product_name;
        itemUpdate.description = req.body.description || itemUpdate.description;
        itemUpdate.createdBy = req.body.createdBy || itemUpdate.createdBy;
        itemUpdate.price = req.body.price || itemUpdate.price;
        itemUpdate.quantity = req.body.quantity || itemUpdate.quantity;
        itemUpdate.size = req.body.size || itemUpdate.size;
        itemUpdate.brand = req.body.brand || itemUpdate.brand;
        itemUpdate.more_details = req.body.more_details || itemUpdate.more_details;
        itemUpdate.weight = req.body.weight || itemUpdate.weight;

        if (req.file) {
            itemUpdate.image = `/uploads/${req.file.filename}`;
        }

        await itemUpdate.save();
        const updatedItem = await itemUpdate.populate("createdBy", "username email");
        return res.json(updatedItem)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/items/delete/:id", async (req, res) => {
    try {
        const itemDelete = await TodoModal.findByIdAndDelete(req.params.id);

        if (!itemDelete) {
            return res.status(404).json({ error: "Item not found" });
        }

        if (itemDelete.image) {
            const imagePath = path.join(uploadDir, path.basename(itemDelete.image));
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        return res.json({ message: "Item deleted successfully", item: itemDelete });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default router;
