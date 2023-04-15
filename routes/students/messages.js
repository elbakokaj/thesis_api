const express = require("express");
const router = express.Router();
const Messages = require("../../models/messages");

router.get("/all/:sender_id", async (req, res) => {
    try {
        const messages = await Messages.find({ "senderId": req.params.sender_id });
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;