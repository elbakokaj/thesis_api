const express = require("express");
const router = express.Router();
const Users = require("../../models/users");

router.get("/:student_id", async (req, res) => {
    try {
        const users = await Users.find({ "_id": req.params.student_id });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put('/edit/:student_id', async (req, res) => {
    const id = req.params.student_id;
    const updatedData = {};

    if (req.body.firstName) {
        updatedData.firstName = String(req.body.firstName);
    }
    if (req.body.lastName) {
        updatedData.lastName = String(req.body.lastName);
    }
    if (req.body.yearOfEnrollment) {
        updatedData.yearOfEnrollment = String(req.body.yearOfEnrollment);
    }
    if (req.body.birthday) {
        updatedData.birthday = String(req.body.birthday);
    }

    const options = { new: true };

    try {
        const updatedProduct = await Users.findByIdAndUpdate(id, updatedData, options);

        res.json(updatedProduct);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;