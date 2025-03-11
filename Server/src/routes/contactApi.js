
import express from "express";
import { ContactModal } from "../Models/Todo/Contact.model.js";
import mongoose from "mongoose";


const router = express.Router();

router.post("/contact/add", async (req, res) => {
    try {
        const {
            name,
            last_name,
            phone,
            message,
            user,
            title,
        } = req.body;
        if (!title || !name || !last_name || !phone || !message) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (!mongoose.Types.ObjectId.isValid(user)) {
            return res.status(400).json({ error: "Invalid user ID" });
        }
        const ticketId = Math.floor(Math.random() * 1000000);

        const contact = new ContactModal({
            name,
            last_name,
            phone,
            message: message,
            user,
            ticketId,
            title,
        })

        await contact.save()
        const yourContact = await ContactModal.findOne({ user }).populate("user", "userName email");
        return res.json({ message: "Message sent successfully", contact: yourContact });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.patch("/contact/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid contact ID" });
        }

        const contact = await ContactModal.findById(id);
        if (!contact) {
            return res.status(404).json({ error: "Contact not found" });
        }

        contact.status = req.body.status;
        await contact.save();

        return res.json({ message: "Contact updated successfully", contact });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get("/contact_single/:ticketId", async (req, res) => {
    try {
        const { ticketId } = req.params;
        const contact = await ContactModal.findOne({
            ticketId: ticketId
        }).populate("user", "userName email");

        console.log("Response Type:", typeof contact);

        if (!contact) {
            console.log("No contact found in database! Check ticketId format.");
            return res.status(404).json({ error: "No messages found for this user and ticket" });
        }

        return res.json(contact);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post("/contact/reply", async (req, res) => {
    try {
        const { recieve_message, ticketId } = req.body;

        const contact = await ContactModal.findOne({ ticketId });
        if (!contact) {
            return res.status(404).json({ error: "Ticket not found for this user" });
        }

        contact.recieve_message.push({ message: recieve_message, timestamp: new Date() });
        await contact.save();

        return res.json({ message: "Reply sent successfully", contact });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post("/contact/send", async (req, res) => {
    try {
        const { send_message, user, ticketId } = req.body;

        const contact = await ContactModal.findOne({ user, ticketId });
        if (!contact) {
            return res.status(404).json({ error: "Ticket not found for this user" });
        }

        contact.send_message.push({ message: send_message, timestamp: new Date() });
        await contact.save();

        return res.json({ message: "Message sent successfully", contact });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});








router.get("/contact/:userId", async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }

        const contacts = await ContactModal.find({ user: userId }).populate("user", "userName email");

        if (!contacts.length) {
            return res.status(404).json({ error: "No tickets found for this user" });
        }

        return res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get("/contact", async (req, res) => {
    try {
        const contacts = await ContactModal.find();

        return res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})


export default router;