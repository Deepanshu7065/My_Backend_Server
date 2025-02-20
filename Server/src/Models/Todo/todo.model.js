

import mongoose from "mongoose";


const TodoSchema = new mongoose.Schema(
    {
        product_name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        fileName: {
            type: String,
            required: true
        },
        path: {
            type: String,
            required: true
        },
        brand: {
            type: String,
            required: true
        },
        size: {
            type: String,
            required: true
        },
        more_details: {
            type: String,
            required: true
        },
        weight: {
            type: Number,
            required: true
        },

    },
    { timestamps: true }
)


export const TodoModal = mongoose.model("Todo", TodoSchema)