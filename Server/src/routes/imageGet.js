import multer from "multer";
import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

router.get("/uploads/:filename", async (req, res) => {
    try {
        const filePath = path.join(uploadDir, req.params.filename);
       

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: "File not found" });
        }
        res.sendFile(filePath);
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;