const express = require("express");
const router = express.Router();
const Courses = require("../../models/courses");
const Attendances = require("../../models/attendances");
const Users = require("../../models/users");

router.get("/find_courses", async (req, res) => {
    try {
        const courses = await Courses.find();
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/find_specific_course/:professor_id", async (req, res) => {
    try {
        const courses = await Courses.find({ professorId: req.params.professor_id });
        const courseIds = courses.map(course => course._id);
        const attendance_dates = await Attendances.find({ courseId: { $in: courseIds } }).populate({
            path: "records.studentId",
            select: "firstName lastName",
            model: Users
        });;
        console.log('courses:', courses);
        console.log('attendance_dates:', attendance_dates);
        res.json({ courses, attendance_dates });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get("/find_specific_data/:course_id/:course_date", async (req, res) => {
    try {
        const { course_id, course_date } = req.params;

        const attendance = await Attendances.find();
        const test = attendance?.find((el) => el?._id == course_id || el?.date == course_date)
        console.log("attendance", test);

        res.json({ attendance: test });
    } catch (err) {
        console.error(err);
    }
});



module.exports = router;