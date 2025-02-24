import express from "express";
import { OrderCartModal } from "../Models/Todo/OrderCart.model.js";

const router = express.Router();

router.post("/cart/add", async (req, res) => {
    try {
        const {
            product_id,
            price,
            quantity
        } = req.body

        if (!product_id || !user || !price || !quantity) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const cartDetails = new OrderCartModal({
            product_id,
            price,
            quantity
        })

        await  cartDetails.save()
        const cart = await OrderCartModel.findById(cartDetails._id).populate("user", "username email", "product")
        return res.json(cart); 
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
})


export default router