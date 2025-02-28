import mongoose from "mongoose";


const AddressAddModal = new mongoose.Schema({
    customer_name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    last_name: {
        type: String,
        required: true
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
    pincode: {
        type: Number,
        required: true
    },
    landmark: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
})

export const AddressUserModal = mongoose.model("Address", AddressAddModal);