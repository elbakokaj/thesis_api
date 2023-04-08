const mongoose = require("mongoose");
const { Schema } = mongoose.Schema;

const attendanceSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    courseId: {
        type: String,
        required: true,
    },
    groupId: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    records: [
        {
            studentId: {
                type: String,
                required: true,
            },
            status: {
                type: String,
                enum: ["present", "absent", "excused"],
                required: true,
            },
        },
    ],

})
const Attendances = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendances;