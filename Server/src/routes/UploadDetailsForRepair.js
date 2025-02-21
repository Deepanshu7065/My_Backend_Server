import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { RepairDetailsModal } from "../Models/Todo/repair.details.model.js";

const router = express.Router();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });


router.post("/upload_repair", upload.array("images", 5), async (req, res) => {
    try {
        const {
            product_name,
            details,
            createdBy,
            address,
            phone,
            fullAddress,
            landmark,
            state,
            city,
            pincode,
        } = req.body;
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "Image is required" });
        }
        const imagePath = req.files.map((file) => `/uploads/${file.filename}`);
        const newRepair = new RepairDetailsModal({
            product_name,
            details,
            createdBy,
            address,
            phone,
            fullAddress,
            landmark,
            state,
            city,
            pincode,
            images: imagePath,
        });

        await newRepair.save();
        const savedRepair = await RepairDetailsModal.findById(newRepair._id).populate("createdBy", "userName email");

        
            res.status(201).json({ message: "Repair details uploaded successfully", repair: savedRepair });
        

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/upload_repair", async (req, res) => {
    try {
        const repair = await RepairDetailsModal.find()
        res.json(repair);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default router