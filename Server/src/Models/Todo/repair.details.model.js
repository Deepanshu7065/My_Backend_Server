import mongoose from "mongoose";


const RepairDetails = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
    images: [{
        type: String
    }],
    status: {
        type: String,
        default: "pending"
    },
    orderId: {
        type: String

    },
    amount: {
        type: Number
    }
},
    {
        timestamps: true
    }
)

export const RepairDetailsModal = mongoose.model("RepairDetails", RepairDetails)