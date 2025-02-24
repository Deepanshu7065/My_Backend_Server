

import mongoose from "mongoose";

const orderCart = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo",
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
},
    { timestamps: true }
)

export const OrderCartModal = mongoose.model("OrderCart", orderCart);

