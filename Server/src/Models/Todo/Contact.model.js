import mongoose from "mongoose";

const ContactModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    message: [{
        type: String,
        required: true
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    },
    ticketId: {
        type: String
    },
    send_message: [{ type: String, default: [] }],  
    recieve_message: [{ type: String, default: [] }]  
}, { timestamps: true });

export const ContactModal = mongoose.model("Contact", ContactModel);
