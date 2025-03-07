import express from "express";
import { OrderCartModal } from "../Models/Todo/OrderCart.model.js";

const router = express.Router();

// ✅ Add item to cart or update quantity if exists
router.post("/cart/add", async (req, res) => {
    try {
        const { product_id, quantity, price, user } = req.body;
        if (!product_id || !user) return res.status(400).json({ error: "Product ID and User ID are required" });

        let cartItem = await OrderCartModal.findOne({ product_id, user });

        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
            cartItem = await OrderCartModal.findById(cartItem._id)
                .populate("product_id")
                .populate("user");
            return res.json({ message: "Item quantity updated successfully", item: cartItem });
        }

        cartItem = new OrderCartModal({ product_id, quantity, price, user });
        await cartItem.save();
        cartItem = await OrderCartModal.findById(cartItem._id)
            .populate("product_id")
            .populate("user");
        return res.json({ message: "Item added to cart successfully", item: cartItem });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


router.patch("/cart/update/:id", async (req, res) => {
    try {
        const { user } = req.body;
        if (!user) return res.status(400).json({ error: "User ID is required" });

        const item = await OrderCartModal.findOne({ _id: req.params.id, user });

        if (!item) {
            return res.status(404).json({ error: "Item not found or unauthorized" });
        }

        let updatedQuantity = item.quantity + req.body.quantity;

        if (updatedQuantity <= 0) {
            await OrderCartModal.findByIdAndDelete(item._id);
            return res.json({ message: "Item deleted successfully", item });
        }

        item.quantity = updatedQuantity;
        await item.save();
        return res.json({ message: "Item quantity updated successfully", item });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/cart", async (req, res) => {
    try {
        const userId = req.query.user_id;
        if (!userId) return res.status(400).json({ error: "User ID is required" });

        const cartItems = await OrderCartModal.find({ user: userId })
            .populate("product_id")
            .populate("user");

        return res.json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.delete("/cart/delete/:id", async (req, res) => {
    try {
        const { user } = req.query;
        if (!user) return res.status(400).json({ error: "User ID is required" });

        const deletedItem = await OrderCartModal.findOneAndDelete({ _id: req.params.id, user });
        if (!deletedItem) {
            return res.status(404).json({ error: "Item not found or unauthorized" });
        }
        return res.json({ message: "Item deleted successfully", item: deletedItem });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/cart/delete-all", async (req, res) => {
    try {
        const { user } = req.query;
        if (!user) return res.status(400).json({ error: "User ID is required" });

        const deletedItems = await OrderCartModal.deleteMany({ user });
        return res.json({ message: "All items deleted successfully", items: deletedItems });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default router;
