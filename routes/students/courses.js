const express = require("express");
const router = express.Router();
const Courses = require("../models/courses");

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


module.exports = router;