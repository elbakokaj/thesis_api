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

router.get("/find_specific_status/:type", async (req, res) => {
    try {
        const allAttendances = await Attendances.find();
        var records = allAttendances[0].records.filter((el) => el?.status == req.params.type)
        console.log('recordsrecords', records)
        res.json(records);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;