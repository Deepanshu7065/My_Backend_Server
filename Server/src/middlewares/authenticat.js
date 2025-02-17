import jwt from "jsonwebtoken";
import { UserModal } from "../Models/Todo/user.model.js";

const authenticate = async (req, res, next) => {
    try {
        const exemptedRoutes = ['/api/v1/login', '/api/v1/user/add'];

        if (exemptedRoutes.includes(req.path)) {
            return next();
        }

        if (!req.headers.authorization) {
            return res.status(401).json({ message: 'Authorization header is missing' });
        }

        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token is missing' });
        }

        const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

        const isUser = await UserModal.findById(decoded._id);
        if (!isUser) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = decoded;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default authenticate;
