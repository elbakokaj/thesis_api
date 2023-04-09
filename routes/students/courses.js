const express = require("express");
const router = express.Router();
const Courses = require("../../models/courses");

router.get("/find_courses", async (req, res) => {
    try {
        const courses = await Courses.find();
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




router.get("/find_specific_course", async (req, res) => {
    try {
        const courses = await Courses.find({ "name": "Introduction to Programming" });
        console.log('req', req)
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});




async function getCourseName(studentId) {
    try {
        const courses = database.collection('courses');

        const course = await courses.findOne({ "groups.studentIds": ObjectId(studentId) });

        if (course) {
            return course.name;
        } else {
            return null;
        }
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

router.get('/course_name/:studentId', async (req, res) => {
    const studentId = req.params.studentId;
    const courseName = await getCourseName(studentId);

    if (courseName) {
        res.send(`Course name: ${courseName}`);
    } else {
        res.status(404).send('Course not found for the given student ID.');
    }
});


module.exports = router;