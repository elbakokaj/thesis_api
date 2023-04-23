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
        const records = allAttendances?.records?.filter((el) => el.studentId == req.query.student_id);
        // console.log('attendance records for student', req.query.course_date);
        res.json(records);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put('/attendance/:courseId', async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const { recordId, status } = req.body;

        // Find all attendance records for the given courseId
        const attendanceRecords = await Attendances.find({ courseId });

        // Update the attendance record with the given _id and status
        const updatedAttendanceRecords = attendanceRecords.map((record) => {
            const updatedRecords = record.records.map((attendanceRecord) => {
                if (attendanceRecord._id.toString() === recordId) {
                    return { ...attendanceRecord, status };
                } else {
                    return attendanceRecord;
                }
            });

            return { ...record, records: updatedRecords };
        });

        // Update the attendance records in the database
        await Promise.all(
            updatedAttendanceRecords.map((record) => {
                return Attendance.findByIdAndUpdate(record._id, record);
            })
        );

        res.status(200).json({ message: 'Attendance records updated successfully' });
    } catch (err) {
        next(err);
    }
});



router.put("/update_attendance_records", async (req, res) => {
    try {
        const { courseId, groupId, date, records } = req.body;

        console.log("req?.query:", req);
        console.log("courseId:", courseId);
        console.log("groupId:", groupId);
        console.log("date:", date);

        const attendanceRecord = await Attendances.findOne({
            courseId,
            groupId,
            date,
        });

        console.log("attendanceRecord:", attendanceRecord);

        if (!attendanceRecord) {
            return res.status(404).json({ message: "Attendance record not found" });
        }

        // update the attendance record with the new records
        attendanceRecord.records = records.map((record) => ({
            studentId: record.studentId,
            status: record.status,
        }));

        const updatedAttendanceRecord = await attendanceRecord.save();

        res.status(200).json({
            message: "Attendance records updated successfully",
            attendanceRecord: updatedAttendanceRecord,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;