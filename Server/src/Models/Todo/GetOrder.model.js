

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
    },
    status: {
        type: String,
        default: "Pending"
    },
    orderId: {
        type: String
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    fullAddress: {
        type: String,
        required: true
    },
    landmark: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    customer_name: {
        type: String,
        required: true
    },

},
    { timestamps: true }
)

export const OrderModal = mongoose.model("Order", AddOrder);