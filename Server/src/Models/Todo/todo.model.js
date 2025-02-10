

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
        }
    },
    { timestamps: true }
)


export const TodoModal = mongoose.model("Todo", TodoSchema)