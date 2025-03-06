
import express from "express";
import { OrderModal } from "../Models/Todo/GetOrder.model.js";
import mongoose from "mongoose";
import { AddressUserModal } from "../Models/Todo/AddressAddModel.js";

const router = express.Router();

router.post("/order/add-address", async (req, res) => {
    try {
        let {
            user,
            customer_name,
            last_name,
            phone,
            address,
            fullAddress,
            pincode,
            landmark,
            city,
            state,
            country
        } = req.body;
        if (
            !user ||
            !customer_name ||
            !last_name ||
            !phone ||
            !address ||
            !fullAddress ||
            !pincode ||
            !landmark ||
            !city ||
            !state ||
            !country) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const existingAddress = await AddressUserModal.findOne({
            user,
            customer_name,
            last_name,
            phone,
            address,
            fullAddress,
            pincode,
            landmark,
            city,
            state,
            country
        });

        if (existingAddress) {
            return res.status(400).json({ error: "Duplicate address entry not allowed" });
        }
        const newAddress = new AddressUserModal({
            customer_name,
            last_name,
            phone,
            address,
            fullAddress,
            pincode,
            landmark,
            city,
            state,
            country,
            user
        })
        await newAddress.save();
        const saveAddress = await AddressUserModal.findById(newAddress._id).populate("user", "userName email");

        return res.status(200).json({ message: "Address added successfully", address: saveAddress });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.patch("/order/update-address/:id", async (req, res) => {
    try {
        let {
            customer_name,
            last_name,
            phone,
            address,
            fullAddress,
            pincode,
            landmark,
            city,
            state,
            country
        } = req.body;
        if (
            !customer_name ||
            !last_name ||
            !phone ||
            !address ||
            !fullAddress ||
            !pincode ||
            !landmark ||
            !city ||
            !state ||
            !country) {
            return res.status(400).json({ error: "All fields are required" });
        }
        const updateAddress = await AddressUserModal.findByIdAndUpdate(req.params.id, {
            customer_name,
            last_name,
            phone,
            address,
            fullAddress,
            pincode,
            landmark,
            city,
            state,
            country
        },);
        return res.status(200).json({ message: "Address updated successfully", address: updateAddress });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get("/order/address/single-address/:id", async (req, res) => {
    try {
        const address = await AddressUserModal.findById(req.params.id).populate("user", "userName email");
        if (!address) {
            return res.status(404).json({ error: "Address not found" });
        }
        return res.status(200).json({ message: "Address fetched successfully", address });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})
router.delete("/order/delete-address/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid Order ID" });
        }

        const deletedOrder = await AddressUserModal.findByIdAndDelete(id);
        if (!deletedOrder) {
            return res.status(404).json({ error: "Order not found" });
        }

        return res.json({ message: "Order deleted successfully", order: deletedOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/order/address/:user_id", async (req, res) => {
    try {

        const address = await AddressUserModal.find({ user: req.params.user_id }).populate("user", "userName email");
        if (!address) {
            return res.status(404).json({ error: "Address not found" });
        }

        return res.status(200).json({ message: "Address fetched successfully", allAddress: address });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post("/order/create", async (req, res) => {
    try {
        let {
            product_id,
            user,
            total,
            quantity,
            address,
            deleveryCharge,
            discount
        } = req.body;

        if (!product_id || !user || !total || !quantity || !address || !deleveryCharge || !discount) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (!Array.isArray(product_id)) {
            product_id = [product_id];
        } else {
            product_id = product_id.flat();
        }
        const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
        const monthLetter = currentMonth.charAt(0).toUpperCase()
        const orderCount = await OrderModal.countDocuments({
            orderId: { $regex: new RegExp(`^${monthLetter}`) }
        })
        const orderId = `MY${monthLetter}${orderCount}`;

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
            orderId,
            status: "Pending",
            address,
            deleveryCharge,
            discount
        });

        await orderDetails.save();

        const savedOrder = await OrderModal.findById(orderDetails._id)
            .populate("user", "userName email")
            .populate("product_id")
            .populate("address");

        return res.status(201).json({
            message: "Order placed successfully",
            order: savedOrder,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/order/all_data", async (req, res) => {
    try {
        const orders = await OrderModal.find().populate("user", "userName email").populate("product_id").populate("address");

        return res.status(200).json({
            message: "Orders fetched successfully",
            orders,
        });
    } catch (error) {
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
            .populate("product_id")
            .populate("address");

        return res.status(200).json({
            message: "Orders fetched successfully",
            orders,
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/order/:id", async (req, res) => {
    try {
        const order = await OrderModal.findById(req.params.id)
            .populate("user", "userName email")
            .populate("product_id")
            .populate("address");
        return res.status(200).json({
            message: "Order fetched successfully",
            order,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


router.patch("/order/update_status/:id", async (req, res) => {
    try {
        const { status } = req.body;
        const order = await OrderModal.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        order.status = status;
        await order.save();
        return res.status(200).json({
            message: "Order status updated successfully",
            order,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})




export default router