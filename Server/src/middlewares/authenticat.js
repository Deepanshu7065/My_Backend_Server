import jwt from "jsonwebtoken";
import { UserModal } from "../Models/Todo/user.model.js";

const authenticate = async (req, res, next) => {
    try {
        const exemptedRoutes = ['/api/v1/login', '/api/v1/user/add'];

        console.log("Incoming Request Path:", req.path); 
        console.log("Headers Received:", req.headers);

        if (exemptedRoutes.includes(req.path)) {
            console.log("Skipping authentication for:", req.path);
            return next();
        }

        if (!req.headers.authorization) {
            console.error("🚨 Authorization header is missing!");
            return res.status(401).json({ message: 'Authorization header is missing' });
        }

        const token = req.headers.authorization.split(' ')[1];
        console.log("Extracted Token:", token);

        if (!token) {
            return res.status(401).json({ message: 'Token is missing' });
        }

        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        console.log("Decoded Token:", decoded);

        const isUser = await UserModal.findById(decoded._id);
        if (!isUser) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        res.status(500).json({ error: error.message });
    }
};

export default authenticate;
