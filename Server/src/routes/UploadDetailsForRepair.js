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
        const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
        const monthLetter = currentMonth.charAt(0).toUpperCase()
        const orderCount = await RepairDetailsModal.countDocuments({
            orderId: { $regex: new RegExp(`^${monthLetter}`) }
        })
        const orderId = `${monthLetter}${orderCount}`;

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
            orderId
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
        const repair = await RepairDetailsModal.find().populate("createdBy", "userName email");
        res.json(repair);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/upload_repair/:id", async (req, res) => {
    try {
        const repair = await RepairDetailsModal.findById(req.params.id).populate("createdBy", "userName email");
        res.json(repair);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get("/upload_repair_user", async (req, res) => {
    try {
        const { createdBy, search, status } = req.query;

        if (!createdBy) {
            return res.status(400).json({ error: "createdBy ID is required" });
        }

        let filter = { createdBy, };

        if (search) {
            filter.$or = [
                { product_name: { $regex: search, $options: "i" } },
                { details: { $regex: search, $options: "i" } },
                { orderId: { $regex: search, $options: "i" } }
            ];
        }

        if (status) {
            filter.status = status;
        }

        const repair = await RepairDetailsModal.find(filter)
            .populate("createdBy", "userName email")
            .select("product_name amount details phone address fullAddress landmark state city pincode images status orderId createdBy createdAt updatedAt");

        res.json(repair);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.patch("/upload_repair_status/:id", async (req, res) => {
    try {
        const { status, amount } = req.body;


        const repair = await RepairDetailsModal.findByIdAndUpdate(
            req.params.id,
            { status, amount },
            { new: true }
        );

        if (!repair) {
            return res.status(404).json({ error: "Repair order not found" });
        }

        res.json({ message: "Repair status updated successfully", repair });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default router