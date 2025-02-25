
import express from "express";
import { OrderModal } from "../Models/Todo/GetOrder.model.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/order/create", async (req, res) => {
    try {
        let { product_id, user, total, quantity } = req.body;

        if (!product_id || !user || !total || !quantity) {
            return res.status(400).json({ error: "All fields are required" });
        }


        if (!Array.isArray(product_id)) {
            product_id = [product_id];
        } else {
            product_id = product_id.flat();
        }

        product_id = product_id
            .filter(id => typeof id === "string" && mongoose.isValidObjectId(id))
            .map(id => new mongoose.Types.ObjectId(id));

        if (product_id.length === 0) {
            return res.status(400).json({ error: "Invalid product_id format" });
        }

        const orderDetails = new OrderModal({
            product_id,
            user,
            total,
            quantity,
        });

        await orderDetails.save();

        const savedOrder = await OrderModal.findById(orderDetails._id)
            .populate("user", "userName email")
            .populate("product_id");

        return res.status(201).json({
            message: "Order placed successfully",
            order: savedOrder,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


router.get("/order", async (req, res) => {
    try {
        const { user_id } = req.query;

        if (!user_id) {
            return res.status(400).json({ error: "user_id is required" });
        }

        const orders = await OrderModal.find({ user: user_id })
            .populate("user", "userName email")
            .populate("product_id");

        return res.status(200).json({
            message: "Orders fetched successfully",
            orders,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default router