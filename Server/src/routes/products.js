
import express from "express";
import { TodoModal } from "../Models/Todo/todo.model.js";

const router = express.Router();

router.get("/products", async (req, res) => {
    try {
        const { search } = req.query
        let query = {}
        if (search) {
            query.$or =[
                { product_name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ]
        }
        const totalProduct = await TodoModal.countDocuments(query);
        const products = await TodoModal.find(query).populate("createdBy");
        return res.json({
            totalProduct,
            products
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get("/product/:id", async (req, res) => {
    try {
        const product = await TodoModal.findById(req.params.id).populate("createdBy");
        return res.json(product)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


export default router