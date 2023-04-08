const express = require("express");
const router = express.Router();
const Messages = require("../models/messages");

router.get("/find_messages", async (req, res) => {
    try {
        const messages = await Messages.find();
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/find_specific_message", async (req, res) => {
    try {
        const messages = await Messages.find({ "content": "Welcome!" });
        console.log('req', req)
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;