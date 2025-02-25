

import mongoose from "mongoose";

const AddOrder = new mongoose.Schema({
    product_id: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo",
    }],
    quantity: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
},
    { timestamps: true }
)

export const OrderModal = mongoose.model("Order", AddOrder);