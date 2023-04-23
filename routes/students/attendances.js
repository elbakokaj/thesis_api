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
        // Get the attendance data
        const attendanceData = await Attendances.find();
        // Initialize an empty object to store the counts
        // Initialize an empty object to store the counts
        const counts = {};

        // Loop through each array of attendance records
        for (const recordArray of attendanceData) {
            // Loop through each record in the array
            for (const record of recordArray.records) {
                // Get the student ID for the record
                const studentId = record.studentId;

                // If the student ID isn't already in the counts object, add it with an empty object
                if (!counts[studentId]) {
                    counts[studentId] = {};
                }

                // If the status for the record isn't already in the counts object for the student, add it with a count of 0
                if (!counts[studentId][record.status]) {
                    counts[studentId][record.status] = 0;
                }

                // Increment the count for the status if it's present
                if (record.status === 'present') {
                    counts[studentId][record.status]++;
                }
            }
        }


        // Send the counts object as the response
        res.json(counts);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }

});



module.exports = router;

