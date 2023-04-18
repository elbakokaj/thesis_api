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


router.post("/find_students_attendences", async (req, res) => {
    console.log('req.query', req)
    console.log('req.body', req.body)
    try {
        const allAttendances = await Attendances.findOne({ courseId: req.body.course_id });
        const allUsers = await Users.find();

        const records = allAttendances?.records?.filter((el) => el.studentId);
        // console.log('records', records)
        const all_students_that_attend = [];
        for (const element of records) {
            const student = allUsers.find((user) => user._id.toString() === element.studentId.toString());
            if (student) {
                var name = student?.firstName
                var status = element
                const myJSON = {
                    name, status
                }
                all_students_that_attend.push(myJSON);
            }

        }
        res.json(all_students_that_attend);

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