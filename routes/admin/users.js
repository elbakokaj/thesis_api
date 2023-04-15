const express = require("express");
const router = express.Router();
const Users = require("../../models/users");

router.get("/find_profile/:user_id", async (req, res) => {
    try {
        const users = await Users.find({ "_id": req.params.user_id });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get("/find_all", async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get("/find_all_students", async (req, res) => {
    try {
        const users = await Users.find({ "role": "student" });
        console.log('req', req)
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put('/edit_profile/:user_id', async (req, res) => {
    console.log('erdha')
    try {
        console.log('req.paramas', req.params)
        console.log("req.body", req.body)
        const updatedUser = await Users.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;
