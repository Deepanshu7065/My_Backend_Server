

import mongoose from "mongoose";


const TodoSchema = new mongoose.Schema(
    {
        title: {
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
        subTodo: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SubTodo",
            }
        ]
    },
    { timestamps: true }
)


export const TodoModal = mongoose.model("Todo", TodoSchema)