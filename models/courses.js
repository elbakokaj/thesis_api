const mongoose = require("mongoose");
const { Schema } = mongoose.Schema;

const courseSchema = new mongoose.Schema({
    _id: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    professorId: {
        type: String,
        required: true,
    },
    groups: [
        {
            groupId: String,
            groupName: String,
            studentIds: [
                {
                    type: String,
                },
            ],
        },
    ],

})
const Courses = mongoose.model('Course', courseSchema);
module.exports = Courses;