import express from "express";
import { OrderCartModal } from "../Models/Todo/OrderCart.model.js";

const router = express.Router();

// ✅ FIX: Proper population before response
router.post("/cart/add", async (req, res) => {
    try {
        const { product_id, quantity, price } = req.body;
        if (!product_id) return res.status(400).json({ error: "Product ID is required" });

        let cartItem = await OrderCartModal.findOne({ product_id });

        if (cartItem) {
            cartItem.quantity += 1;
            await cartItem.save();
            cartItem = await cartItem.populate("product_id");
            return res.json({ message: "Item quantity updated successfully", item: cartItem });
        }

        cartItem = new OrderCartModal({ product_id, quantity, price });
        await cartItem.save();
        cartItem = await cartItem.populate("product_id");
        return res.json({ message: "Item added to cart successfully", item: cartItem });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.patch("/cart/update/:id", async (req, res) => {
    try {
        const item = await OrderCartModal.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }

        let updatedQuantity = item.quantity + req.body.quantity;

        if (updatedQuantity <= 0) {
            await OrderCartModal.findByIdAndDelete(item._id);
            return res.json({ message: "Item deleted successfully", item });
        }

        const updatedItem = await OrderCartModal.findByIdAndUpdate(
            req.params.id,
            { quantity: updatedQuantity },
            { new: true }
        ).populate("product_id");

        return res.json({ message: "Item quantity updated successfully", item: updatedItem });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/cart", async (req, res) => {
    try {
        const cartItems = await OrderCartModal.find().populate("product_id");
        return res.json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.delete("/cart/delete/:id", async (req, res) => {
    try {
        const deletedItem = await OrderCartModal.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ error: "Item not found" });
        }
        return res.json({ message: "Item deleted successfully", item: deletedItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
