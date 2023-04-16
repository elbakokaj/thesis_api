const express = require("express");
const router = express.Router();
const Attendances = require("../../models/attendances");

router.get("/find_attendances", async (req, res) => {
    try {
        const attendances = await Attendances.find();
        res.json(attendances);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/find_specific_status", async (req, res) => {
    try {
        const allAttendances = await Attendances.findOne({ courseId: req.query.course_id, date: req.query.course_date });
        const records = allAttendances && allAttendances?.records?.filter((el) => el.studentId == req.query.student_id);
        // 

        console.log('attendance records for student', records);
        res.json(records);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;