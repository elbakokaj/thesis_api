const express = require("express");
const router = express.Router();
const Attendances = require("../../models/attendances");
const Users = require("../../models/users");
const Courses = require("../../models/courses");

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
        const records = allAttendances?.records?.filter((el) => el.studentId == req.query.student_id);
        // 

        console.log('attendance records for student', req.query.course_date);
        res.json(records);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/find_course/:professor_id', async (req, res) => {
    try {
        const foundCourse = await Courses.findOne({ professorId: req.params.professor_id });

        const CourseStudents = foundCourse.group.studentIds;
        if (!foundCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(CourseStudents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;