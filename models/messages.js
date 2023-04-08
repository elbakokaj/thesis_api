const mongoose = require("mongoose");
const { Schema } = mongoose.Schema;

const messageSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    senderId: {
        type: String,
        required: true,
    },
    receiverId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: false,
        default: "unread"
    }

})
const Messages = mongoose.model('Message', messageSchema);
module.exports = Messages;